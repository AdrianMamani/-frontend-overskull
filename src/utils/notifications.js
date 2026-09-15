export const mostrarError = (message) => {
  window.dispatchEvent(
    new CustomEvent('notification', {
      detail: {
        type: 'error',
        message,
      },
    }),
  )
}

export const mostrarExito = (message) => {
  window.dispatchEvent(
    new CustomEvent('notification', {
      detail: {
        type: 'success',
        message,
      },
    }),
  )
}