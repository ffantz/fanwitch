<template>
  <v-row class="h-100">
    <v-col sm="12" md="8" class="h-100 sidebar-menu">
      <Banner />

      <BotaoListagemCanais />

      <Canais v-if="botaoSelecionado == 'voce'" tipo="voce" :canais="listaCanaisVoce" />
      <Canais v-if="botaoSelecionado == 'seguindo'" tipo="seguindo" :canais="listaCanaisSeguindo" />
      <Canais v-if="botaoSelecionado == 'alta'" tipo="alta" :canais="listaCanaisAlta" />
    </v-col>
    <v-col sm="0" md="4" class="sidebar-menu">
      <CanaisRecomendados/>
    </v-col>
  </v-row>
</template>

<script>
import BotaoListagemCanais from '@/components/BotaoListagemCanais.vue'
import CanaisRecomendados from '@/components/CanaisRecomendados.vue'
import Banner from '@/components/Banner.vue'
import Canais from '@/components/Canais.vue'

export default {
  components: {
    Banner,
    Canais,
    CanaisRecomendados,
    BotaoListagemCanais,
  },
  data: () => ({
  }),
  computed: {
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
    botaoSelecionado() {
      return this.$store.getters["global/getBotaoSelecionado"]
    },
    listaCanaisVoce() {
      return this.$store.getters["global/getListaCanaisVoce"]
    },
    listaCanaisSeguindo() {
      return this.$store.getters["global/getListaCanaisSeguindo"]
    },
    listaCanaisAlta() {
      return this.$store.getters["global/getListaCanaisAlta"]
    },
  }
}
</script>

<style scoped lang="scss">

.sidebar-menu {
  font-size: 1.15em;
  display: flex;
  flex-direction: column;
}
</style>