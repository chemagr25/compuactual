<script setup lang="ts">
import { apiResources } from '@/api/apiResources'
import type { Person } from '@/interfaces/service'
import { watch, ref } from 'vue'
const enterName = ref<string>('')
const matchClients = ref<Person[]>([])
const isLoading = ref<boolean>(false)

import { useService } from '@/composables/useService'

const { idTechnician } = useService()

import LoaderButton from '@/components/LoaderButton.vue'

const selectClient = (id: number, name: string, lastName: string) => {
  enterName.value = name + ' ' + lastName
  idTechnician.value = id + ''
  matchClients.value = []
}

watch(enterName, async (newValue) => {
  if (newValue.length <= 2) return (matchClients.value = [])

  isLoading.value = true
  try {
    if (newValue.length <= 2) return
    const { data } = await apiResources.get<Person[]>(`/technicians/search?query=${newValue}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token_auth')
      }
    })

    matchClients.value = data
    isLoading.value = false
  } catch {
    isLoading.value = false
  }
})
</script>

<template>
  <input
    type="text"
    v-model="enterName"
    placeholder="Técnico"
    class="input border border-base-300 focus:outline-none w-full bg-primary"
  />

  <div
    v-if="matchClients.length > 0 || isLoading"
    class="absolute mt-1 p-1 max-h-20 w-40 lg:w-56 md:w-52 ml-1 overflow-auto rounded-md bg-primary py-1 text-base shadow-lg focus:outline-none sm:text-sm border border-base-300"
  >
    <p
      v-if="!isLoading"
      v-for="client in matchClients"
      @click="selectClient(client.id, client.name, client.lastName)"
      class="pl-2 py-2 hover:bg-accent rounded-md divide-accent cursor-pointer divide-y-2 hover:text-black"
    >
      {{ client.name }} {{ client.lastName }}
    </p>
    <p v-else class="flex justify-center">
      <LoaderButton></LoaderButton>
    </p>
  </div>
</template>
