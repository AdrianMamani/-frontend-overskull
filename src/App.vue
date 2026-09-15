<template>
  <div class="min-h-screen bg-gray-100">
    <Sidebar />

    <div class="ml-64">
      <Header />

      <main class="p-6">
        <router-view />
      </main>
    </div>

    <Notification />
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/sidebar.vue'
import Header from '@/components/layout/Header.vue'
import Notification from '@/components/ui/Notification.vue'
</script>