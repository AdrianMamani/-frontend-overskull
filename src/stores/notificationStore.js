import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    visible: false,
    type: 'success',
    message: '',
  }),

  actions: {
    show(message, type = 'success') {
      this.message = message
      this.type = type
      this.visible = true

      setTimeout(() => {
        this.close()
      }, 4000)
    },

    success(message) {
      this.show(message, 'success')
    },

    error(message) {
      this.show(message, 'error')
    },

    close() {
      this.visible = false
    },
  },
})