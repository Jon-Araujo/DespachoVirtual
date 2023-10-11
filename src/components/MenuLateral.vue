<template>
    <button @click="menu"><span class="material-symbols-outlined">menu</span></button>
    <div v-if="menuAtivo === true">
        <router-link class="nav" to="/painelMissoes">Painel de Missões</router-link>
        <router-link class="nav" to="/enviaMissao">Enviar Missão</router-link>
        <router-link class="nav" to="/historico">Históricos das Missões</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MenuLateral',
    data() {
        return {
            menuAtivo: false
        }
    },
    methods: {
        menu() {
            this.menuAtivo = !this.menuAtivo;
        }
    }
})
</script>

<style lang="scss" scoped>
@import '../style/variaveis.scss';

button {
    background-color: $cor-quaternaria;
    border-radius: 20%;
    color: $cor-primaria;
    padding: 0.5rem;
    cursor: pointer;
}
div {
    z-index: 1;
    width: 20%;
    position: absolute;
    top: 4.5rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    .nav {
        text-decoration: none;
        color: $cor-quaternaria;
        background-color: $cor-primaria;
        padding: 1rem;
        opacity: 0.8;
        transition: 0.5s;
        &:hover {
            opacity: 1;
            transition: 0.5s;
        }
    }
}
</style>