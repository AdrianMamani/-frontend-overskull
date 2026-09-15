<template>
  <div>
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          Categorías
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          Administra las categorías de productos.
        </p>
      </div>

      <button
        type="button"
        class="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
        @click="abrirCrear"
      >
        Crear Categoría
      </button>
    </div>

    <!-- Tabla -->
    <CategoriaTable
      :categorias="store.categorias"
      :loading="store.loading"
      @edit="abrirEditar"
      @delete="abrirEliminar"
    />

    <!-- Modal crear / editar -->
    <CategoriaModal
      :visible="mostrarCategoriaModal"
      :categoria="categoriaSeleccionada"
      :loading="store.loading"
      @close="cerrarCategoriaModal"
      @save="guardarCategoria"
    />

    <!-- Modal confirmar eliminación -->
    <ConfirmModal
      :visible="mostrarConfirmModal"
      title="Eliminar categoría"
      :message="mensajeEliminar"
      :loading="store.loading"
      @close="cerrarConfirmModal"
      @confirm="confirmarEliminar"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import CategoriaTable from '@/components/categorias/CategoriaTable.vue'
import CategoriaModal from '@/components/categorias/CategoriaModal.vue'
import ConfirmModal from '@/components/categorias/ConfirmModal.vue'

import { useCategoriaStore } from '@/stores/categoriaStore'

const store = useCategoriaStore()

const mostrarCategoriaModal = ref(false)
const mostrarConfirmModal = ref(false)

const categoriaSeleccionada = ref(null)
const categoriaAEliminar = ref(null)

onMounted(() => {
  store.fetchCategorias()
})

const abrirCrear = () => {
  categoriaSeleccionada.value = null
  mostrarCategoriaModal.value = true
}

const abrirEditar = (categoria) => {
  categoriaSeleccionada.value = categoria
  mostrarCategoriaModal.value = true
}

const cerrarCategoriaModal = () => {
  mostrarCategoriaModal.value = false
  categoriaSeleccionada.value = null
}

const guardarCategoria = async (data) => {
  try {
    if (categoriaSeleccionada.value) {
      await store.updateCategoria(
        categoriaSeleccionada.value.id,
        data,
      )
    } else {
      await store.addCategoria(data)
    }

    cerrarCategoriaModal()
  } catch (error) {
    console.error(error)
  }
}

const abrirEliminar = (categoria) => {
  categoriaAEliminar.value = categoria
  mostrarConfirmModal.value = true
}

const cerrarConfirmModal = () => {
  mostrarConfirmModal.value = false
  categoriaAEliminar.value = null
}

const mensajeEliminar = computed(() => {
  if (!categoriaAEliminar.value) {
    return ''
  }

  return `¿Estás seguro de que deseas eliminar la categoría "${categoriaAEliminar.value.nombre}"? Esta acción no se puede deshacer.`
})

const confirmarEliminar = async () => {
  if (!categoriaAEliminar.value) {
    return
  }

  try {
    await store.deleteCategoria(categoriaAEliminar.value.id)

    cerrarConfirmModal()
  } catch (error) {
    console.error(error)
  }
}
</script>