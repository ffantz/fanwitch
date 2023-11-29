// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Default" */ '@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'MainContent',
        component: () => import(/* webpackChunkName: "MainContent" */ '@/components/MainContent.vue'),
      },
      {
        path: '/pesquisa',
        name: 'Pesquisa',
        component: () => import(/* webpackChunkName: "Pesquisa" */ '@/components/Pesquisa.vue'),
      },
      {
        path: '/minhas-recomendacoes',
        name: 'MinhasRecomendacoes',
        component: () => import(/* webpackChunkName: "MinhasRecomendacoes" */ '@/components/MinhasRecomendacoes.vue'),
      },
      {
        path: '/mensagens',
        name: 'Mensagens',
        component: () => import(/* webpackChunkName: "Mensagens" */ '@/components/Mensagens.vue'),
      },
      {
        path: '/configuracoes',
        name: 'Configuracoes',
        component: () => import(/* webpackChunkName: "Configuracoes" */ '@/components/Configuracoes.vue'),
      },
      {
        path: '/ajuda',
        name: 'Ajuda',
        component: () => import(/* webpackChunkName: "Ajuda" */ '@/components/Ajuda.vue'),
      },
      {
        path: '/saiba-mais',
        name: 'SaibaMais',
        component: () => import(/* webpackChunkName: "SaibaMais" */ '@/components/SaibaMais.vue'),
      },
      {
        path: '/canal/:username',
        name: 'Canal',
        component: () => import(/* webpackChunkName: "Canal" */ '@/components/Canal.vue')
      },
      {
        path: '/usuario/:username',
        name: 'Usuario',
        component: () => import(/* webpackChunkName: "Usuario" */ '@/components/Usuario.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
