<template>
  <div class="h-screen flex items-center justify-center bg-gray-50 p-6">
    <div class="text-center w-full max-w-md">

      <SignedIn>
        <section>
          <h1 class="text-3xl text-gray-800">Hola! {{ user?.username || 'Usuario' }}</h1>
          <hr>
        </section>
      </SignedIn>
      
      <section v-if="!estadoGrabando && !estadoTranscripcion && !textoTranscrito">
        <p class="text-2xl text-gray-800 mb-4">Nueva transcripción</p>
        
        <!-- Selector de idioma -->
        <div class="mb-6">
          <label class="block text-lg text-gray-700 mb-2">Selecciona el idioma:</label>
          <select v-model="idiomaSeleccionado" class="w-full p-3 border border-gray-300 rounded-md text-lg">
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇺🇸 Inglés</option>
            <option value="fr">🇫🇷 Francés</option>
            <option value="de">🇩🇪 Alemán</option>
          </select>
        </div>
        
        <button @click="startRecording" class="p-6 bg-green-500 hover:bg-green-600 text-white rounded-full">
          <Icon name="mdi:microphone" style="color: white" size="50px" />
        </button>
      </section>

      <!-- grabando -->
      <section v-else-if="estadoGrabando">
        <p class="text-2xl text-gray-800 mb-2">🔴 Grabando...</p>
        <p class="text-lg text-gray-600 mb-4">Idioma: {{ getNombreIdioma(idiomaSeleccionado) }}</p>
        <button @click="stopGrabacion" class="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full">
          <Icon name="mdi:stop" style="color: white" size="24px" />
        </button>
      </section>

      <!-- transcribiendo -->
      <section v-else-if="estadoTranscripcion">
        <p class="text-2xl text-gray-800">⏳ Transcribiendo...</p>
        <p class="text-lg text-gray-600">Idioma: {{ getNombreIdioma(idiomaSeleccionado) }}</p>
      </section>

      <!-- resultado transcripcion -->
      <section v-else-if="textoTranscrito && !mostrarTags">
        <p class="text-2xl text-gray-800 mb-4">📝 Transcripción</p>
        
        <textarea readonly v-model="textoTranscrito" class="w-full h-40 p-4 border border-gray-300 rounded-md mb-4" ></textarea>
        
        <div class="flex space-x-2 mb-4">
          <button @click="copyText" class="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"> 📋 Copiar </button>
          <button @click="reset" class="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"> 🔄 Nueva </button>
        </div>

        <SignedIn>
          <button @click="mostrarTags = true" class="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"> 💾 Continuar para guardar </button>
        </SignedIn>
        
        <SignedOut>
          <p class="text-red-700">Para poder guardar tus transcripciones debes iniciar sesión</p>
        </SignedOut>
      </section>

      <!-- etiquetas -->
      <section v-else-if="mostrarTags">
        <p class="text-2xl text-gray-800 mb-4">🏥 Etiquetas médicas</p>
        <p class="text-sm text-gray-600 mb-4">Selecciona etiquetas relacionadas:</p>
        
        <div class="grid grid-cols-2 gap-2 mb-6">
          <label v-for="tag in tagsMedicos" :key="tag.value" class="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50" :class="{ 'bg-blue-50 border-blue-300': tagsSeleccionados.includes(tag.value) }">
            <input type="checkbox" :value="tag.value" v-model="tagsSeleccionados" class="rounded">
            <span class="text-sm">{{ tag.label }}</span>
          </label>
        </div>
        
        <div class="flex space-x-2">
          <button @click="mostrarTags = false" class="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"> Volver </button>
          
          <button @click="guardar" :disabled="guardando" class="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-md"> {{ guardando ? '⏳ Guardando...' : '💾 Guardar' }} </button>
        </div>
      </section>

      <!-- error -->
      <div v-if="mensajeError" class="mt-4 p-4 bg-red-50 border-red-400 border rounded">
        <p class="text-red-700">❌ {{ mensajeError }}</p>
        <button @click="mensajeError = ''" class="text-red-500 text-sm mt-2"> Cerrar </button>
      </div>

      <!-- exito -->
      <div v-if="mensajeExito" class="mt-4 p-4 bg-green-50 border-green-400 border rounded">
        <p class="text-green-700">✅ {{ mensajeExito }}</p>
        <button @click="mensajeExito = ''" class="text-green-500 text-sm mt-2"> Cerrar </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const { user } = useUser()
    return { user }
  },
  data() {
    return {
      estadoGrabando: false,
      estadoTranscripcion: false,
      textoTranscrito: '',
      mensajeError: '',
      mensajeExito: '',
      guardando: false,
      mediaRecorder: null,
      audioChunks: [],
      idiomaSeleccionado: 'es',
      mostrarTags: false,
      tagsSeleccionados: [],
      tagsMedicos: [
        { value: 'cardiologia', label: 'Cardiología'},
        { value: 'neurologia', label: 'Neurología'},
        { value: 'traumatologia', label: 'Traumatología'},
        { value: 'pediatria', label: 'Pediatría'},
        { value: 'ginecologia', label: 'Ginecología'},
        { value: 'dermatologia', label: 'Dermatología'},
        { value: 'oftalmologia', label: 'Oftalmología'},
        { value: 'otorrinolaringologia', label: 'Otorrinolaringología'},
        { value: 'psiquiatria', label: 'Psiquiatría'},
        { value: 'medicina_general', label: 'Medicina General'}
      ]
    }
  },

  methods: {
    // capturamos nombre del idioma para la transcripcion
    getNombreIdioma(codigo) {
      const idiomas = {
        'es': '🇪🇸 Español',
        'en': '🇺🇸 Inglés', 
        'fr': '🇫🇷 Francés',
        'de': '🇩🇪 Alemán'
      }
      return idiomas[codigo] || codigo
    },

    // funcion para empezar la grabacion
    async startRecording() {
      try {
        // limpiamos variables
        this.textoTranscrito = ''
        this.mensajeError = ''
        this.mensajeExito = ''
        this.audioChunks = []
        this.mostrarTags = false
        this.tagsSeleccionados = []
        
        // capturamos el stream del micro
        const streamDelMicrofono = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            channelCount: 1,
            sampleRate: 16000
          }
        })
        // creamos MediaRecorder para capturar el audio
        this.mediaRecorder = new MediaRecorder(streamDelMicrofono)
        // configuracion de evento cuando hay datos de audio disponibles
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) this.audioChunks.push(event.data)
        }
        
        // iniciamos la grabacion
        this.mediaRecorder.start()
        this.estadoGrabando = true

        // configuracion de evento cuando se detiene la grabacion
        this.mediaRecorder.onstop = async () => {
          // creamos el blob con el audio grabado
          const audioFinal = new Blob(this.audioChunks, { type: 'audio/webm' })
          
          // liberamos micro para que no de problemas para la proxima grabacion
          streamDelMicrofono.getTracks().forEach(track => track.stop())
          
          // pasamos a MP3
          const mp3Blob = await this.convertToMp3(audioFinal)
          
          // mandamos transcripcion con el idioma seleccionado
          await this.transcribeAudio(mp3Blob)
        }
        
      } catch (err) {
        this.mensajeError = `Error: ${err.message}`
      }
    },

    // stop de grabacion
    stopGrabacion() {
      if (this.mediaRecorder && this.estadoGrabando) {
        this.mediaRecorder.stop()
        this.estadoGrabando = false
      }
    },

    async transcribeAudio(audioFinal) {
      this.estadoTranscripcion = true
      
      try {
        // creamos un FormData para enviar todos los datos necesarios a Speechmatics
        const formData = new FormData()
        formData.append('audio', audioFinal, 'grabacionVocalid.wav')
        formData.append('idioma', this.idiomaSeleccionado)
        
        // hacemos la petición POST al endpoint de transcripción
        const response = await $fetch('/api/transcribe-batch', {
          method: 'POST',
          body: formData
        })
        
        if (response.success) {
          this.textoTranscrito = response.textoTranscrito
        } else {
          throw new Error(response.error)
        }
        
      } catch (err) {
        this.mensajeError = err.message
      } finally {
        // para que para bien (se devuelve la transcripcion) o para mal (se devuelve un mensaje de error) se de una respuesta al usuario
        this.estadoTranscripcion = false
      }
    },

    // pasamos audio a MP3 usando lamejs
    async convertToMp3(audioFinal) {
      await this.loadLameJs()
      
      const audioContext = new window.AudioContext()
      const arrayBuffer = await audioFinal.arrayBuffer()
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      
      const mp3encoder = new window.lamejs.Mp3Encoder(1, 44100, 128)
      
      const samples = audioBuffer.getChannelData(0)
      const int16Buffer = new Int16Array(samples.length)
      
      for (let i = 0; i < samples.length; i++) {
        int16Buffer[i] = samples[i] * 0x7FFF
      }
      
      const mp3Data = []
      const blockSize = 1152
      
      for (let i = 0; i < int16Buffer.length; i += blockSize) {
        const chunk = int16Buffer.subarray(i, i + blockSize)
        const mp3buf = mp3encoder.encodeBuffer(chunk)
        if (mp3buf.length > 0) mp3Data.push(mp3buf)
      }
      
      const finalBuffer = mp3encoder.flush()
      if (finalBuffer.length > 0) mp3Data.push(finalBuffer)
      
      return new Blob(mp3Data, { type: 'audio/mp3' })
    },

    // Cargar librería LameJS
    loadLameJs() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.0/lame.min.js'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
        console.log('✅ Librería lameJs cargada')
      })
    },

    // guardado de transcripcion al backend
    async guardar() {
      try {
        this.guardando = true
        this.mensajeError = ''
        this.mensajeExito = ''

        // preparamos los datos con todos los campos que hay que mandar a back
        const datos = {
          idUser: this.user.id,
          transcripcion: this.textoTranscrito,
          tags: this.tagsSeleccionados,
          lenguaje: this.idiomaSeleccionado
        }

        //console.log('enviando datos:', datos)

        const response = await fetch('http://localhost:1234/transcripcions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos)
        })

        // si todo va bien ...
        if (!response.ok) {
          const errorData = await response.text()
          throw new Error(`Error del servidor: ${errorData}`)
        }

        this.mensajeExito = 'Transcripcion guardada correctamente'
        //console.log('se ha guardado bien la transcripcion en backend')

        // Resetear después de 2 segundos
        setTimeout(() => {
          this.reset()
        }, 2000)

      } catch (err) {
        this.mensajeError = `Error al guardar: ${err.message}`
        console.error('❌ Error guardando transcripcion:', err)
      } finally {
        // asi dejamos listo los campos para una nueva grabacion
        this.guardando = false
      }
    },

    async copyText() {
      try {
        await navigator.clipboard.writeText(this.textoTranscrito)
      } catch (err) {
        this.mensajeError = 'No se pudo copiar el texto'
      }
    },

    reset() {
      this.estadoGrabando = false
      this.estadoTranscripcion = false
      this.textoTranscrito = ''
      this.mensajeError = ''
      this.audioChunks = []
      this.mediaRecorder = null
      this.mostrarTags = false
      this.tagsSeleccionados = []
      this.mensajeExito = ''
      this.idiomaSeleccionado = 'es'
    }
  }
}
</script>

<style scoped>
</style>