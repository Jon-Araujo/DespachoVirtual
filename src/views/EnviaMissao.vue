<template>
    <div>
        <MenuLateral />
        <h1>Enviar Missão</h1>
        <BotaoLogout />
    </div>
    <form>
        <label for="militar">Selecione o militar:</label>
        <select id="militar" v-model="militar" @click="ordenaPatente">
            <option v-for="militar in coroneis" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
            <option v-for="militar in tenCoroneis" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
            <option v-for="militar in majores" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
            <option v-for="militar in capitaes" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
            <option v-for="militar in priTenentes" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
            <option v-for="militar in segTenentes" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
            <option v-for="militar in subTenentes" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
            <option v-for="militar in priSargentos" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
            <option v-for="militar in segSargentos" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
            <option v-for="militar in terSargentos" :key="militar.id">
                {{ militar.patente + " " + militar.nome[0].toUpperCase() + militar.nome.slice(1) }}
            </option>
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
            listaMissoes: [] as any[],
            coroneis: [] as any[],
            tenCoroneis: [] as any[],
            majores: [] as any[],
            capitaes: [] as any[],
            priTenentes: [] as any[],
            segTenentes: [] as any[],
            subTenentes: [] as any[],
            priSargentos: [] as any[],
            segSargentos: [] as any[],
            terSargentos: [] as any[]
        }
    },
    methods: {
        ordenaPatente() {
            this.coroneis = this.usuarios.filter(militar => militar.patente == 'Coronel');
            this.tenCoroneis = this.usuarios.filter(militar => militar.patente == 'Ten-Coronel');
            this.majores = this.usuarios.filter(militar => militar.patente == 'Major');
            this.capitaes = this.usuarios.filter(militar => militar.patente == 'Capitão');
            this.priTenentes = this.usuarios.filter(militar => militar.patente == '1º Tenente');
            this.segTenentes = this.usuarios.filter(militar => militar.patente == '2º Tenente');
            this.subTenentes = this.usuarios.filter(militar => militar.patente == 'Sub Tenente');
            this.priSargentos = this.usuarios.filter(militar => militar.patente == '1º Sargento');
            this.segSargentos = this.usuarios.filter(militar => militar.patente == '2º Sargento');
            this.terSargentos = this.usuarios.filter(militar => militar.patente == '3º Sargento');

            return this.coroneis, this.tenCoroneis, this.majores, this.capitaes, this.priTenentes, this.segTenentes,
                this.subTenentes, this.priSargentos, this.segSargentos, this.terSargentos;

        },
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
                    if (this.usuarios[i].nome == this.autor) {
                        patenteRemetente = this.usuarios[i].patente;
                    } else if (this.usuarios[i].nome == destinatario) {
                        patenteDestinatario = this.usuarios[i].patente;
                    }
                }

                const dados = JSON.stringify({
                    "remetente": `${this.autor}`,
                    "destinatario": `${destinatario}`,
                    "titulo": `${this.titulo}`,
                    "descricao": `${this.descricao}`,
                    "prazo": `${this.prazo}`,
                    "patenteremetente": `${patenteRemetente}`,
                    "patentedestinatario": `${patenteDestinatario}`
                });

                await (await fetch("http://10.1.196.90:3000/missions", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: dados
                })).json();

                alert('Operação concluída com sucesso');

            } catch (error) {
                alert('Ocorreu o erro:' + error);
            }

            this.militar = "";
            this.titulo = "";
            this.descricao = "";
            this.prazo = "";
        },
        async recuperaUsuarios() {
            var listaUsuarios = await (await fetch("http://10.1.196.90:3000/users", { method: 'GET' })).json();
            this.usuarios = listaUsuarios;
            return this.usuarios;
        },
        async recuperaMissoes() {
            var missoes = await (await fetch("http://10.1.196.90:3000/missions", { method: 'GET' })).json();
            this.listaMissoes = missoes;
            return this.listaMissoes;
        },
        async retornaDados() {
            var recebeUsuarios = await (await fetch("http://10.1.196.90:3000/users", { method: 'GET' })).json();
            const id = sessionStorage.getItem('id');

            for (let i = 0; i < recebeUsuarios.length; i++) {
                if (id == recebeUsuarios[i].id) {
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