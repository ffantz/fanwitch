<template>
  <v-row class="h-100">
    <v-col sm="12" md="8" class="h-100 sidebar-menu">
      <Banner />
      <!-- <Banner v-if="!logado"/> -->

      <Canais />
    </v-col>
    <v-col sm="0" md="4" class="sidebar-menu">
      <CanaisRecomendados/>
    </v-col>
  </v-row>
</template>

<script>
import CanaisRecomendados from '@/components/CanaisRecomendados.vue'
import Banner from '@/components/Banner.vue'
import Canais from '@/components/Canais.vue'

export default {
  components: {
    Banner,
    Canais,
    CanaisRecomendados,
  },
  data: () => ({
  }),
  computed: {
    logado() {
      return this.$store.getters["logado/getLogado"]
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

.container{
  max-width: 100% !important;
}
</style>