<script setup lang="ts">
import { apiResources } from '@/api/apiResources'
import type { Person } from '@/interfaces/service'
import { watch, ref } from 'vue'

const enterName = ref<string>('')
const matchTechs = ref<Person[]>([])
const isLoading = ref<boolean>(false)

import { useService } from '@/composables/useService'

const { idClient } = useService()

import LoaderButton from '@/components/LoaderButton.vue'

const selectClient = (id: number, name: string, lastName: string) => {
  enterName.value = name + ' ' + lastName
  idClient.value = id + ''
  matchTechs.value = []
}

watch(enterName, async (newValue) => {
  if (newValue.length <= 3) return (matchTechs.value = [])

  try {
    const { data } = await apiResources.get<Person[]>(`/clients/autocomplete?query=${newValue}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token_auth')
      }
    })

    matchTechs.value = data
    console.log(matchTechs.value)
  } catch {}
})
</script>

<template>
  <div class="flex bg-primary flex-col">
    <input
      type="text"
      v-model="enterName"
      placeholder="Cliente"
      class="input border border-base-300 focus:outline-none w-full bg-primary"
    />
    <div
      v-if="matchTechs.length > 0 || isLoading"
      class="mt-1 p-1 max-h-20 w-full ml-1 overflow-auto rounded-md bg-primary py-1 text-base shadow-lg focus:outline-none sm:text-sm border border-base-300"
    >
      <p
        v-if="!isLoading"
        v-for="client in matchTechs"
        @click="selectClient(client.id, client.name, client.lastName)"
        class="pl-2 py-2 hover:bg-accent rounded-md divide-accent cursor-pointer divide-y-2"
      >
        {{ client.name }} {{ client.lastName }}
      </p>
      <p v-else class="flex justify-center">
        <LoaderButton></LoaderButton>
      </p>
    </div>
  </div>
</template>
