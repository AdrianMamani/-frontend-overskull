<template>
  <div class="bg-white rounded-xl shadow-sm p-6">

    <h2 class="text-lg font-semibold text-gray-800 mb-5">
      {{ categoriaEditando ? 'Editar categoría' : 'Nueva categoría' }}
    </h2>

    <form @submit.prevent="guardar">

      <div class="mb-4">

        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nombre
        </label>

        <input
          v-model="form.nombre"
          type="text"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          placeholder="Nombre de categoría"
        />

      </div>

      <div class="flex gap-3">

        <button
          type="submit"
          class="rounded-lg bg-red-600 px-5 py-2.5 text-white font-medium hover:bg-red-700"
        >
          {{ categoriaEditando ? 'Actualizar' : 'Guardar' }}
        </button>

        <button
          v-if="categoriaEditando"
          type="button"
          class="rounded-lg bg-gray-200 px-5 py-2.5 text-gray-700 hover:bg-gray-300"
          @click="cancelar"
        >
          Cancelar
        </button>

      </div>

    </form>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  categoriaEditando: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({
  nombre: '',
})

watch(
  () => props.categoriaEditando,
  (categoria) => {
    if (categoria) {
      form.value = {
        nombre: categoria.nombre,
      }
    } else {
      form.value = {
        nombre: '',
      }
    }
  },
  { immediate: true },
)

const guardar = () => {
  emit('save', {
    ...form.value,
  })
}

const cancelar = () => {
  emit('cancel')
}
</script>