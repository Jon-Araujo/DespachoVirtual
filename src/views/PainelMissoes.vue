<template>
    <nav>
        <MenuLateral />
        <h1>Painel de Missões</h1>
        <BotaoLogout />
        <ProntoMissao v-if="popUp === true" @trocaEstadoPopup="trocaEstado"
            v-bind="{ militarEnviou: militarEnviou, militarRespondeu: militarRespondeu, titulo: titulo, descricao: descricao, prazo: prazo }" />
    </nav>
    <h3>{{ msgSaudacao + ", " + patente + " " + inicial + nomeMilitar?.slice(1) + "!" }}</h3>
    
    <table>
        <thead>
            <tr>
                <th>Objeto da Missão</th>
                <th class="colunaPrazo">Prazo</th>
                <th>Autor</th>
                <!-- <th class="colunaAnexo">Anexo</th> -->
                <th class="colunaFeito"><span class="material-symbols-outlined">done_all</span></th>
            </tr>
        </thead>
        <tbody v-for="missao, index in listaMissoes" :key="index">
            <tr v-if="missao.destinatario == nomeMilitar">
                <th>{{ missao.titulo.toUpperCase() }} <br> {{ missao.descricao }}</th>
                <th class="colunaPrazo">{{ missao.prazo.split('-').reverse().join('/') }}</th>
                <th>{{ missao.patenteRemetente + " " + missao.remetente[0].toUpperCase() + missao.remetente.slice(1) }}</th>
                <!-- <th class="colunaAnexo"><button @click="abreAnexo"><span class="material-symbols-outlined">attach_file</span></button></th> -->
                <th class="colunaFeito" @click="manipulaDados(missao.remetente, missao.destinatario, missao.titulo, missao.descricao, missao.prazo)">
                    <button><span class="material-symbols-outlined">done_outline</span></button>
                </th>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuLateral from '@/components/MenuLateral.vue';
import BotaoLogout from '@/components/BotaoLogout.vue';
import ProntoMissao from '@/components/ProntoMissao.vue';

export default defineComponent({
    name: "painelMissoes",
    data() {
        return {
            listaMissoes: [] as any[],
            nomeMilitar: '',
            popUp: false,
            titulo: '',
            descricao: '',
            prazo: '',
            militarRespondeu: '',
            militarEnviou: '',
            patente: '',
            inicial: ''
        }
    },
    components: {
        MenuLateral,
        BotaoLogout,
        ProntoMissao
    },
    computed: {
        msgSaudacao() {
            const data = new Date();
            let horario: number = data.getHours();
            var msg: string;
            if (horario < 12) {
                msg = "Bom dia"
            } else if (horario < 18) {
                msg = "Boa tarde"
            } else {
                msg = "Boa noite"
            }
            return msg
        }
    },
    methods: {
        trocaEstado() {
            this.popUp = !this.popUp;
        },
        // abreAnexo() {
        //     if (localStorage.arquivos) {
        //         var listaArquivos = JSON.parse(localStorage.getItem("arquivos") || '{}');

        //         for (let i = 0; i < listaArquivos.length; i++) {

        //         }
        //     } else {
        //         alert("Não foi anexado nenhum documento.");
        //     }

        // },
        manipulaDados(militarEnviou: string, militarRespondeu: string, titulo: string, descricao: string, prazo: string) {
            this.trocaEstado();

            this.militarEnviou = militarEnviou;
            this.militarRespondeu = militarRespondeu;
            this.titulo = titulo;
            this.descricao = descricao;
            this.prazo = prazo;
        },
        async recebeMissoes() {
            var recebeLista = await (await fetch("https://api-bd-missoes.vercel.app/missoes", { method: 'GET' })).json();
            this.listaMissoes = recebeLista;
            return this.listaMissoes;
        },
        async retornaDados() {
            var recebeUsuarios = await (await fetch("https://api-bd-missoes.vercel.app/usuarios", { method: 'GET' })).json();
            const id = sessionStorage.getItem('id');

            for (let i = 0; i < recebeUsuarios.length; i++) {
                if (id === recebeUsuarios[i]._id) {
                    this.inicial = recebeUsuarios[i].nome[0].toUpperCase();
                    this.nomeMilitar = recebeUsuarios[i].nome;
                    this.patente = recebeUsuarios[i].patente;
                }
            }

            return this.nomeMilitar, this.patente, this.inicial
        }
    },
    created() {
        this.recebeMissoes();
        this.retornaDados();
    }
})
</script>

<style scoped lang="scss">
@import "../style/variaveis.scss";

nav {
    display: flex;
    height: 2.5rem;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
    background-color: $cor-primaria;
    color: $cor-quaternaria;
}

h3 {
    width: 100%;
    text-align: center;
    margin: 0;
    background-color: $cor-terciaria;
    padding: 0.3rem;
    color: $cor-primaria;
}

table {
    width: 80%;
    margin: auto;
    border: 1px solid black;
    border-radius: 8px;
    border-spacing: 0;
    margin-top: 4rem;
    background-color: $cor-quaternaria;
    color: $cor-primaria;

    th {
        border-bottom: 1px solid black;
        padding: 0.5rem;

        button {
            background-color: $cor-quaternaria;
            border: none;
            color: $cor-primaria;
            width: 100%;
            transition: transform 0.5s;

            span:hover {
                transform: scale(1.2);
                transition: transform 0.5s;
                cursor: pointer;
            }
        }
    }

    .colunaFeito {
        border-left: 1px solid black;
    }

    .colunaPrazo {
        border-right: 1px solid black;
        border-left: 1px solid black;
    }
}
</style>