// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'MainContent',
        component: () => import('@/components/MainContent.vue'),
      },
      {
        path: '/pesquisa',
        name: 'PesquisaCanal',
        component: () => import('@/components/PesquisaCanal.vue'),
      },
      {
        path: '/minhas-recomendacoes',
        name: 'MinhasRecomendacoes',
        component: () => import('@/components/MinhasRecomendacoes.vue'),
      },
      {
        path: '/mensagens',
        name: 'Mensagens',
        component: () => import('@/components/Mensagens.vue'),
      },
      {
        path: '/configuracoes',
        name: 'Configuracoes',
        component: () => import('@/components/Configuracoes.vue'),
      },
      {
        path: '/ajuda',
        name: 'Ajuda',
        component: () => import('@/components/Ajuda.vue'),
      },
      {
        path: '/saiba-mais',
        name: 'SaibaMais',
        component: () => import('@/components/SaibaMais.vue'),
      },
      {
        path: '/canal/:username',
        name: 'Canal',
        component: () => import('@/components/Canal.vue')
      },
      {
        path: '/usuario/:username',
        name: 'Usuario',
        component: () => import('@/components/Usuario.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
