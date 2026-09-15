import {defineStore} from 'pinia';

import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '@/services/categoriaService'

export const useCategoriaStore = defineStore('categoria', {
  state: () => ({
    categorias: [],
    loading: false,
    error: null,
    }),
    actions: {
        async fetchCategorias() {
            this.loading = true
            this.error = null
            try {
                const response = await obtenerCategorias()
                this.categorias = response.data.data ?? responde.data
            } catch (error) {
                this.error = 'No se pudieron obtener las categorías'
            } finally {
                this.loading = false
            }
            },
            async createCategoria(data) {
                await crearCategoria(data)
                await this.fetchCategorias()
            },
            async updateCategoria(id, data) {
                await actualizarCategoria(id, data)
                await this.fetchCategorias()
            },
            async deleteCategoria(id) {
                await eliminarCategoria(id)
                await this.fetchCategorias()
            },
    },
})