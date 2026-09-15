<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <!-- Fondo -->
      <div
        class="absolute inset-0 bg-black/50"
        @click="cerrar"
      ></div>

      <!-- Modal -->
      <div
        class="relative w-full max-w-md rounded-xl bg-white shadow-xl"
      >

        <!-- Header -->
        <div
          class="flex items-center justify-between border-b border-gray-200 px-6 py-4"
        >
          <h2 class="text-lg font-semibold text-gray-800">
            {{ esEdicion ? 'Editar Categoría' : 'Crear Categoría' }}
          </h2>

          <button
            type="button"
            :disabled="loading"
            class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed"
            @click="cerrar"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="guardar">

          <div class="px-6 py-6">

            <label
              for="nombre"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Nombre
              <span class="text-red-500">*</span>
            </label>

            <input
              id="nombre"
              v-model="form.nombre"
              type="text"
              required
              :class="[
                'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition',
                errorNombre
                  ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              ]"
              placeholder="Ej. Camiseta Overskull"
              @input="errorNombre = ''"
            />

            <p
              v-if="errorNombre"
              class="mt-1.5 text-sm text-red-500"
            >
              {{ errorNombre }}
            </p>

          </div>

          <!-- Footer -->
          <div
            class="flex justify-end gap-3 border-t border-gray-200 px-6 py-4"
          >

            <button
              type="button"
              :disabled="loading"
              class="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              @click="cerrar"
            >
              Cancelar
            </button>

            <button
              type="submit"
              :disabled="loading"
              class="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save :size="17" />

              {{
                loading
                  ? 'Guardando...'
                  : esEdicion
                    ? 'Actualizar'
                    : 'Crear'
              }}
            </button>

          </div>

        </form>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {
  computed,
  reactive,
  ref,
  watch,
} from 'vue'

import {
  X,
  Save,
} from 'lucide-vue-next'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },

  categoria: {
    type: Object,
    default: null,
  },

  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'close',
  'save',
])

const form = reactive({
  nombre: '',
})

const errorNombre = ref('')

const esEdicion = computed(() => {
  return !!props.categoria
})

watch(
  () => props.categoria,
  (categoria) => {
    errorNombre.value = ''

    if (categoria) {
      form.nombre = categoria.nombre ?? ''
    } else {
      form.nombre = ''
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      errorNombre.value = ''

      if (!props.categoria) {
        form.nombre = ''
      }
    }
  },
)

const cerrar = () => {
  if (props.loading) {
    return
  }

  emit('close')
}

const guardar = () => {
  const nombre = form.nombre.trim()

  if (!nombre) {
    errorNombre.value = 'El nombre de la categoría es obligatorio.'
    return
  }

  errorNombre.value = ''

  emit('save', {
    nombre,
  })
}
</script>