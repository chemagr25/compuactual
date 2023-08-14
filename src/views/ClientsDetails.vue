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
  <div>
    <p class="text-neutral">{{ clientById }}</p>
  </div>
</template>

<style scoped></style>
