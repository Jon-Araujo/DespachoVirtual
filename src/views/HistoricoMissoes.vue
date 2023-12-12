<template>
    <nav>
        <MenuLateral />
        <h1>Histórico das Missões</h1>
        <BotaoLogout />
    </nav>
    <div>
        <input id="enviadas" type="checkbox" @click=" () => { checkEnviadas(); retornaDados() }"><label for="enviadas">Missões
            Enviadas</label>
        <input id="respondidas" type="checkbox" @click="() => { checkRespondidas(); retornaDados() }"><label
            for="respondidas">Missões
            Respondidas</label>
        <input id="recebidas" type="checkbox" @click="() => { checkRecebidas(); retornaDados() }"><label
            for="recebidas">Missões Recebidas</label>
    </div>

    <section id="container_tabela">
        <table v-if="enviadasChecked == true">
            <thead>
                <tr>
                    <th>Objeto da Missão</th>
                    <th class="colunaPrazo">Prazo</th>
                    <th>Destinatário</th>
                    <!-- <th class="colunaSolucao">Solução</th> -->
                </tr>
            </thead>
            <tbody v-for="missao, index in missoesEnviadas" :key="index">
                <tr v-if="missao.remetente == nomeMilitar">
                    <th>{{ missao.titulo.toUpperCase() }} <br> {{ missao.descricao }}</th>
                    <th class="colunaPrazo">{{ missao.prazo.split('-').reverse().join('/') }}</th>
                    <th>{{ missao.patentedestinatario + " " + missao.destinatario[0].toUpperCase() +
                        missao.destinatario.slice(1) }}</th>
                    <!-- <th class="colunaSolucao">{{ missao.solucao }}</th> -->
                </tr>
            </tbody>
        </table>

        <table v-if="respondidasChecked == true">
            <thead>
                <tr>
                    <th>Objeto da Missão</th>
                    <th class="colunaPrazo">Prazo</th>
                    <th>Destinatário</th>
                    <th class="colunaSolucao">Solução</th>
                </tr>
            </thead>
            <tbody v-for="missao, index in missoesRespondidas" :key="index">
                <tr v-if="missao.remetente == nomeMilitar">
                    <th>{{ missao.titulo.toUpperCase() }} <br> {{ missao.descricao }}</th>
                    <th class="colunaPrazo">{{ missao.prazo.split('-').reverse().join('/') }}</th>
                    <th>{{ missao.patentedestinatario + " " + missao.destinatario[0].toUpperCase() +
                        missao.destinatario.slice(1) }}</th>
                    <th class="colunaSolucao">{{ missao.solucao }}</th>
                </tr>
            </tbody>
        </table>

        <table v-if="recebidasChecked == true">
            <thead>
                <tr>
                    <th>Objeto da Missão</th>
                    <th class="colunaPrazo">Prazo</th>
                    <th>Autor</th>
                    <th class="colunaSolucao">Solução</th>
                </tr>
            </thead>
            <tbody v-for="missao, index in missoesRespondidas" :key="index">
                <tr v-if="missao.destinatario == nomeMilitar">
                    <th>{{ missao.titulo.toUpperCase() }} <br> {{ missao.descricao }}</th>
                    <th class="colunaPrazo">{{ missao.prazo.split('-').reverse().join('/') }}</th>
                    <th>{{ missao.patenteremetente + " " + missao.remetente[0].toUpperCase() + missao.remetente.slice(1) }}
                    </th>
                    <th class="colunaSolucao">{{ missao.solucao }}</th>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BotaoLogout from '@/components/BotaoLogout.vue';
import MenuLateral from '@/components/MenuLateral.vue';

export default defineComponent({
    name: 'HistoricoMissoes',
    components: {
        BotaoLogout,
        MenuLateral
    },
    data() {
        return {
            listaUsuarios: [] as any[],
            nomeMilitar: '',
            enviadasChecked: false,
            respondidasChecked: false,
            recebidasChecked: false,
            missoesRespondidas: [] as any[],
            missoesEnviadas: [] as any[]
        }
    },
    methods: {
        async recuperaRespondidas() {
            const listaRespondidas = await (await fetch("http://10.1.196.90:3000/historical", { method: 'GET' })).json();
            this.missoesRespondidas = listaRespondidas;
            return this.missoesRespondidas;
        },

        async recuperaEnviadas() {
            const listaEnviadas = await (await fetch("http://10.1.196.90:3000/missions", { method: 'GET' })).json();
            this.missoesEnviadas = listaEnviadas;
            return this.missoesEnviadas;
        },
        checkEnviadas() {
            const respondidas: HTMLInputElement = document.getElementById('respondidas') as HTMLInputElement;
            const recebidas: HTMLInputElement = document.getElementById('recebidas') as HTMLInputElement;

            respondidas.checked = false;
            recebidas.checked = false;

            this.recebidasChecked = false;
            this.respondidasChecked = false;
            this.enviadasChecked = true;
        },
        checkRespondidas() {
            const enviadas: HTMLInputElement = document.getElementById('enviadas') as HTMLInputElement;
            const recebidas: HTMLInputElement = document.getElementById('recebidas') as HTMLInputElement;

            enviadas.checked = false;
            recebidas.checked = false;

            this.recebidasChecked = false;
            this.respondidasChecked = true;
            this.enviadasChecked = false;
        },
        checkRecebidas() {
            const respondidas: HTMLInputElement = document.getElementById('respondidas') as HTMLInputElement;
            const enviadas: HTMLInputElement = document.getElementById('enviadas') as HTMLInputElement;

            respondidas.checked = false;
            enviadas.checked = false;

            this.recebidasChecked = true;
            this.respondidasChecked = false;
            this.enviadasChecked = false;
        },
        async retornaUsuarios() {
            const recebeUsuarios = await (await fetch("http://10.1.196.90:3000/users", { method: 'GET' })).json();
            this.listaUsuarios = recebeUsuarios;
            return this.listaUsuarios;
        },
        async retornaDados() {
            const id = sessionStorage.getItem('id');
            for (let i = 0; i < this.listaUsuarios.length; i++) {
                if (id == this.listaUsuarios[i].id) {
                    this.nomeMilitar = this.listaUsuarios[i].nome;
                }
            }
            return this.nomeMilitar
        }
    },
    created() {
        this.recuperaRespondidas();
        this.recuperaEnviadas();
        this.retornaUsuarios();
    }
})
</script>

<style scoped lang="scss">
@import '../style/variaveis.scss';

nav {
    display: flex;
    height: 2.5rem;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
    background-color: $cor-primaria;
    color: $cor-quaternaria;

    h1 {
        background-color: $cor-primaria;
        color: $cor-quaternaria;
        padding: 1rem;
        margin: 0;
        text-align: center;
    }
}

div {
    display: flex;
    justify-content: center;
    background-color: $cor-terciaria;
    padding: 0.5rem;

    label {
        margin: 0 5rem 0 .5rem;
    }
    #enviadas {
        margin-left: 5%;
    }
}

#container_tabela {
    overflow-y: auto;
    border-collapse: collapse;
    height: 70vh;
    width: 80%;
    margin: auto;
    margin-top: 4rem;
    border-radius: 8px;

    &::-webkit-scrollbar {
        height: 18px;
        width: 5px;
    }

    &::-webkit-scrollbar-button {
        background-color: none !important;
        width: 0px;
        height: 0px;
    }

    &::-webkit-scrollbar-track-piece {
        background-color: #E7E7E7;
        -webkit-border-radius: 0 8px 8px 0;
    }

    &::-webkit-scrollbar-thumb:vertical {
        width: 3px;
        background-color: $cor-primaria;
        -webkit-border-radius: 8px;
    }

    scrollbar-width: thin;
    scrollbar-color: $cor-primaria #E7E7E7;

    table {
        width: 100%;
        border-spacing: 0;
        background-color: $cor-quaternaria;
        color: $cor-primaria;


        th {
            border-bottom: 1px solid black;
            padding: 0.5rem;
        }
    }
}

.colunaSolucao {
    border-left: 1px solid black;
}

.colunaPrazo {
    border-right: 1px solid black;
    border-left: 1px solid black;
}
</style>
