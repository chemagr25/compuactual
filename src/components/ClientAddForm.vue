<script setup lang="ts">
import { UserPlusIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useClient } from '@/composables/useClient'
import Loader from '@/components/Loader.vue'

const { username, email, name, lastName, phone, isLoading, createClient, hasError } = useClient()

import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const isOpen = ref(false)

const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
}

const sendClient = () => {
  createClient().then(() => {
    if (!hasError.value) return closeModal()
  })
}
</script>

<template>
  <div class="flex items-center justify-center">
    <button type="button" @click="openModal" class="btn border-none bg-accent/80 text-white">
      <UserPlusIcon class="w-5" />
      <p class="hidden md:block">Agregar cliente</p>
    </button>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-secondary text-neutral border border-base-300 p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6">
                Agregar cliente
              </DialogTitle>
              <div class="gap-2 w-full mt-2 flex flex-wrap">
                <div class="w-full flex justify-center" v-if="isLoading">
                  <Loader></Loader>
                </div>

                <div v-else class="grid grid-cols-4 lg:grid-cols-3 gap-2 m-auto">
                  <div class="col-span-4 lg:col-span-1">
                    <input
                      type="text"
                      placeholder="Nombre"
                      v-model="name"
                      class="input border border-base-300 focus:outline-none w-full bg-primary"
                    />
                  </div>
                  <div class="col-span-4 lg:col-span-1">
                    <input
                      type="text"
                      placeholder="Apellidos"
                      v-model="lastName"
                      class="input border border-base-300 focus:outline-none w-full bg-primary"
                    />
                  </div>
                  <div class="col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      placeholder="Usuario"
                      v-model="username"
                      class="input border border-base-300 focus:outline-none w-full bg-primary"
                    />
                  </div>
                  <div class="col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      placeholder="Teléfono"
                      v-model="phone"
                      class="input border border-base-300 focus:outline-none w-full bg-primary"
                    />
                  </div>
                  <div class="col-span-4 lg:col-span-1">
                    <input
                      type="text"
                      placeholder="Correo"
                      v-model="email"
                      class="input border border-base-300 focus:outline-none w-full bg-primary"
                    />
                  </div>
                </div>
              </div>
              <div class="w-full flex justify-end mt-5">
                <button
                  :disabled="isLoading"
                  @click="sendClient"
                  class="btn text-white bg-accent/80 border-none"
                >
                  Crear
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
