<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

    <!-- Loading -->
    <div
      v-if="loading"
      class="flex items-center justify-center px-6 py-12"
    >
      <p class="text-sm text-gray-500">
        Cargando categorías...
      </p>
    </div>

    <!-- Tabla -->
    <div
      v-else
      class="overflow-x-auto"
    >
      <table class="w-full text-left">

        <thead class="border-b border-gray-200 bg-gray-50">
          <tr>
            <th
              class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              ID
            </th>

            <th
              class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              Nombre
            </th>

            <th
              class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              Acciones
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">

          <tr
            v-for="categoria in categorias"
            :key="categoria.id"
            class="transition hover:bg-gray-50"
          >

            <td class="px-6 py-4 text-sm text-gray-500">
              {{ categoria.id }}
            </td>

            <td class="px-6 py-4">
              <span class="text-sm font-medium text-gray-800">
                {{ categoria.nombre }}
              </span>
            </td>

            <td class="px-6 py-4">
              <div class="flex justify-end gap-2">

                <button
                  type="button"
                  class="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                  @click="$emit('edit', categoria)"
                >
                  Editar
                </button>

                <button
                  type="button"
                  class="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  @click="$emit('delete', categoria)"
                >
                  Eliminar
                </button>

              </div>
            </td>

          </tr>

          <!-- Sin resultados -->
          <tr v-if="categorias.length === 0">
            <td
              colspan="3"
              class="px-6 py-12 text-center"
            >
              <p class="text-sm font-medium text-gray-700">
                No hay categorías
              </p>

              <p class="mt-1 text-sm text-gray-500">
                Crea una categoría para comenzar.
              </p>
            </td>
          </tr>

        </tbody>

      </table>
    </div>

  </div>
</template>

<script setup>
defineProps({
  categorias: {
    type: Array,
    default: () => [],
  },

  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['edit', 'delete'])
</script>