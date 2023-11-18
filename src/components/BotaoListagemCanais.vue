<template>
  <v-row dense class="d-flex flex-column" style="max-height: 5vh;">
    <v-col>
      <v-btn-toggle v-model="botaoSelecionado">
        <v-btn v-if="logado" value="voce" class="ml-4 mr-4" variant="outlined" rounded="xl">Para você</v-btn>
        <v-btn v-if="logado" value="seguindo" class="ml-4 mr-4" variant="outlined" rounded="xl">Seguindo</v-btn>
        <v-btn value="alta" class="ml-4 mr-4" variant="outlined" rounded="xl">Em alta</v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
  }),
  methods: {
    getRandom() {
      return Math.random()
    }
  },
  computed: {
    botaoSelecionado: {
      get() {
        return this.$store.getters['global/getBotaoSelecionado']
      },
      set(value) {
        this.$store.dispatch('global/setBotaoSelecionado', value)
      }
    },
    canais() {
      return this.$store.getters["global/getListaCanais"]
    },
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
  },
  mounted() {
  },
  created() {
  },
  watch: {
  },
}
</script>

<style scoped lang="scss">
.div {
  display: inline-block;
  margin: 0px 30%;
}
</style>