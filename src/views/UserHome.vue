<script setup lang="ts">
import router from '@/router'

import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, DocumentMagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import ChangeTheme from '@/components/ChangeTheme.vue'
import { useClient } from '@/composables/useClient'
import { useService } from '@/composables/useService'
import { setColor, capitalize } from '@/helpers/capitalizestr'
const { getServiceById, service } = useService()


const { getClientById, clientById } = useClient()

const services = ref<any>([])

const mobileMenuOpen = ref<boolean>(false)
const logout = () => {
    localStorage.removeItem('token_auth')
    localStorage.removeItem('role')
    localStorage.removeItem('uid')

    router.push({ name: 'login' })
}

onMounted(async () => {
    await getClientById('3')
    clientById.value?.services.map(async (e) => {
        await getServiceById(e.id)
        services.value.push(service.value)
    })

})







</script>

<template>
    <header class="bg-secondary border-y border-base-300 shadow-lg">
        <nav class="mx-auto h-12 py-10 flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div class="flex lg:flex-1">
                <img @click="logout" class="h-12 rounded-xl w-auto" src="@/assets/img/logo.png" alt="" />
            </div>
            <div class="flex lg:hidden">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = !mobileMenuOpen">
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <div class="p-3 items-center text-neutral flex gap-3 rounded-lg hover:bg-primary cursor-pointer">
                    <DocumentMagnifyingGlassIcon class="w-7"></DocumentMagnifyingGlassIcon>
                    <p class="font-bold">Buscar servicio</p>
                </div>
            </div>
            <div class="hidden lg:flex text-neutral lg:flex-1 lg:justify-end">
                <ChangeTheme></ChangeTheme>
            </div>
        </nav>
        <Dialog as="div" class="lg:hidden bg-primary" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <DialogPanel
                class="fixed bg-secondary text-neutral inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <a href="#" class="-m-1.5 p-1.5">
                        <img class="pointer h-8 w-auto" src="@/assets/img/logo.png" alt="" />
                    </a>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 mt-4 py-6">
                            <div
                                class="p-3 border items-center text-neutral flex gap-3 border-base-300/50 rounded-lg hover:bg-primary cursor-pointer">
                                <DocumentMagnifyingGlassIcon class="w-7"></DocumentMagnifyingGlassIcon>
                                <p class="font-bold">Buscar servicio</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>

    <div class=" mt-12 pl-8 w-full h-full">
        <p class="text-neutral text-2xl mb-5 font-bold"> Bienvenido {{ clientById?.name }}</p>
        <div class="  flex  gap-5   ">
            <div class="text-neutral py-2 px-4 min-w-[18rem] rounded-lg flex flex-col shadow-lg bg-secondary "
                v-for="item in services">
                <div class="flex justify-between ">
                    <p>{{ item.dateReceived }}</p>
                    <span class="rounded-xl  px-1.5" :class="setColor(item.status.toLowerCase())">{{
                        capitalize(item?.status)
                    }}</span>

                </div>
                <div class="flex mt-3 justify-between">
                    <router-link class="font-bold" :to="{name:'services-details', params: {id: item.id}}">{{ item.invoice.split('-').join('') }}</router-link>

                  
                    <p>{{ item.device.brand }} {{ item.device.model }}</p>
                </div>
                <div class="flex justify-between mt-3">
                    <p>Técnico: </p>
                    <p class="font-bold">{{ item.technician.name }} {{ item.technician.lastName }}</p>
                </div>


                <!-- <div class="flex  gap-8">
                    <p class="text-neutral"> {{ service?.dateReceived }} </p>
                    <span class="rounded-xl  px-1.5" :class="setColor(item.status.toLowerCase())">{{ capitalize(item?.status)
                    }}</span>
                </div>
                <p>{{ item?.invoice.split('-').join('') }}</p>
                <p>{{ item.device.brand }} {{ item.device.model }}</p> -->


            </div>

        </div>

    </div>
</template>
