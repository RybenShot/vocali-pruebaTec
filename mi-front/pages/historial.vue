<template>
  <div class="min-h-screen bg-gray-50 pt-20 pb-8 px-6">
    <div class="max-w-6xl mx-auto">
      
      <!--  usuarios no logueados -->
      <SignedOut>
        <div class="text-center py-20">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Acceso Requerido</h2>
          <p class="text-gray-600 mb-8">Necesitas iniciar sesión para ver tu historial de transcripciones</p>
          <SignInButton/>
        </div>
      </SignedOut>

      <!--  usuarios SI logueados -->
      <SignedIn>
        
        <!-- parte superior, titulo y filtros -->
        <section class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Historial de Transcripciones</h1>
          
          <!-- filtro por etiquetas -->
          <div class="mt-4 flex flex-wrap items-center gap-4">
            <div class="relative" data-dropdown="tags">
              <button @click="mostrarMenuTags = !mostrarMenuTags" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"> 🏥 Filtrar por etiqueta
                
                <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>

              </button>

              <!-- dropdown de etiquetas -->
              <div v-if="mostrarMenuTags" class="absolute z-10 mt-1 w-72 bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto">
                
                <!-- boton de mostrar todas -->
                <button @click="filtrarPorTag(null)" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center" :class="{ 'bg-green-100 text-green-900': !tagSeleccionado }">
                  <span class="mr-2">🔄</span>Mostrar todas las transcripciones
                </button>

                <hr class="my-1">

                <!-- resto de botones de etiquetas -->
                <button v-for="(tagInfo, tagKey) in listaTags" :key="tagKey" @click="filtrarPorTag(tagKey)" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between" :class="{ 'bg-green-100 text-green-900': tagSeleccionado === tagKey }">

                  <span class="flex items-center"> {{ tagInfo.nombre }} </span>

                  <!-- contador de transcripciones para esta especialidad -->
                  <span class="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {{ contarTranscripcionesPorTag(tagKey) }}
                  </span>
                </button>
              </div>
            </div>

            <!-- mostrar filtro activo -->
            <div v-if="tagSeleccionado" class="flex items-center gap-2">
              <span class="text-sm text-gray-500">Filtrando por:</span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{{ obtenerNombreTag(tagSeleccionado) }}
              </span>
            </div>

            <!-- contador de resultados -->
            <div class="text-sm text-gray-500">
              {{ transcripcionesFiltradas.length }} de {{ transcripciones.length }} transcripciones
            </div>
          </div>
        </section>

        <!-- pagina loading -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <span class="ml-3 text-gray-600">Cargando transcripciones...</span>
        </div>

        <!-- tabla de historial -->
        <div v-if="!loading" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <!-- CABECERA de la tabla -->
              <thead class="bg-green-600 text-white">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider w-32">Fecha</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider w-40">Tags</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider w-24">Idioma</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Transcripción</th>
                </tr>
              </thead>
              
              <!-- CUERPO de la tabla -->
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(item) in transcripcionesFiltradas" :key="item._id" class="hover:bg-gray-50 transition-colors">

                  <!-- fecha -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div>
                        <div class="text-xs font-medium text-gray-900">{{ formatearFecha(item.createdAt) }}</div>
                        <div class="text-xs text-gray-500">{{ formatearHora(item.createdAt) }}</div>
                      </div>
                    </div>
                  </td>

                  <!-- etiquetas - tags -->
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-1">
                      <span v-for="tag in item.tags" :key="tag"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{{ obtenerNombreTag(tag) }}
                      </span>
                      <span v-if="!item.tags || item.tags.length === 0" class="text-xs text-gray-400">Sin etiquetas</span>
                    </div>
                  </td>

                  <!-- idioma -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ obtenerBanderaIdioma(item.lenguaje) }} {{ obtenerNombreIdioma(item.lenguaje) }}
                    </span>
                  </td>
                  
                  <!-- text transcripcion -->
                  <td class="px-6 py-4">
                    <div class="relative bg-gray-50 p-3 rounded-md border">
                      <div class="text-sm text-gray-900 leading-relaxed pr-16">{{item.message}}</div>
                      <button @click="copiarTranscripcion(item)" class="absolute top-2 right-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors">Copiar</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- sin resultados del filtro -->
          <div v-if="transcripcionesFiltradas.length === 0 && transcripciones.length > 0" class="text-center py-12">
            <h3 class="mt-2 text-sm font-medium text-gray-900">No se encontraron transcripciones</h3>
            <p class="mt-1 text-sm text-gray-500">No hay transcripciones de la etiqueta seleccionada.</p>
          </div>

          <!-- sin transcripciones -->
          <div v-if="transcripciones.length === 0" class="text-center py-12">
            <h3 class="mt-2 text-sm font-medium text-gray-900">No hay transcripciones aun</h3>
          </div>
        </div>

        <!-- toast de exito al copiar -->
        <div v-if="mostrarToast" class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300" :class="{ 'opacity-0': !mostrarToast }">
          <div class="flex items-center">Transcripción copiada al portapapeles</div>
        </div>

      </SignedIn>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const { user } = useUser()
    
    return { user }
  },
  name: 'historial',
  data() {
    return {
      transcripciones: [],
      loading: true,
      mostrarToast: false,
      mostrarMenuTags: false,
      tagSeleccionado: null,
      listaTags: {
        'cardiologia': { nombre: 'Cardiología'},
        'neurologia': { nombre: 'Neurología'},
        'traumatologia': { nombre: 'Traumatología'},
        'pediatria': { nombre: 'Pediatría'},
        'ginecologia': { nombre: 'Ginecología'},
        'dermatologia': { nombre: 'Dermatología'},
        'oftalmologia': { nombre: 'Oftalmología'},
        'otorrinolaringologia': { nombre: 'Otorrino'},
        'psiquiatria': { nombre: 'Psiquiatría'},
        'medicina_general': { nombre: 'Medicina General'}
      },
      idiomas: {
        'es': { nombre: 'Español', bandera: '🇪🇸' },
        'en': { nombre: 'Inglés', bandera: '🇺🇸' },
        'fr': { nombre: 'Francés', bandera: '🇫🇷' },
        'de': { nombre: 'Alemán', bandera: '🇩🇪' }
      }
    }
  },
  
  computed: {
    // Ordenar por fecha (mas recientes primero)
    transcripcionesOrdenadas() {
      return [...this.transcripciones].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },

    // filtro por etiqueta seleccionada
    transcripcionesFiltradas() {

      // si no hay etiqueta seleccionada, devolvemos todas las transcripciones ordenadas de ultimo a mas antiguo
      if (!this.tagSeleccionado) {
        return this.transcripcionesOrdenadas
      }
      
      return this.transcripcionesOrdenadas.filter(transcripcion => 
        transcripcion.tags && transcripcion.tags.includes(this.tagSeleccionado)
      )
    }
  },
  
  methods: {
    async obtenerTranscripciones() {
      this.loading = true
      
      try {
        const response = await fetch(`http://localhost:1234/transcripcions/${this.user.id}`)
        //console.log('respuesta del servidor:', response)
        
        if(response.status === 404) {
          // no hay transcripciones
          this.transcripciones = []
          return
        } else if (!response.ok) {
          // error desconocido
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        
        //convertimos la respuesta a JSON
        const data = await response.json()
        
        // extraemos las transcripciones 
        this.transcripciones = data.transcriptions
        
      } catch (error) {
        console.error('Error al obtener transcripciones:', error)
      } finally {
        this.loading = false
      }
    },
    
    // funcion para copiar texto
    async copiarTranscripcion(item) {
      const texto = item.message
      
      try {
        await navigator.clipboard.writeText(texto)
        this.mostrarToast = true
        
        // ocultamos el toast después de 3 segundos
        setTimeout(() => {
          this.mostrarToast = false
        }, 3000)
        
      } catch (error) {
        console.error('Error al copiar el texto:', error)
      }
    },

    // funcion para filtrar
    filtrarPorTag(tag) {
      this.tagSeleccionado = tag
      this.mostrarMenuTags = false
    },

    // funcion para contar el Nº de transcripciones por etiqueta en el menu del filtro
    contarTranscripcionesPorTag(tag) {
      return this.transcripciones.filter(transcripcion => 
        transcripcion.tags && transcripcion.tags.includes(tag)
      ).length
    },

    // funcion para obtener info del tag filtrado
    obtenerNombreTag(tag) {
      return this.listaTags[tag].nombre
    },

    obtenerNombreIdioma(idioma) {
      return this.idiomas[idioma].nombre
    },
    obtenerBanderaIdioma(idioma) {
      return this.idiomas[idioma].bandera
    },
    
    formatearFecha(fecha) {
      const date = new Date(fecha)
      
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    },
    
    formatearHora(fecha) {
      const date = new Date(fecha)
      
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })
    },
  },
  mounted() {
    // cargamos transcripciones al montar el componente
    if (this.user.id) {
      this.obtenerTranscripciones()
    }
  }
}
</script>