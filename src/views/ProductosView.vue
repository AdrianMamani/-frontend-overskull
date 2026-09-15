<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          Productos
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          Administra los productos registrados.
        </p>
      </div>

      <button
        type="button"
        class="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
        @click="abrirCrear"
      >
        Crear Producto
      </button>
    </div>

    <ProductoTable
      :productos="productoStore.productos"
      :loading="productoStore.loading"
      @edit="abrirEditar"
      @delete="abrirEliminar"
    />

    <ProductoForm
      :visible="mostrarProductoModal"
      :producto="productoSeleccionado"
      :categorias="categoriaStore.categorias"
      :loading="productoStore.loading"
      @close="cerrarProductoModal"
      @save="guardarProducto"
    />

    <ConfirmModal
      :visible="mostrarConfirmModal"
      title="Eliminar producto"
      :message="mensajeEliminar"
      :loading="productoStore.loading"
      @close="cerrarConfirmModal"
      @confirm="confirmarEliminar"
    />
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue'

import ProductoTable from '@/components/productos/ProductoTable.vue'
import ProductoForm from '@/components/productos/ProductoForm.vue'
import ConfirmModal from '@/components/categorias/ConfirmModal.vue'

import { useProductoStore } from '@/stores/productoStore'
import { useCategoriaStore } from '@/stores/categoriaStore'

const productoStore = useProductoStore()
const categoriaStore = useCategoriaStore()

const mostrarProductoModal = ref(false)
const mostrarConfirmModal = ref(false)

const productoSeleccionado = ref(null)
const productoAEliminar = ref(null)

onMounted(async () => {
  await Promise.all([
    productoStore.fetchProductos(),
    categoriaStore.fetchCategorias(),
  ])
})

const abrirCrear = () => {
  productoSeleccionado.value = null
  mostrarProductoModal.value = true
}

const abrirEditar = (producto) => {
  productoSeleccionado.value = producto
  mostrarProductoModal.value = true
}

const cerrarProductoModal = () => {
  mostrarProductoModal.value = false
  productoSeleccionado.value = null
}

const guardarProducto = async (data) => {
  if (productoSeleccionado.value) {
    await productoStore.updateProducto(
      productoSeleccionado.value.id,
      data,
    )
  } else {
    await productoStore.addProducto(data)
  }

  cerrarProductoModal()
}

const abrirEliminar = (producto) => {
  productoAEliminar.value = producto
  mostrarConfirmModal.value = true
}

const cerrarConfirmModal = () => {
  mostrarConfirmModal.value = false
  productoAEliminar.value = null
}

const mensajeEliminar = computed(() => {
  if (!productoAEliminar.value) {
    return '¿Estás seguro de que deseas eliminar este producto?'
  }

  return `¿Estás seguro de que deseas eliminar el producto "${productoAEliminar.value.nombre}"? Esta acción no se puede deshacer.`
})

const confirmarEliminar = async () => {
  if (!productoAEliminar.value) return

  await productoStore.deleteProducto(
    productoAEliminar.value.id,
  )

  cerrarConfirmModal()
}
</script>