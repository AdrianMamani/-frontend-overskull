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
      <div class="relative w-full max-w-md rounded-xl bg-white shadow-xl">

        <!-- Contenido -->
        <div class="px-6 py-6">

          <!-- Botón cerrar -->
          <button
            type="button"
            :disabled="loading"
            class="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed"
            @click="cerrar"
          >
            <X :size="20" />
          </button>

          <!-- Icono de alerta -->
          <div
            class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
          >
            <TriangleAlert
              :size="24"
              class="text-red-600"
            />
          </div>

          <h2 class="text-lg font-semibold text-gray-800">
            {{ title }}
          </h2>

          <p class="mt-2 text-sm leading-6 text-gray-500">
            {{ message }}
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
            type="button"
            :disabled="loading"
            class="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            @click="$emit('confirm')"
          >
            <Trash2 :size="17" />

            {{ loading ? 'Eliminando...' : 'Sí, eliminar' }}
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {
  TriangleAlert,
  X,
  Trash2,
} from 'lucide-vue-next'

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: 'Confirmar acción',
  },

  message: {
    type: String,
    default: '¿Estás seguro de realizar esta acción?',
  },

  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'close',
  'confirm',
])

const cerrar = () => {
  emit('close')
}
</script>