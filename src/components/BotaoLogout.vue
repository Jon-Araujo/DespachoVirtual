<template>
    <router-link @click="apagaNome" class="btn-logout" to="/"><span class="material-symbols-outlined">logout</span></router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BotaoLogout',
    methods: {
        apagaNome() {
            sessionStorage.clear();
        }
    }
})
</script>

<style lang="scss" scoped>
@import '../style/variaveis.scss';
    .btn-logout {
        padding: 0.6rem;
        background-color: $cor-quaternaria;
        border-radius: 20%;
        color: $cor-primaria;
    }
</style>