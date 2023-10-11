<template>
    <nav>
        <h1>Recupera senha aqui</h1>
        <BotaoLogout />
    </nav>
    <div v-if="contador == true">
        <h3>A senha do(a) senhor(a) é:<p>{{ senha }}</p></h3>
    </div>
    <section>
        <label for="email"><span class="material-symbols-outlined">mail</span>Informe seu email cadastrado:</label>
        <input type="email" id="email" v-model="email">

        <label><span class="material-symbols-outlined">military_tech</span>Selecione seu Posto | Graduação:</label>
        <select id="select-pg" v-model="patente">
            <option>Coronel</option>
            <option>Ten-Coronel</option>
            <option>Major</option>
            <option>Capitão</option>
            <option>1º Tenente</option>
            <option>2º Tenente</option>
            <option>Aspirante a Oficial</option>
            <option>1º Sargento</option>
            <option>2º Sargento</option>
            <option>3º Sargento</option>
        </select>

        <label for="nome"><span class="material-symbols-outlined">person</span>Informe seu nome:</label>
        <input type="text" id="nome" placeholder="Insira seu nome" v-model="nome">

        <label for="palavraChave"><span class="material-symbols-outlined">person_raised_hand</span>Informe sua resposta:</label>
        <input type="text" id="palavraChave" placeholder="xxxxxxx" v-model="resposta">

        <button @click="alteraSenha">Recuperar a senha</button>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BotaoLogout from '@/components/BotaoLogout.vue';

export default defineComponent({
    name: "recuperaSenha",
    components: {
        BotaoLogout
    },
    data() {
        return {
            email: "",
            patente: "",
            nome: "",
            resposta: "",
            listaUsuarios: [] as any[],
            contador: false,
            senha: ""
        }
    },
    emits: ['mostrarSenha'],
    methods: {
        async recuperaUsuarios() {
            const lista = await (await fetch("http://localhost:3000/usuarios", {method: "GET"})).json();
            this.listaUsuarios = lista;
            return this.listaUsuarios;
        },
        alteraSenha() {
            for (let i = 0; i < this.listaUsuarios.length; i++) {
                if(this.nome.toLowerCase() === this.listaUsuarios[i].nome) {
                    if(this.email === this.listaUsuarios[i].email && this.patente === this.listaUsuarios[i].patente && this.resposta === this.listaUsuarios[i].resposta) {
                        this.senha = this.listaUsuarios[i].senha; 
                        this.$emit('mostrarSenha', this.senha);
                        this.contador = !this.contador;
                    } else {
                        alert("As informações fornecidas não estão corretas.");
                    } 
                }
            } 
        }
    },
    created() {
        this.recuperaUsuarios();
    }
})
</script>

<style lang="scss" scoped>
@import '../style/variaveis.scss';

nav {
    background-color: $cor-primaria;

    h1 {
        margin: 0;
        text-align: center;
        width: 100%;
        height: 2.5rem;
        padding: 1rem;
        color: $cor-quaternaria;
    }

    .btn-logout {
        position: absolute;
        top: 0.8rem;
        right: 1.5rem;
    }
}

div {
    position: relative;
    width: calc(30% + 0.5rem);
    left: 35%;
    padding: 0 1rem;
    border: 5px dashed red;
    background-color: $cor-secundaria;
    color: #FFFFFF;
    text-align: center;
    h3 {
        margin: 1rem 0 0 0;
        p {
            background-color: #FFFFFF;
            width: auto;
            color: red;
            border-radius: 8px;
            margin: 0.5rem 0 1rem 0;
        }
    }
}
section {
    border-radius: 8px;
    border: 2px solid $cor-quaternaria;
    box-shadow: inset 0px 0px 20px 5px $cor-quaternaria;
    background-color: $cor-secundaria;
    opacity: 0.8;
    width: 30%;
    padding: 1.5rem;
    position: absolute;
    height: 56%;
    left: 35%;
    top: 22%;

    label {
        font-size: 1rem;
        font-weight: 500;
        margin: 0.5rem 0;
        color: white;
        display: flex;
        align-items: center;
        span {
            margin-right: 0.5rem;
        }
    }

    select,
    input {
        padding: 0.2rem;
        font-weight: 100;
        font-style: italic;
        border-radius: 8px;
        width: 98%;
        margin-bottom: 1.2rem;
    }

    select {
        width: 100%;
    }

    button {
        width: 60%;
        padding: 0.5rem;
        border: none;
        border-radius: 20px;
        margin-left: 20%;
        margin-top: 1.2rem;
        background-color: $cor-quaternaria;
        color: $cor-primaria;
        font-size: 1.1rem;
        transition: all 0.5s;
        cursor: pointer;

        &:hover {
            transform: scale(1.2);
            background-color: $cor-terciaria;
            color: $cor-quaternaria;
            font-weight: 900;
            transition: all 0.5s;
        }
    }
}
</style>