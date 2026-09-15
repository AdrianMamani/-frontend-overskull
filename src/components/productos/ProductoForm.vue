<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        class="absolute inset-0 bg-black/50"
        @click="cerrar"
      ></div>

      <div class="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div
          class="flex items-center justify-between border-b border-gray-200 px-6 py-4"
        >
          <h2 class="text-lg font-semibold text-gray-800">
            {{ esEdicion ? 'Editar Producto' : 'Crear Producto' }}
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

        <form @submit.prevent="guardar">
          <div class="space-y-5 px-6 py-6">

            <!-- Categoría -->
            <div>
              <label
                for="id_categoria"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Categoría
                <span class="text-red-500">*</span>
              </label>

              <select
                id="id_categoria"
                v-model="form.id_categoria"
                required
                :class="[
                  'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition',
                  errores.id_categoria
                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                ]"
                @change="errores.id_categoria = ''"
              >
                <option value="">
                  Selecciona una categoría
                </option>

                <option
                  v-for="categoria in categorias"
                  :key="categoria.id"
                  :value="categoria.id"
                >
                  {{ categoria.nombre }}
                </option>
              </select>

              <p
                v-if="errores.id_categoria"
                class="mt-1.5 text-sm text-red-500"
              >
                {{ errores.id_categoria }}
              </p>
            </div>

            <!-- Nombre -->
            <div>
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
                placeholder="Ej. Agua mineral"
                :class="[
                  'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition',
                  errores.nombre
                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                ]"
                @input="errores.nombre = ''"
              />

              <p
                v-if="errores.nombre"
                class="mt-1.5 text-sm text-red-500"
              >
                {{ errores.nombre }}
              </p>
            </div>

            <!-- Descripción -->
            <div>
              <label
                for="descripcion"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Descripción
                <span class="text-red-500">*</span>
              </label>

              <textarea
                id="descripcion"
                v-model="form.descripcion"
                rows="3"
                required
                placeholder="Descripción del producto"
                :class="[
                  'w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none transition',
                  errores.descripcion
                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                ]"
                @input="errores.descripcion = ''"
              ></textarea>

              <p
                v-if="errores.descripcion"
                class="mt-1.5 text-sm text-red-500"
              >
                {{ errores.descripcion }}
              </p>
            </div>

            <!-- Precio -->
            <div>
              <label
                for="precio"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Precio
                <span class="text-red-500">*</span>
              </label>

              <input
                id="precio"
                v-model="form.precio"
                type="number"
                min="0"
                step="0.01"
                required
                placeholder="0.00"
                :class="[
                  'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition',
                  errores.precio
                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                ]"
                @input="errores.precio = ''"
              />

              <p
                v-if="errores.precio"
                class="mt-1.5 text-sm text-red-500"
              >
                {{ errores.precio }}
              </p>
            </div>

            <!-- Stock -->
            <div>
              <label
                for="stock"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Stock
                <span class="text-red-500">*</span>
              </label>

              <input
                id="stock"
                v-model="form.stock"
                type="number"
                min="0"
                step="1"
                required
                placeholder="0"
                :class="[
                  'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition',
                  errores.stock
                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                ]"
                @input="errores.stock = ''"
              />

              <p
                v-if="errores.stock"
                class="mt-1.5 text-sm text-red-500"
              >
                {{ errores.stock }}
              </p>
            </div>

          </div>

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

  producto: {
    type: Object,
    default: null,
  },

  categorias: {
    type: Array,
    default: () => [],
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
  id_categoria: '',
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
})

const errores = reactive({
  id_categoria: '',
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
})

const esEdicion = computed(() => !!props.producto)

const limpiarErrores = () => {
  errores.id_categoria = ''
  errores.nombre = ''
  errores.descripcion = ''
  errores.precio = ''
  errores.stock = ''
}

const cargarProducto = (producto) => {
  limpiarErrores()

  if (!producto) {
    form.id_categoria = ''
    form.nombre = ''
    form.descripcion = ''
    form.precio = ''
    form.stock = ''
    return
  }

  form.id_categoria = producto.id_categoria ?? ''
  form.nombre = producto.nombre ?? ''
  form.descripcion = producto.descripcion ?? ''
  form.precio = producto.precio ?? ''
  form.stock = producto.stock ?? ''
}

watch(
  () => props.producto,
  (producto) => {
    cargarProducto(producto)
  },
  { immediate: true },
)

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      cargarProducto(props.producto)
    }
  },
)

const cerrar = () => {
  if (props.loading) return

  emit('close')
}

const guardar = () => {
  limpiarErrores()

  const nombre = String(form.nombre).trim()
  const descripcion = String(form.descripcion).trim()
  const idCategoria = form.id_categoria
  const precio = form.precio
  const stock = form.stock

  let valido = true

  if (!idCategoria) {
    errores.id_categoria = 'La categoría es obligatoria.'
    valido = false
  }

  if (!nombre) {
    errores.nombre = 'El nombre del producto es obligatorio.'
    valido = false
  }

  if (!descripcion) {
    errores.descripcion = 'La descripción es obligatoria.'
    valido = false
  }

  if (
    precio === '' ||
    precio === null ||
    Number(precio) < 0
  ) {
    errores.precio = 'El precio es obligatorio.'
    valido = false
  }

  if (
    stock === '' ||
    stock === null ||
    Number(stock) < 0
  ) {
    errores.stock = 'El stock es obligatorio.'
    valido = false
  }

  if (!valido) return

  emit('save', {
    id_categoria: Number(idCategoria),
    nombre,
    descripcion,
    precio: Number(precio),
    stock: Number(stock),
  })
}
</script>