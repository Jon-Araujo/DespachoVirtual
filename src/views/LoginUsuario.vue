<template>
    <h1>Despacho Virtual</h1>
    <section>
        <form>
            <label for="usuario"><span class="material-symbols-outlined">person</span>Usuário:</label>
            <input type="text" id="usuario" v-model="usuario">
            <label for="senha"><span class="material-symbols-outlined">password</span>Senha:</label>
            <input type="password" id="senha" v-model="senha">
            <input id="valida" type="submit" value="Entrar" @click="validaLogin">
        </form>
        <div>
            <router-link class="btn-rotas" to="/recuperaSenha">Esqueci minha senha</router-link>
            <router-link class="btn-rotas" to="/cadastro">Cadastrar</router-link>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "LoginUsuario",
    data() {
        return {
            usuario: "",
            senha: "",
            listaUsuarios: [] as any[]
        }
    },
    methods: {
        async recuperaUsuarios() {
            var listaUsuarios = await (await fetch("http://10.1.196.90:3000/users", {method: 'GET'})).json();
            this.listaUsuarios = listaUsuarios;
            return this.listaUsuarios;
        },
        validaLogin() {
            var contador = 0;
            for (let i = 0; i < this.listaUsuarios.length; i++) {
                if (this.usuario.toLowerCase() === this.listaUsuarios[i].nome && this.senha === this.listaUsuarios[i].senha) {
                    this.$router.push('/painelMissoes');
                    // sessionStorage.setItem("militar", this.usuario);
                    // sessionStorage.setItem("patente", this.listaUsuarios[i].patente);
                    sessionStorage.setItem("id", this.listaUsuarios[i].id);
                    contador = 1;
                }
            }
            if (contador === 0) {
                alert("Usuário/senha não encontrados.")
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

h1 {
    background-color: $cor-primaria;
    color: $cor-quaternaria;
    padding: 1.2rem;
    text-align: center;
    margin: 0;
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
    height: 35%;
    left: 35%;
    top: 32.5%;

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: auto;

        label {
            font-size: 1rem;
            font-weight: 500;
            margin: 0.5rem 0;
            color: white;
            display: flex;
            align-items: center;

            span {
                margin-right: 0.3rem;
            }
        }

        #usuario,
        #senha {
            padding: 0.2rem;
            font-weight: 100;
            font-style: italic;
            border-radius: 8px;
        }

        #valida {
            width: 60%;
            align-self: center;
            margin-top: 2.5rem;
            border: none;
            padding: 0.5rem;
            border-radius: 20px;
            font-size: 1rem;
            cursor: pointer;
            color: $cor-secundaria;
            font-weight: 700;
            font-size: 1.2rem;
        }
    }

    div {
        display: flex;
        justify-content: space-around;

        .btn-rotas {
            color: white;
            border: none;
            background: none;
            font-size: 0.9rem;
            cursor: pointer;
            margin-top: 1.5rem;
            text-decoration: none;
            transition: 0.3s all;

            &:hover {
                transform: scale(1.2);
                color: $cor-quaternaria;
                transition: 0.3s all;
            }
        }
    }
}
</style>