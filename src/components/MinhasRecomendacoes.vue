<template>
  <v-container class="ma-0 container d-flex flex-column">
    <h1 class="mb-4">Minhas recomendações</h1>
    <v-row class="d-flex align-stretch mt-2" v-if="Object.keys(canais).length > 0">
      <v-col
        xs="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
        cols="12"
        v-for="(canal, index) in canais.sort((a, b) => { return b.qtdSeguidores - a.qtdSeguidores })" :key="'recomendacoes' + index"
        class="pa-0 mt-2"
      >
        <v-card class="mx-auto pa-2" max-width="90%">
          <v-row>
            <v-col cols="4">
              <v-avatar size="x-large"
                :image="baseUrl + '/storage/imagens/perfil/' + canal.avatar"></v-avatar>
            </v-col>
            <v-col cols="8">
              <b>{{ canal.nome_canal }}</b> {{ canal.qtdSeguidores }}
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
    <v-row v-else>
      Nenhum canal recomendado ainda.
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: [],
  data: () => ({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  methods: {
    initialize(){
      this.$store.dispatch('global/buscaCanaisRecomendados')
    },
    openPage(canal) {
      this.$router.push({ path: '/canal/' + canal.username })
    }
  },
  computed: {
    canais() {
      return this.$store.getters["global/getMinhasRecomendacoes"]
    },
  },
  created() {
    this.initialize()
  }
}
</script>

<style scoped>

.container{
  height: 90vh;
  overflow-y: auto;
}

</style>
