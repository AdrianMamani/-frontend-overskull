<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-[#242323] text-white">
    <div class="flex h-16 items-center justify-center border-b border-[#707070]">
      <img
      src="/logo.png"
        alt="Logo"
        class="h-8 w-auto object-contain"
        />
    </div>

    <nav class="p-4 space-y-2">

      <RouterLink
        to="/"
        class="flex items-center rounded-lg px-4 py-3 transition hover:bg-[#707070]"
        :class="{ 'bg-red-600': route.path === '/' }"
      >
        Inicio
      </RouterLink>

      <RouterLink
        to="/categorias"
        class="flex items-center rounded-lg px-4 py-3 transition hover:bg-[#707070]"
        :class="{ 'bg-red-600': route.path.startsWith('/categorias') }"
      >
        Categorías
      </RouterLink>

      <RouterLink
        to="/productos"
        class="flex items-center rounded-lg px-4 py-3 transition hover:bg-[#707070]"
        :class="{ 'bg-red-600': route.path.startsWith('/productos') }"
      >
        Productos
      </RouterLink>

    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>