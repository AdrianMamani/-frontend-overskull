import axios from 'axios';
import { mostrarError } from '@/utils/notifications'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

api.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    if (!error.response) {
      mostrarError(
        'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      )
    } else if (
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      mostrarError(
        error.response.data?.message ||
          'La solicitud no pudo ser procesada.',
      )
    } else if (error.response.status >= 500) {
      mostrarError(
        'Ocurrió un error en el servidor. Inténtalo nuevamente.',
      )
    } else {
      mostrarError(
        'Ocurrió un error inesperado. Inténtalo nuevamente.',
      )
    }

    return Promise.reject(error)
  },
)

export default api;