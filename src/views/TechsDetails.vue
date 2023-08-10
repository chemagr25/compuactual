<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useTech } from '@/composables/useTech'
import Loader from '@/components/Loader.vue'

const { getTechById, techById, isLoading } = useTech()

const id = ref<string | string[]>(useRoute().params.id)

onMounted(() => {
  getTechById(id.value)
})
</script>
<template>
  <div v-if="isLoading" class="w-full overflow-hidden flex justify-center">
    <Loader></Loader>
  </div>
  <div v-else>
    <p class="text-neutral">{{ techById }}</p>
  </div>
</template>

<style scoped></style>
