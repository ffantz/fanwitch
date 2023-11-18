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
        component: () => import('@/components/PesquisaCanal.vue'),
      },
      {
        path: '/minhas-recomendacoes',
        component: () => import('@/components/MinhasRecomendacoes.vue'),
      },
      {
        path: '/mensagens',
        component: () => import('@/components/Mensagens.vue'),
      },
      {
        path: '/configuracoes',
        component: () => import('@/components/Configuracoes.vue'),
      },
      {
        path: '/ajuda',
        component: () => import('@/components/Ajuda.vue'),
      },
      {
        path: '/saiba-mais',
        component: () => import('@/components/SaibaMais.vue'),
      },
    ],
  },
  // { // perfil dinamico
  //   path: '/ajuda',
  //   component: () => import('@/layouts/Default.vue'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'Ajuda',
  //       // route level code-splitting
  //       // this generates a separate chunk (Home-[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import('@/views/Ajuda.vue'),
  //     },
  //   ],
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
