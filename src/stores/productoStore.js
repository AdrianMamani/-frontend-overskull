import { defineStore } from 'pinia'

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '@/services/productoService'

export const useProductoStore = defineStore('productos', {
  state: () => ({
    productos: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProductos() {
      this.loading = true
      this.error = null

      try {
        const response = await obtenerProductos()

        this.productos = response.data.data ?? response.data
      } catch (error) {
        this.error = 'No se pudieron obtener los productos'
      } finally {
        this.loading = false
      }
    },

    async addProducto(data) {
      await crearProducto(data)
      await this.fetchProductos()
    },

    async updateProducto(id, data) {
      await actualizarProducto(id, data)
      await this.fetchProductos()
    },

    async deleteProducto(id) {
      await eliminarProducto(id)
      await this.fetchProductos()
    },
  },
})