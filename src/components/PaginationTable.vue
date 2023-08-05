<script setup lang="ts">

const props = defineProps<{
    totalPages: number,
    currentPage: number

}>()

</script>

<template>
    <div>
        <div class="join">
            <button v-for="(_, i) in props.totalPages" :class="[currentPage === i + 1 ? 'bg-accent' : 'btn-active']"
                class="join-item text-white  border-none btn" @click="$emit('getPage', i + 1)"> {{ i + 1 }}</button>

        </div>
    </div>
</template>



<style scoped></style>