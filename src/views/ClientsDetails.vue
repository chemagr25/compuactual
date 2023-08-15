<script setup lang="ts">
import CardDetails from '@/components/CardDetails.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useClient } from '@/composables/useClient'
import Loader from '@/components/Loader.vue'
const { getClientById, clientById, isLoading } = useClient()

const id = ref<string | string[]>(useRoute().params.id)

onMounted(() => {
  getClientById(id.value)
})
</script>

<template>
  <div v-if="isLoading" class="w-full overflow-hidden flex justify-center">
    <Loader></Loader>
  </div>
  <div v-else class="w-full flex text-neutral justify-center">

    <div class="border w-3/4  border-base-300 grid grid-cols-3 bg-secondary p-2 rounded-lg">
      <div class="col-span-3 lg:col-span-1"></div>
      <div class="col-span-3 flex flex-col items-center lg:col-span-1">
        <p class="text-2xl font-bold mb-2">Contacto</p>
        <p class="my-1 text-lg font-semibold ">{{ clientById?.name }} {{ clientById?.lastName }}</p>
        <p class="my-1 text-lg font-semibold underline">{{ clientById?.phone }}</p>
        <p class="my-1 text-lg font-semibold ">{{ clientById?.email }}</p>

      </div>
      <div class="col-span-3 flex flex-col items-center lg:col-span-1">
        <p class="text-2xl font-bold my-2">Servicios</p>
          <router-link  :to="{name: 'services-details', params: {id: service.id}}" v-for="service in clientById?.services" class="font-bold m-1">
            <p >{{ service.invoice.split('-').join('') }}</p>
          </router-link>




      </div>


    </div>

  </div>
</template>

<style scoped></style>
