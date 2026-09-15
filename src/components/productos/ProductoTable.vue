<template>
  <div class="overflow-hidden rounded-xl bg-white shadow-sm">
    <div
      v-if="loading"
      class="p-8 text-center text-sm text-gray-500"
    >
      Cargando productos...
    </div>

    <div
      v-else-if="productos.length === 0"
      class="p-8 text-center text-sm text-gray-500"
    >
      No hay productos registrados.
    </div>

    <div
      v-else
      class="overflow-x-auto"
    >
      <table class="w-full text-left">
        <thead class="border-b border-gray-200 bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
              ID
            </th>

            <th class="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
              Producto
            </th>

            <th class="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
              Categoría
            </th>

            <th class="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
              Precio
            </th>

            <th class="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
              Stock
            </th>

            <th class="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="producto in productos"
            :key="producto.id"
            class="transition hover:bg-gray-50"
          >
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ producto.id }}
            </td>

            <td class="px-6 py-4">
              <div class="font-medium text-gray-800">
                {{ producto.nombre }}
              </div>

              <div class="mt-1 max-w-xs truncate text-xs text-gray-400">
                {{ producto.descripcion }}
              </div>
            </td>

            <td class="px-6 py-4 text-sm text-gray-600">
              {{ producto.categoria?.nombre ?? producto.id_categoria }}
            </td>

            <td class="px-6 py-4 text-sm font-medium text-gray-700">
              S/ {{ Number(producto.precio).toFixed(2) }}
            </td>

            <td class="px-6 py-4 text-sm text-gray-600">
              {{ producto.stock }}
            </td>

            <td class="px-6 py-4">
              <div class="flex justify-end gap-2">
                <button
                  type="button"
                  title="Editar producto"
                  class="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                  @click="$emit('edit', producto)"
                >
                  <Pencil :size="16" />
                  Editar
                </button>

                <button
                  type="button"
                  title="Eliminar producto"
                  class="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  @click="$emit('delete', producto)"
                >
                  <Trash2 :size="16" />
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {
  Pencil,
  Trash2,
} from 'lucide-vue-next'

defineProps({
  productos: {
    type: Array,
    default: () => [],
  },

  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits([
  'edit',
  'delete',
])
</script>