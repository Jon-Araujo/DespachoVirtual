<template>
    <nav>
        <h1>Cadastro</h1>
        <BotaoLogout class="btn-logout" />
    </nav>

    <form>
        <label for="patente"><span class="material-symbols-outlined">military_tech</span>Posto | Graduação:</label>
        <select id="patente" v-model="patente" required>
            <option>Coronel</option>
            <option>Ten-Coronel</option>
            <option>Major</option>
            <option>Capitão</option>
            <option>1º Tenente</option>
            <option>2º Tenente</option>
            <option>Aspirante a oficial</option>
            <option>Sub Tenente</option>
            <option>1º Sargento</option>
            <option>2º Sargento</option>
            <option>3º Sargento</option>
        </select>

        <label for="usuario"><span class="material-symbols-outlined">person</span>Usuário:</label>
        <input v-model="usuario" id="usuario" type="text" placeholder="Insira aqui seu nome" required>

        <label for="senha"><span class="material-symbols-outlined">password</span>Senha:</label>
        <input v-model="senha" id="senha" type="password" placeholder="Insira aqui sua senha" required>

        <label for="email"><span class="material-symbols-outlined">mail</span>Email:</label>
        <input v-model="email" type="email" id="email" placeholder="Insira aqui seu email" required>

        <label for="pergunta"><span class="material-symbols-outlined">quick_phrases</span>Pergunta para eventual recuperação
            de senha:</label>
        <select v-model="pergunta" required>
            <option>Nº de aluno | cadete?</option>
            <option>Nome do animal de estimação?</option>
            <option>Iniciais de um nome?</option>
            <option>Nº da primeira casa?</option>
            <option>Data de aniversário, casamento ou namoro?</option>
            <option>Placa do primeiro carro?</option>
        </select>

        <label><span class="material-symbols-outlined">person_raised_hand</span>Resposta:</label>
        <input v-model="resposta" type="text" placeholder="Insira aqui a resposta da pergunta acima" required>

        <input type="submit" value="Cadastrar" id="cadastra" @click="cadastraUsuario">
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BotaoLogout from '@/components/BotaoLogout.vue';

export default defineComponent({
    name: "CadastroUsuario",
    data() {
        return {
            patente: "",
            usuario: "",
            senha: "",
            email: "",
            pergunta: "",
            resposta: "",
            listaUsuarios: [] as any[]
        }
    },
    components: {
        BotaoLogout
    },
    methods: {
        async cadastraUsuario() {
            try {
                const dados = JSON.stringify({
                    "patente": `${this.patente}`,
                    "nome": `${this.usuario.toLowerCase()}`,
                    "senha": `${this.senha}`,
                    "email": `${this.email.toLowerCase()}`,
                    "pergunta": `${this.pergunta}`,
                    "resposta": `${this.resposta.toLowerCase()}`
                });

                let contador = 0;

                for (let i = 0; i < this.listaUsuarios.length; i++) {
                    if (this.email == this.listaUsuarios[i].email) {
                        contador = 1;
                        alert('Usuário já existe.');
                    }
                }

                if (contador === 0) {
                    await (await fetch('http://10.1.196.90:3000/users', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: dados
                    })).json();

                    alert("Usuário cadastrado com sucesso!");

                    this.$router.push('/');
                }

            } catch (error) {
                alert("Ocorreu um erro, tente novamente!" + error);
            }
        },
        async recuperaUsuarios() {
            const listaUsuarios = await (await fetch('http://10.1.196.90:3000/users', { method: 'GET' })).json();
            this.listaUsuarios = listaUsuarios;
            return this.listaUsuarios;
        }
    },
    created() {
        this.recuperaUsuarios();
    },
})
</script>

<style lang="scss" scoped>
@import '../style/variaveis.scss';

nav {
    background-color: $cor-primaria;
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    top: 0;
    height: 10%;

    h1 {
        text-align: center;
        width: 100%;
        height: 2.5rem;
        padding: 0.3rem;
        color: $cor-quaternaria;
    }

    .btn-logout {
        position: absolute;
        top: 1rem;
        right: 1.5rem;
    }
}

form {
    border-radius: 8px;
    border: 2px solid $cor-quaternaria;
    box-shadow: inset 0px 0px 20px 5px $cor-quaternaria;
    background-color: $cor-secundaria;
    opacity: 0.8;
    width: 30%;
    padding: 1.5rem;
    position: absolute;
    height: 60%;
    left: 35%;
    top: 20%;

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
    #senha,
    select,
    input {
        padding: 0.2rem;
        font-weight: 100;
        font-style: italic;
        border-radius: 8px;
        width: 98%;
    }

    select {
        width: 100%;
    }

    #cadastra {
        width: 60%;
        margin-top: 1.5rem;
        color: $cor-secundaria;
        background-color: $cor-quaternaria;
        font-size: 1.2rem;
        font-weight: 600;
        border: none;
        padding: 0.5rem;
        position: relative;
        left: 20%;
        border-radius: 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.5s;

        &:hover {
            transform: scale(1.1);
            background-color: $cor-terciaria;
            color: $cor-quaternaria;
            font-weight: 900;
            transition: all 0.5s;
        }
    }

}
</style>