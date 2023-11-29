<template>
  <v-container class="ma-0 pa-0 mt-4">
    <v-row class="d-flex align-stretch mt-2">
      <v-col
        xs="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
        cols="12"
        v-for="(canal, index) in canais" :key="tipo + index"
        class="pa-0 mt-2"
      >
        <v-card class="mx-auto pa-2 h-100" max-width="90%">
          <v-row>
            <v-col cols="4">
              <v-avatar size="x-large"
                :image="baseUrl + '/storage/imagens/perfil/' + canal.avatar"></v-avatar>
            </v-col>
            <v-col cols="8">
              <b>{{ canal.nome_canal }}</b>
              <v-divider class="mt-auto"></v-divider>
              <v-card-actions class="div">
                <v-spacer></v-spacer>
                <v-btn @click="openPage(canal)" style="color: #e5c8d6;">
                  Detalhes
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: [ 'tipo', 'canais' ],
  components: {
  },
  data: () => ({
    baseUrl: import.meta.env.VITE_BASE_URL,
    key: 0,
    dialog: false,
    listaCanais: [],
  }),
  methods: {
    getRandom() {
      return Math.random()
    },
    openPage(canal) {
      this.$router.push({ path: '/canal/' + canal.username })
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