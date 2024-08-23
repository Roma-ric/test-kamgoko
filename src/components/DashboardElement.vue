<template>
    <div type="button" class="card d-flex flex-column px-4 bg-light justify-content-center align-items-center mb-2" style="height: 120px;">
        <h6 class="my-0 fw-bold text-primary mb-1"> {{ libelle }} </h6>
        <h6 class="my-0 fw-bold fs-1 text-dark String"> {{ nombre }} </h6>        
    </div>
</template>

<script setup lang="ts">

import { defineProps } from 'vue';

defineProps({
    target: String,
    nombre: String,
    libelle: String
})

</script>

<style scoped>
* {
    color: #00247E;
}
</style>