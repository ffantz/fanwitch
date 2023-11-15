<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <SideBar />

      <NavBar />

      <MainContent v-if="barraPesquisa == ''" />

      <PesquisaCanal v-else />
      <!-- <PesquisaCanal v-show="barraPesquisa != ''" /> -->
    </v-layout>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import MainContent from '@/components/Content.vue'
import PesquisaCanal from '@/components/PesquisaCanal.vue'

export default {
  components: {
    SideBar,
    NavBar,
    MainContent,
    PesquisaCanal,
  },
  computed: {
    barraPesquisa() {
      return this.$store.getters["global/getBarraPesquisa"]
    },
  },
  created() {
    this.$store.dispatch('global/initialize')
    if (localStorage.token !== undefined) {
      this.$store.dispatch('logado/setLogado', true)
      this.$store.dispatch('logado/configurarToken')
      this.$store.dispatch('logado/dadosUsuario')
    }
  }
}
</script>
