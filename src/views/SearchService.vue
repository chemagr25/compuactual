<template>
    <div class="w-full flex flex-col items-center justify-center ">
        <div class="w-full flex-col mt-16 flex items-center justify-center">

            <input type="text" v-model="folio" placeholder="Introduce el folio de servicio"
                class="input bg-secondary text-neutral font-semibold w-72">
                <button @click="getService" class="btn mt-3"> Buscar</button>
        </div>



        
        <div v-if="service" class="border border-base-300 flex flex-col p-4 bg-secondary rounded-xl text-neutral mt-6 w-3/4 lg:w-1/4">
            <div class="flex  justify-between ">  
                <p class="text-">{{ service.invoice }}</p>
                <span class="rounded-xl px-1.5" :class="setColor(service.status.toLowerCase())">{{ service.status }}</span>
            </div>
            <div class="flex  mt-3 justify-between ">  
                <p class="text-xl">{{service.client.name}} {{service.client.lastName}}</p>
                <p class="text-xl">{{ service.device.model }} {{service.device.brand}}</p>
    
            </div>
            <div class="flex  mt-3 justify-center ">  
                <p class="text-lg font-bold">{{ service.dateReceived }}</p>
       
    
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { apiResources } from '@/api/apiResources';
import { capitalize, setColor } from '@/helpers/capitalizestr';
import { ref } from 'vue'



const folio = ref<string>()
const service = ref()



const getService = async () => {

    try {
        const { data } = await apiResources.get(`/services/search?invoice=${folio.value}`)
        service.value = data

    } catch (e) {
        console.log(e)
    }



}



</script>

<style scoped></style>n