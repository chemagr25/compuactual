<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useService } from '@/composables/useService'
import Loader from '@/components/Loader.vue'

const { isLoading, getServiceById, serviceById } = useService()

const id = ref<string | string[]>(useRoute().params.id)

onMounted(() => {
  getServiceById(id.value)
})
</script>

<template>
  <div v-if="isLoading" class="w-full overflow-hidden flex justify-center">
    <Loader></Loader>
  </div>
  <div v-else>
    <p class="text-neutral">{{ serviceById }}</p>
  </div>
</template>

<style scoped></style>
