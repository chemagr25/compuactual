
<script setup lang="ts">
import { DocumentPlusIcon } from '@heroicons/vue/24/outline';
import ComboClient from '@/components/ComboClient.vue';
import ComboTech from '@/components/ComboTech.vue';
import { useService } from '@/composables/useService';
import Loader from '@/components/Loader.vue';


const { brand,
    model,
    serialNumber,
    processor,
    ram,
    storage,
    observations,
    description,
    price,
    createService, isLoading, hasError } = useService()

import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)

const closeModal = () => {
    isOpen.value = false
}
const openModal = () => {
    isOpen.value = true
}


const sendService = () => {
  
createService().then(()=> {
    if(!hasError.value) return closeModal()
})


}

</script>

<template>
    <div class=" flex items-center justify-center">
        <button type="button" @click="openModal" class=" btn border-none bg-accent/80 text-white ">
            <DocumentPlusIcon class="w-5"></DocumentPlusIcon>
            <p class="hidden md:block">Agregar servicio</p>
        </button>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-3xl  mt-14 transform  rounded-2xl bg-secondary   text-neutral border border-base-300 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6">
                                Crear servicio
                            </DialogTitle>
                            <div class=" gap-2 w-full mt-2 flex flex-wrap">
                                <div class=" flex justify-center w-full" v-if="isLoading">

                                        <Loader></Loader>
                                </div>

                                <div v-else class="grid grid-cols-4 lg:grid-cols-3 gap-2  m-auto">

                                    <div class="col-span-4 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">Marca</p>
                                        <input type="text" placeholder="Marca" v-model="brand"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>

                                    <div class="col-span-4 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">Modelo</p>
                                        <input type="text" placeholder="Modelo" v-model="model"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-4 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">Numero de serie</p>
                                        <input type="text" placeholder="Numero de serie" v-model="serialNumber"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-4 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">Procesador</p>
                                        <input type="text" placeholder="Procesador" v-model="processor"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">Almecenamiento</p>
                                        <input type="text" placeholder="Almacenamiento" v-model="storage"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">RAM</p>
                                        <input type="text" placeholder="RAM" v-model="ram"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">Observaciones</p>
                                        <textarea type="text" placeholder="Observaciones" v-model="observations"
                                            class="input border pt-2 border-base-300 h-16  resize-none focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-2">
                                        <p class="text-xs ml-1 font-medium">Descripción</p>
                                        <textarea type="text" placeholder="Descripción" v-model="description"
                                            class="input border pt-2 border-base-300 h-16 resize-none  focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">Precio</p>
                                        <input type="text" placeholder="precio" v-model="price"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">Cliente</p>
                                        <ComboClient></ComboClient>
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <p class="text-xs ml-1 font-medium">Técnico</p>
                                        <ComboTech></ComboTech>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full flex justify-end mt-5">
                                <button :disabled="isLoading" @click="sendService" class="btn text-white bg-accent/80 border-none">Crear</button>

                            </div>

                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template> 