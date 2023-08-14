<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useService } from '@/composables/useService'
import Loader from '@/components/Loader.vue'
import RatingComponent from '@/components/RatingComponent.vue'

import { capitalize, setColor } from '@/helpers/capitalizestr'

const { isLoading, getServiceById, service, editStatus } = useService()

const id = ref<string | string[]>(useRoute().params.id)

const status = [
  { name: 'recibido', desc: 'RECIBIDO' },
  { name: 'revision', desc: 'REVISION' },
  { name: 'autorizacion', desc: 'AUTORIZACION' },
  { name: 'proceso', desc: 'PROCESO' },
  { name: 'completado', desc: 'COMPLETADO' },
  { name: 'entregado', desc: 'ENTREGADO' },
  { name: 'cancelado', desc: 'CANCELADO' }
]

onMounted(() => {
  getServiceById(id.value)
})
</script>

<template>
  <div v-if="isLoading" class="w-full overflow-hidden flex justify-center">
    <Loader></Loader>
  </div>
  <div class="flex justify-center flex-col items-center" v-else>
    <div class="w-full lg:w-3/4 text-neutral rounded-xl bg-secondary shadow-lg p-5 border border-base-300">
      <div class="w-full h-full flex flex-col">
        <div class="tools w-full h-full flex justify-between items-center">
          <p class="flex flex-col font-bold text-3xl">
            {{ service?.invoice.split('-').join('') }}
            <span class="text-lg font-semibold">{{ service?.dateReceived }}</span>
          </p>
          <div class="dropdown dropdown-bottom dropdown-end">
            <label tabindex="0" class="cursor-pointer">
              <span :class="setColor(capitalize(service?.status))" class="px-3 py-1 text-lg font-semibold rounded-2xl">
                {{
                  service?.status.includes('ON')
                  ? capitalize(service?.status).replace('on', 'ón')
                  : capitalize(service?.status)
                }}
              </span>
            </label>
            <ul tabindex="0"
              class="dropdown-content absolute overflow-auto text-left justify-end flex-row text-neutral z-[1] menu m-0 p-0 flex pt-2 w-52">
              <div
                class="flex border overflow-auto rounded-lg px-3 border-base-300 bg-secondary py-2 w-fit justify-end gap-2 items-end flex-col">
                <p @click="editStatus(state.desc, service?.id)" v-for="state in status" :v-key="state.name"
                  :class="setColor(state.name)" class="px-3 cursor-pointer text-lg font-semibold rounded-2xl">
                  {{
                    state.name.includes('on')
                    ? capitalize(state.name).replace('on', 'ón')
                    : capitalize(state.name)
                  }}
                </p>
              </div>
            </ul>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-5 md:gap-0">
          <div class="flex justify-center flex-col col-span-3 md:col-span-1 items-center">
            <p class="font-bold text-xl">Cliente</p>
            <p class="mt-2">
              {{ capitalize(service?.client.name + ' ' + service?.client.lastName) }}
            </p>
          </div>
          <div class="flex justify-center flex-col col-span-3 md:col-span-1 items-center">
            <p class="font-bold text-xl">Dispositivo</p>
            <p class="mt-2">{{ service?.device.brand }} {{ service?.device.model }}</p>
          </div>
          <div class="flex justify-center flex-col col-span-3 md:col-span-1 items-center">
            <p class="font-bold text-xl">Técnico</p>
            <p class="mt-2">{{ service?.technician.name }} {{ service?.technician.lastName }}</p>
          </div>
        </div>
        <div
          class="w-full border rounded-lg border-base-300 p-4 bg-accent/20 flex flex-col gap-5 md:gap-0 md:grid grid-cols-2 mt-5">
          <div class="flex justify-center flex-col items-center">
            <p class="font-bold text-xl">Descripción</p>
            <p>{{ service?.description }}</p>
          </div>
          <div class="flex justify-center flex-col items-center">
            <p class="font-bold text-xl">Observaciones</p>
            {{ service?.observation }}
          </div>
        </div>
      </div>
      <div class="w-full h-full mt-11 flex flex-col">
        <div class="grid grid-cols-3">
          <div class="flex items-center">Partes ></div>
          <div class="flex justify-center flex-col items-center">
            <!-- Open the modal using ID.showModal() method -->
            <button class="btn btn-accent text-white" onclick="my_modal_2.showModal()">Ver mensajes</button>
            <dialog id="my_modal_2" class="modal">
              <form method="dialog" class="modal-box bg-secondary border border-base-300 overflow-auto max-h-80">
                <div v-for="comment in service?.comments" :key="comment.id" class="chat chat-start">
                  <div class="chat-header">
                    {{comment.user.name}}
                    <time class="text-xs opacity-50">2 hours ago</time>
                  </div>
                  <div class="chat-bubble bg-primary text-neutral mt-1">{{comment.comment}}</div>
                </div>
             
            
            
           
           
             
                <div  class="w-full mt-3 ">
                  <form>
                    <label for="chat" class="sr-only">Your message</label>
                    <div class="flex bg-primary items-center px-3 py-2 rounded-lg ">
                      <button type="button"
                        class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 20 18">
                          <path fill="currentColor"
                            d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                        </svg>
                        <span class="sr-only">Upload image</span>
                      </button>
                    
                      <textarea id="chat" rows="1"
                        class="block mx-4 p-2.5 w-full text-base bg-primary text-neutral placeholder:text-neutral focus:outline-none border-base-300 border rounded-lg resize-none"
                        placeholder="Escribe tu mensaje"></textarea>
                      <button type="submit"
                        class="inline-flex justify-center p-2 text-accent rounded-full cursor-pointer hover:bg-blue-100">
                        <svg class="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor" viewBox="0 0 18 20">
                          <path
                            d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        <span class="sr-only">Send message</span>
                      </button>
                    </div>
                  </form>


                </div>
              </form>

              <form method="dialog" class="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
        </div>
        <div class="flex justify-end items-end">
          <RatingComponent></RatingComponent>
        </div>
      </div>
    </div>
  </div>
  <div class="h-40"></div>
</div></template>

<style scoped></style>
