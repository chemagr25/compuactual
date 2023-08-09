<script setup lang="ts">
import { apiResources } from '@/api/apiResources';
import type { Person } from '@/interfaces/service';
import { watch, ref } from 'vue';

const enterName = ref<string>('')
const matchTechs = ref<Person[]>([])
const isLoading = ref<boolean>(false)

import { useService } from '@/composables/useService';

const { idClient } = useService()

import LoaderButton from '@/components/LoaderButton.vue';

const selectClient = (id: number, name: string, lastName: string) => {
  enterName.value = name + ' ' + lastName
  idClient.value = id + '';
  matchTechs.value = []

}

watch(enterName, async(newValue) => {
  


  try {

    const {data} =  await apiResources.get<Person[]>(`/clients/search?query=${newValue}` ,
     {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token_auth')
      }
     }
    )

    console.log(newValue, 'jeje')

  }catch  {

  }



 

})

</script>

<template>
  <div class="flex flex-col ">
    <input type="text" v-model="enterName" placeholder="Cliente"
      class="input border border-base-300 focus:outline-none w-full bg-primary">
    <div v-if="matchTechs.length > 0" class=" border mt-1 rounded-lg py-3 px-2 bg-secondary ">
         
    </div>

  </div>
</template>


