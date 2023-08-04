
<script setup lang="ts">
import { onMounted } from 'vue';
import { useService } from '@/composables/useService';
import { EyeIcon } from '@heroicons/vue/24/outline';
import Loader from '@/components/Loader.vue'

import { capitalize, setColor } from '@/helpers/capitalizestr'
const { getAllServices, services, isLoading } = useService()

import ServiceAddForm from '@/components/ServiceAddForm.vue';


onMounted(async () => {
    await getAllServices()
})
</script>

<template>
    <div v-if="isLoading" class="w-full h-full overflow-hidden flex mt-5 justify-center">
        <Loader />
    </div>

    <div v-else>
        <div class="w-full flex justify-between items-center mb-3 rounded-sm  ">
            <ServiceAddForm />
            <div class="w-3/4 lg:w-1/4">
                <input type="text" placeholder="Buscar servicio "
                    class="input bg-secondary focus:outline-none border border-base-300 text-neutral   input-bordered w-full " />
            </div>
        </div>
        <div class="bg-secondary rounded-lg border shadow-lg border-base-300 text-neutral">
            <div class="overflow-x-auto">
                <table class="table">
                    <thead class="text-neutral text-sm ">
                        <tr class="">
                            <th>Folio</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Dispositivo</th>
                            <th>Estado</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="service of services">
                            <th>{{ service.invoice.split('-').join('') }}</th>
                            <td>{{ service.dateReceived }} </td>
                            <td>{{ service.idClient }} Cliente </td>
                            <td>{{ service.idDevice }} Dispositivo </td>
                            <td>
                                <span :class="setColor(capitalize(service.status))" class="px-1.5 py-1 rounded-xl">{{
                                    capitalize(service.status) }}
                                </span>
                            </td>
                            <td>
                                <div class="w-full flex justify-center ">
                                    <div class="rounded-xl hover:bg-gray-500/50 flex gap-2 px-2 py-1.5 ">
                                        <EyeIcon class="w-4"></EyeIcon>
                                        <p class="hidden lg:block">Ver detalles</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<style scoped></style>