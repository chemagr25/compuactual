<script setup lang="ts">
import type { SideBarItem } from '@/interfaces/sidebar-item'
import { ref } from 'vue'

const isTech = ref(localStorage.getItem('role') == 'ROLE_TECHNICIAN')
const isUser = ref(localStorage.getItem('role') == 'ROLE_USER')

const props = defineProps<{
  items: SideBarItem[]
}>()
</script>

<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-16 bg-secondary border-t border-base-300 rounded-e-lg rounded-s-lg"
  >
    <div class="flex justify-around h-full max-w-lg mx-auto font-medium">
      <div v-for="item in props.items" :key="item.name" class="">
        <div v-if="!isUser" class="">
          <router-link
            v-if="!isTech"
            class="flex p-2 text-gray-500 justify-center items-center rounded-full flex-col"
            :to="{ name: item.name }"
          >
            <component class="w-6" :is="item.icon.name"></component>
            <p>{{ item.title }}</p>
          </router-link>
          <router-link
            v-else
            v-if="item.visible.tech"
            class="flex p-2 text-gray-500 justify-center items-center rounded-full flex-col"
            :to="{ name: item.name }"
          >
            <component class="w-6" :is="item.icon.name"></component>
            <p>{{ item.title }}</p>
          </router-link>
        </div>
        <div  class="w-full "  v-else>
          <router-link
            v-show="item.visible.client"
            class="flex p-2 text-gray-500 col-span-3 justify-center items-center rounded-full flex-col"
            :to="{ name: item.name }"
          >
            <component class="w-6" :is="item.icon.name"></component>
            <p>{{ item.title }}</p>
          </router-link>


        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: hsl(var(--a) / 80%);
}
</style>
