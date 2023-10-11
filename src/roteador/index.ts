import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import CadastroUsuario from "../views/CadastroUsuario.vue";
import LoginUsuario from "../views/LoginUsuario.vue";
import RecuperaSenha from "../views/RecuperaSenha.vue";
import PainelMissoes from "../views/PainelMissoes.vue";
import EnviaMissao from "../views/EnviaMissao.vue";
import HistoricoMissoes from "../views/HistoricoMissoes.vue";

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: "LoginUsuario",
        component: LoginUsuario
    },
    {
        path: '/cadastro',
        name: "CadastroUsuario",
        component: CadastroUsuario
    },
    {
        path: '/recuperaSenha',
        name: "recuperaSenha",
        component: RecuperaSenha
    },
    {
        path: '/painelMissoes',
        name: "painelMissoes",
        component: PainelMissoes
    },
    {
        path: '/enviaMissao',
        name: "enviaMissao",
        component: EnviaMissao
    },
    {
        path: '/historico',
        name: "historicoMissoes",
        component: HistoricoMissoes
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;