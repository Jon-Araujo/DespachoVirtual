<template>
    <section>
        <h2>Pronto da Missão</h2>
        <button class="btn-close" @click="$emit('trocaEstadoPopup')"><span
                class="material-symbols-outlined">close</span></button>
        <label for="solucaoMissao">Solução da Missão:</label>
        <textarea id="solucaoMissao" placeholder="Descreva aqui a solução da missão" v-model="solucao"></textarea>
        <!-- <label>Anexo: <input type="file" value="{{doc}}"><button v-if="doc !== ''">Salvar Doc</button></label> -->
        <button @click="enviarMissao" class="btn-enviar">Enviar</button>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProntoMissao',
    data() {
        return {
            popUp: false,
            solucao: '',
            listaMissoes: [] as any[],
            patenteRemetente: '',
            patenteDestinatario: ''
        }
    },
    emits: ['trocaEstadoPopup'],
    props: {
        militarEnviou: String,
        militarRespondeu: String,
        titulo: String,
        descricao: String,
        prazo: String
    },
    methods: {
        async recuperaMissoes() {
            const listaMissoes = await (await fetch("http://10.1.196.90:3000/missions", { method: 'GET' })).json();
            this.listaMissoes = listaMissoes;

            for (let i = 0; i < listaMissoes.length; i++) {
                if (listaMissoes[i].remetente == this.militarEnviou) {
                    this.patenteRemetente = listaMissoes[i].patenteremetente;
                } 
                
                if (listaMissoes[i].destinatario == this.militarRespondeu) {
                    this.patenteDestinatario = listaMissoes[i].patentedestinatario;
                }
            }
            return this.listaMissoes, this.patenteRemetente, this.patenteDestinatario
        },
        async enviarMissao() {
            const dados = JSON.stringify({
                remetente: this.militarEnviou,
                destinatario: this.militarRespondeu,
                titulo: this.titulo,
                descricao: this.descricao,
                prazo: this.prazo,
                solucao: this.solucao,
                patenteremetente: this.patenteRemetente,
                patentedestinatario: this.patenteDestinatario
            });

            await (await fetch("http://10.1.196.90:3000/historical", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: dados
            })).json();

            var id = '';
            for (let i = 0; i < this.listaMissoes.length; i++) {
                if (this.listaMissoes[i].remetente == this.militarEnviou &&
                    this.listaMissoes[i].destinatario == this.militarRespondeu &&
                    this.listaMissoes[i].titulo == this.titulo &&
                    this.listaMissoes[i].descricao == this.descricao &&
                    this.listaMissoes[i].prazo == this.prazo) {
                    id = this.listaMissoes[i].id;
                }
            }
            await (await fetch(`http://10.1.196.90:3000/missions/${id}`, { method: 'DELETE' })).json();

            this.$emit('trocaEstadoPopup');
            window.location.reload();
        }
    },
    created() {
        this.recuperaMissoes();
    }
})
</script>

<style scoped lang="scss">
@import '../style/variaveis.scss';

section {
    position: absolute;
    border: 6px solid $cor-terciaria;
    background-color: $cor-secundaria;
    width: 60%;
    height: 50%;
    top: 25%;
    left: 20%;
    padding: 0 1rem 1rem;

    h2 {
        text-align: center;
    }

    .btn-close {
        position: absolute;
        top: -5.5%;
        right: -2.5%;
        margin: 0;
        width: 3rem;
        padding: 0.3rem;
        border: 6px solid $cor-terciaria;
        background-color: $cor-quaternaria;
        color: $cor-primaria;
        border-radius: 50%;

        &:hover {
            background-color: red;
            color: #FFFFFF;
            cursor: pointer;
        }

    }

    label {
        display: block;
        margin-bottom: 1rem;
    }

    textarea {
        width: 95%;
        height: 40%;
        padding: 1rem;
        margin: 0 auto;
        display: block;
    }

    .btn-enviar {
        border: none;
        background-color: $cor-quaternaria;
        color: $cor-secundaria;
        font-size: 1.3rem;
        width: 50%;
        border-radius: 20px;
        padding: 0.25rem;
        margin: 2rem 0 0 25%;
        transition: 0.5s;

        &:hover {
            transform: scale(1.2);
            transition: 0.5s;
            background-color: $cor-secundaria;
            color: $cor-quaternaria;
            border: 1px solid $cor-quaternaria;
            cursor: pointer;
        }
    }
}</style>