<script setup lang="ts">
import router from '@/router'

import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref<boolean>(false)

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('id')

  router.push({ name: 'auth' })
}
</script>

<template>
  <header class="bg-secondary border-y border-base-300 shadow-lg">
    <nav class="mx-auto h-12 py-10 flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <div class="flex lg:flex-1">
        <img @click="logout" class="h-12 rounded-xl w-auto" src="@/assets/img/logo.png" alt="" />
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <XMarkIcon class="w-5 text-neutral"></XMarkIcon>
      </div>
      <div class="hidden lg:flex text-neutral lg:flex-1 lg:justify-end">
        <p class="text-neutral">Changetheme</p>
      </div>
    </nav>
    <Dialog
      as="div"
      class="lg:hidden bg-primary"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed bg-secondary text-neutral inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <img
              class="pointer h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <p>Hola</p>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
