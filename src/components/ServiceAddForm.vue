
<script setup lang="ts">
import { DocumentPlusIcon } from '@heroicons/vue/24/outline';
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
                            class="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-secondary  text-neutral border border-base-300 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6">
                                Crear servicio
                            </DialogTitle>
                            <div class=" gap-2 w-full mt-2 flex flex-wrap">
                                <div class="grid grid-cols-4 lg:grid-cols-3 gap-2  m-auto">
                                    <div class="col-span-2 lg:col-span-1">
                                        <input type="text" placeholder="Marca"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>

                                    <div class="col-span-2 lg:col-span-1">
                                        <input type="text" placeholder="Marca"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <input type="text" placeholder="Marca"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <input type="text" placeholder="Marca"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <input type="text" placeholder="Marca"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <input type="text" placeholder="Marca"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <input type="text" placeholder="Marca"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                    <div class="col-span-2 lg:col-span-1">
                                        <input type="text" placeholder="Marca"
                                            class="input border border-base-300 focus:outline-none w-full bg-primary" />
                                    </div>
                                </div>
                            </div>
                            <div class="w-full flex justify-end mt-5">
                                <button class="btn text-white bg-accent/80 border-none">Crear</button>

                            </div>

                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template> 