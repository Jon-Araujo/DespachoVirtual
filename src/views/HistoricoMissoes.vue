<template>
    <nav>
        <MenuLateral />
        <h1>Histórico das Missões</h1>
        <BotaoLogout />
    </nav>
    <div>
        <input id="enviadas" type="checkbox" @click="() => {checkEnviadas(); retornaDados()}"><label for="enviadas">Missões Enviadas</label>
        <input id="recebidas" type="checkbox" @click="() => {checkRecebidas(); retornaDados()}"><label for="recebidas">Missões Recebidas</label>
    </div>

    <section>
        <table v-if="enviadasChecked == true">
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
                    <th>{{ missao.patenteDestinatario + " " + missao.destinatario[0].toUpperCase() + missao.destinatario.slice(1) }}</th>
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
                    <th>{{ missao.patenteRemetente + " " + missao.remetente[0].toUpperCase() + missao.remetente.slice(1) }}</th>
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
            recebidasChecked: false,
            missoesRespondidas: [] as any[]
        }
    },
    methods: {
        async recuperaRespondidas() {
            const listaRespondidas = await (await fetch("https://api-bd-missoes.vercel.app/historico", { method: 'GET' })).json();
            this.missoesRespondidas = listaRespondidas;
            return this.missoesRespondidas;
        },
        checkEnviadas() {
            const recebidas: HTMLInputElement = document.getElementById('recebidas') as HTMLInputElement;
            this.enviadasChecked = true;
            this.recebidasChecked = false;
            recebidas.checked = false
        },
        checkRecebidas() {
            const enviadas: HTMLInputElement = document.getElementById('enviadas') as HTMLInputElement;
            this.recebidasChecked = true;
            this.enviadasChecked = false;
            enviadas.checked = false;
        },
        async retornaUsuarios() {
            const recebeUsuarios = await (await fetch("https://api-bd-missoes.vercel.app/usuarios", { method: 'GET' })).json();
            this.listaUsuarios = recebeUsuarios;
            return this.listaUsuarios;
        },
        async retornaDados() {
            const id = sessionStorage.getItem('id');
            for (let i = 0; i < this.listaUsuarios.length; i++) {
                if (id === this.listaUsuarios[i]._id) {
                    this.nomeMilitar = this.listaUsuarios[i].nome;
                }
            }
            return this.nomeMilitar
        }
    },
    created() {
        this.recuperaRespondidas();
        this.retornaUsuarios();
        this.retornaDados();
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

    #recebidas {
        margin-left: 4rem;
    }
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
}

th {
    border-bottom: 1px solid black;
    padding: 0.5rem;
}

.colunaSolucao {
    border-left: 1px solid black;
}

.colunaPrazo {
    border-right: 1px solid black;
    border-left: 1px solid black;
}</style>