<script setup lang="ts">

import CardDetails from '@/components/CardDetails.vue';
import { useRoute } from 'vue-router';
import {onMounted} from 'vue'

console.log(useRoute().params.id)

</script>

<template>
    <div>
        <p>hola</p>
    </div>
</template>



<style scoped>

</style>