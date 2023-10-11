<template>
    <div>
        <MenuLateral />
        <h1>Enviar Missão</h1>
        <BotaoLogout />
    </div>
    <form>
        <label for="militar">Selecione o militar:</label>
        <select id="militar" v-model="militar">
            <option v-for="militares, index in usuarios" :key="index">{{ militares.patente + " " +
                militares.nome[0].toUpperCase() + militares.nome.slice(1) }}</option>
        </select>

        <label for="tituloMissao">Título da Missão:</label>
        <input type="text" id="tituloMissao" placeholder="Digite aqui o título da missão" v-model="titulo">

        <label for="descricaoMissao">Descrição da Missão:</label>
        <textarea id="descricaoMissao" placeholder="Explicite aqui os detalhes da missão" v-model="descricao"></textarea>

        <label for="prazo">Prazo:</label>
        <input type="date" id="prazo" v-model="prazo">

        <button @click="enviarMissao">Enviar Missão</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuLateral from '../components/MenuLateral.vue';
import BotaoLogout from '@/components/BotaoLogout.vue';

export default defineComponent({
    name: 'EnviaMissao',
    components: {
        MenuLateral,
        BotaoLogout
    },
    data() {
        return {
            militar: '',
            titulo: '',
            descricao: '',
            prazo: '',
            autor: '',
            usuarios: [] as any[],
            listaMissoes: [] as any[]
        }

    },
    methods: {
        async enviarMissao() {
            try {
                var nomeMilitar = this.militar.split(' ');
                var destinatario = '';
                for (let i = 0; i < nomeMilitar.length; i++) {
                    destinatario = nomeMilitar[nomeMilitar.length - 1].toLowerCase();
                }

                var patenteRemetente = '';
                var patenteDestinatario = '';

                for (let i = 0; i < this.usuarios.length; i++) {
                    if (this.usuarios[i].nome === this.autor) {
                        patenteRemetente = this.usuarios[i].patente;
                    } else if (this.usuarios[i].nome === destinatario) {
                        patenteDestinatario = this.usuarios[i].patente;
                    }
                }

                const dados = JSON.stringify({
                    "remetente": `${this.autor}`,
                    "destinatario": `${destinatario}`,
                    "titulo": `${this.titulo}`,
                    "descricao": `${this.descricao}`,
                    "prazo": `${this.prazo}`,
                    "patenteRemetente": `${patenteRemetente}`,
                    "patenteDestinatario": `${patenteDestinatario}`
                });
                
                await (await fetch("http://localhost:3000/missoes", { 
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: dados
                })).json();
                
                alert('Operação concluída com sucesso');
                
            } catch(error) {
                alert('Ocorreu o erro:' + error);
            }

            this.militar = "";
            this.titulo = "";
            this.descricao = "";
            this.prazo = "";
        },
        async recuperaUsuarios() {
            var listaUsuarios = await (await fetch("http://localhost:3000/usuarios", { method: 'GET' })).json();
            this.usuarios = listaUsuarios;
            return this.usuarios;
        },
        async recuperaMissoes() {
            var missoes = await (await fetch("http://localhost:3000/missoes", { method: 'GET' })).json();
            this.listaMissoes = missoes;
            return this.listaMissoes;
        },
        async retornaDados() {
            var recebeUsuarios = await (await fetch("http://localhost:3000/usuarios", { method: 'GET' })).json();
            const id = sessionStorage.getItem('id');

            for (let i = 0; i < recebeUsuarios.length; i++) {
                if (id === recebeUsuarios[i]._id) {
                    this.autor = recebeUsuarios[i].nome;
                }
            }
            return this.autor
        }
    },
    created() {
        this.recuperaUsuarios();
        this.recuperaMissoes();
        this.retornaDados();
    }
})
</script>

<style scoped lang="scss">
@import '../style/variaveis.scss';

div {
    display: flex;
    height: 2.5rem;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
    background-color: $cor-primaria;
    color: $cor-quaternaria;

    h1 {
        margin: 0;
    }
}

form {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border: 1px solid black;
    background-color: $cor-terciaria;
    color: $cor-primaria;
    opacity: 0.85;
    width: 70%;
    margin: 4rem auto 0;
    border-radius: 1rem;

    select,
    input,
    textarea {
        margin: 0.5rem 0 2rem;
        border-radius: 8px;
        padding: 0.5rem;
    }

    textarea {
        height: 5rem;
    }

    button {
        width: 50%;
        margin-left: 25%;
        padding: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
        color: $cor-primaria;
        border: none;
        border-radius: 20px;
        background-color: $cor-quaternaria;
        cursor: pointer;
        transition: 0.3s all;

        &:hover {
            transform: scale(1.2);
            transition: 0.3s all;
        }
    }
}
</style>