<script setup lang="ts">
import type { SideBarItem } from '@/interfaces/sidebar-item'

const props = defineProps<{
  items: SideBarItem[]
}>()
</script>

<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-16 bg-secondary border-t border-base-300 rounded-e-lg rounded-s-lg"
  >
    <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
      <div v-for="item in props.items" :key="item.name" class="flex justify-center items-center">
        <router-link
          class="flex p-2 text-gray-500 justify-center items-center rounded-full flex-col"
          :to="{ name: item.name }"
        >
          <component class="w-5" :is="item.icon.name"></component>
          <p>{{ item.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: hsl(var(--a) / 80%);
}
</style>
