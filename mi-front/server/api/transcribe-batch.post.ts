export default defineEventHandler(async (event) => {
  // clave de API de Speechmatics
  const API_KEY = "QtHn8WJtLEZxkE0k2aCBrFw0rwQZTIBh"
  
  try {
    // leemos los datos enviados como form-data desde el cliente
    const formData = await readMultipartFormData(event)
    
    // validamos que se haya recibido al menos un archivo
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No se recibió archivo de audio'
      })
    }

    // extraemos el archivo del form-data
    let audioFile = null
    let idiomaSeleccionado = 'es' // idioma por defecto
    
    // procesamos todos los campos del form-data
    for (const field of formData) {
      if (field.name === 'audio') {
        audioFile = field
      } else if (field.name === 'idioma') {
        idiomaSeleccionado = field.data.toString()
      }
    }
    
    // validamos que se haya recibido el archivo de audio
    if (!audioFile) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No se recibió archivo de audio'
      })
    }

    console.log('🎵 Archivo recibido:', audioFile.filename, 'tamaño:', audioFile.data.length, 'bytes')
    console.log('🌍 Idioma seleccionado:', idiomaSeleccionado)
    
    // creamos un nuevo FormData para enviar a Speechmatics
    const formDataParaSpeech = new FormData()
    
    // cogemos el tipo del archivo de audio
    let tipoAudio = 'audio/wav' // Tipo por defecto
    let nombreAudio = audioFile.filename || 'audio.wav' // Nombre por defecto
    
    // detectamos tipo según la extensión del archivo
    if (nombreAudio.includes('.webm')) {
      tipoAudio = 'audio/webm'
    } else if (nombreAudio.includes('.mp3')) {
      tipoAudio = 'audio/mp3'
    }
    
    // creamos un Blob con los datos del audio
    const blobAudioFinal = new Blob([audioFile.data], { type: tipoAudio })
    
    // añadimos el archivo de audio al FormData
    formDataParaSpeech.append('data_file', blobAudioFinal, nombreAudio)
    
    // preparamos la configuración de transcripción como JSON con el idioma seleccionado
    formDataParaSpeech.append('config', JSON.stringify({
      "type": "transcription",           // Tipo de trabajo: transcripción
      "transcription_config": {
        "operating_point": "enhanced",   // Calidad alta de transcripción
        "language": idiomaSeleccionado   // Idioma seleccionado por el usuario
      }
    }))

    console.log('📤 Enviando a Speechmatics con idioma:', idiomaSeleccionado)
    
    // hacemos la petición POST a Speechmatics y capturamos su respuesta
    const uploadResponse = await fetch('https://asr.api.speechmatics.com/v2/jobs/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      body: formDataParaSpeech // Enviar el FormData con audio y configuración
    })

    // vemos si la subida se hizo bien
    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.text()
      console.error('❌ Error subiendo:', uploadResponse.status, errorData)
      throw createError({
        statusCode: uploadResponse.status,
        statusMessage: `Error subiendo audio: ${errorData}`
      })
    }

    // capturamos el ID del job creado
    const uploadResult = await uploadResponse.json()
    const jobId = uploadResult.id
    
    console.log('✅ Job creado:', jobId)

    // iniciamos el contador de intentos
    let intentos = 0 
    const maxIntentos = 60
    
    // verificamos el estado cada 3 segundos haciendo llamadas GET con la id que nos han devuelto "jobId"
    while (intentos < maxIntentos) {
      // esperamos 3 segundos antes del siguiente intento para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      console.log(`🔄 Intento Nº ${intentos + 1}: Verificando estado del job con id: ${jobId}`)
      
      // hacemos petición GET para verificar el estado del job
      const statusResponse = await fetch(
        `https://asr.api.speechmatics.com/v2/jobs/${jobId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          }
        }
      )
      
      // si se ha hecho bien, capturamos el estado del job
      if (statusResponse.ok) {
        const jobStatus = await statusResponse.json()
        console.log('📊 Estado del job:', jobStatus.job?.status)
        
        if (jobStatus.job?.status === 'done') {
          console.log('✅ Job completado, obteniendo transcripción...')
          
          // como el servicio nos ha respondido que el estado de la transcripción es "done", 
          // hacemos llamada para traer el texto de la transcripción 
          const textoTranscripcion = await fetch(
            `https://asr.api.speechmatics.com/v2/jobs/${jobId}/transcript?format=txt`,
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${API_KEY}`
              }
            }
          )
          
          // si la descarga de transcripción se hizo bien
          if (textoTranscripcion.ok) {
            const transcript = await textoTranscripcion.text()
            console.log('✅ Transcripción obtenida:', transcript.substring(0, 100) + '...')
            
            // retornamos el resultado final
            return {
              success: true,
              jobId: jobId,
              textoTranscrito: transcript.trim(),
              attempts: intentos + 1,
              status: jobStatus.job?.status,
              idioma: idiomaSeleccionado // incluimos el idioma en la respuesta
            }
          } else {
            const errorText = await textoTranscripcion.text()
            console.error('❌ Error obteniendo transcripción:', textoTranscripcion.status, errorText)
            throw createError({
              statusCode: textoTranscripcion.status,
              statusMessage: `Error obteniendo transcripción: ${errorText}`
            })
          }
        } 
        // si llega aquí, significa que el job ha fallado o ha sido rechazado
        else if (jobStatus.job?.status === 'rejected' || jobStatus.job?.status === 'failed') {
          throw createError({
            statusCode: 422,
            statusMessage: `El job falló con estado: ${jobStatus.job?.status}`
          })
        } 
        // si llega aquí, significa que el job aún está en proceso, "queued" o "running"
        else {
          console.log(`⏳ Job en estado: ${jobStatus.job?.status}, esperando...`)
          intentos++
          continue // para volver a intentarlo
        }
      } else {
        // si llega aquí, significa que hubo un error al consultar el estado del job
        console.error('❌ Error consultando estado:', statusResponse.status)
        intentos++
        continue
      }
    }
    
    // si llega aquí, significa que se han llegado al máximo de intentos
    throw createError({
      statusCode: 408,
      statusMessage: 'Se ha llegado al máximo de intentos'
    })

  } catch (error: any) {
    // si ha llegado aquí, significa que hubo un error en el proceso de transcripción
    
    console.error('💥 Error en transcripción batch:', error)
    
    // si el error ya tiene un código de estado, re-lanzarlo
    if (error.statusCode) {
      throw error
    }
    
    // error genérico del servidor
    throw createError({
      statusCode: 500,
      statusMessage: `Error de servidor: ${error.message}`
    })
  }
})