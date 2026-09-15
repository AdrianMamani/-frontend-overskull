<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-[-20px] opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-[-20px] opacity-0"
    >
      <div
        v-if="visible"
        class="fixed right-6 top-6 z-[100] w-full max-w-sm"
      >
        <div
          :class="[
            'flex items-start gap-3 rounded-xl border bg-white p-4 shadow-lg',
            type === 'success'
              ? 'border-green-200'
              : 'border-red-200',
          ]"
        >
          <div
            :class="[
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
              type === 'success'
                ? 'bg-green-100'
                : 'bg-red-100',
            ]"
          >
            <Check
              v-if="type === 'success'"
              :size="20"
              class="text-green-600"
            />

            <TriangleAlert
              v-else
              :size="20"
              class="text-red-600"
            />
          </div>

          <div class="flex-1">
            <p
              :class="[
                'text-sm font-semibold',
                type === 'success'
                  ? 'text-green-700'
                  : 'text-red-700',
              ]"
            >
              {{
                type === 'success'
                  ? 'Operación exitosa'
                  : 'Ocurrió un error'
              }}
            </p>

            <p class="mt-1 text-sm text-gray-600">
              {{ message }}
            </p>
          </div>

          <button
            type="button"
            class="text-gray-400 transition hover:text-gray-600"
            @click="cerrar"
          >
            <X :size="18" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import {
  Check,
  TriangleAlert,
  X,
} from 'lucide-vue-next'

const visible = ref(false)
const type = ref('error')
const message = ref('')

let timeout = null

const mostrar = (event) => {
  message.value = event.detail.message
  type.value = event.detail.type
  visible.value = true

  clearTimeout(timeout)

  timeout = setTimeout(() => {
    visible.value = false
  }, 4000)
}

const cerrar = () => {
  visible.value = false
}

onMounted(() => {
  window.addEventListener('notification', mostrar)
})

onBeforeUnmount(() => {
  window.removeEventListener('notification', mostrar)
  clearTimeout(timeout)
})
</script>