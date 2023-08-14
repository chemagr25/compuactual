<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useService } from '@/composables/useService'
import Loader from '@/components/Loader.vue'
import RatingComponent from '@/components/RatingComponent.vue'

import { capitalize, setColor } from '@/helpers/capitalizestr';

const { isLoading, getServiceById, service, editStatus } = useService()

const id = ref<string | string[]>(useRoute().params.id)

const status = [
  { name: 'recibido', desc: 'RECIBIDO' },
  { name: 'revision', desc: 'REVISION' },
  { name: 'autorizacion', desc: 'AUTORIZACION' },
  { name: 'proceso', desc: 'PROCESO' },
  { name: 'completado', desc: 'COMPLETADO' },
  { name: 'entregado', desc: 'ENTREGADO' },
  { name: 'cancelado', desc: 'CANCELADO' },
]

onMounted(() => {
  getServiceById(id.value)

})



</script>

<template>
  <div v-if="isLoading" class="w-full  overflow-hidden flex justify-center">
    <Loader></Loader>
  </div>
  <div class="flex  justify-center flex-col items-center" v-else>
    <div class="w-full  lg:w-3/4  text-neutral rounded-xl bg-secondary shadow-lg p-5 border border-base-300 ">
      <div class="w-full h-full flex flex-col  ">
        <div class="tools w-full h-full  flex justify-between items-center">
          <p class="flex flex-col font-bold text-3xl">{{ service?.invoice.split('-').join('') }} <span
              class="text-lg font-semibold">{{ service?.dateReceived }}</span> </p>
          <div class="dropdown dropdown-bottom dropdown-end">
            <label tabindex="0" class="cursor-pointer"> <span :class="setColor(capitalize(service?.status))"
                class="px-3 py-1  text-lg font-semibold rounded-2xl">
                {{ service?.status.includes('ON')
                  ? capitalize(service?.status).replace('on', 'ón')
                  : capitalize(service?.status) }} 
              </span>
            </label>
            <ul tabindex="0"
              class="dropdown-content absolute overflow-auto  text-left justify-end flex-row  text-neutral z-[1] menu m-0 p-0 flex   pt-2 w-52">
              <div
                class="flex border  overflow-auto   rounded-lg px-3 border-base-300 bg-secondary  py-2 w-fit justify-end  gap-2 items-end flex-col">
                <p @click="editStatus(state.desc, service?.id )" v-for="state in status" :v-key="state.name" :class="setColor(state.name)"
                  class="px-3 cursor-pointer text-lg font-semibold rounded-2xl">
                  {{ state.name.includes('on')
                    ? capitalize(state.name).replace('on', 'ón')
                    : capitalize(state.name) }}
                </p>
              </div>

            </ul>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-5 md:gap-0  ">
          <div class="flex justify-center flex-col col-span-3 sm:col-span-1  items-center">
            <p class="font-bold text-xl">Cliente</p>
            <p class="mt-2">{{ capitalize(service?.client.name + ' ' + service?.client.lastName) }}</p>
          </div>
          <div class="flex justify-center flex-col col-span-3 md:col-span-1   items-center">
            <p class="font-bold text-xl">Dispositivo</p>
            <p class="mt-2">{{ service?.device.brand }} {{ service?.device.model }}</p>
          </div>
          <div class="flex justify-center flex-col col-span-3 md:col-span-1 items-center">
            <p class="font-bold text-xl">Técnico</p>
            <p class="mt-2">{{ service?.technician.name }} {{ service?.technician.lastName }}</p>
          </div>
        </div>
        <div class="w-full border rounded-lg border-base-300 p-4 bg-accent/20 flex flex-col gap-5 md:gap-0 md:grid grid-cols-2 mt-5">
          <div class="flex justify-center flex-col items-center">
              <p class="font-bold text-xl">Descripción</p>
              <p> {{ service?.description }}</p>
          </div>
          <div class="flex justify-center flex-col items-center">
              <p class="font-bold text-xl">Observaciones</p>
              {{ service?.observation }}
           
          </div>
        </div>
      </div>
      <div class="w-full h-full mt-11 flex flex-col">
        <div class="grid grid-cols-3  ">
          <div class="flex items-center">Partes ></div>
          <div class="flex justify-center flex-col items-center"><button class="btn">Ver comentarios</button></div>
          <div class="flex justify-end items-end">
            <RatingComponent></RatingComponent>
          </div>

        </div>
      </div>
    </div>
    <div class="h-52">

    </div>
  </div>
</template>

<style scoped></style>
