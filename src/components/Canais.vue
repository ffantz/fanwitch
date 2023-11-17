<template>
  <v-row dense>
    <v-col cols="9" class="">
      <v-btn-toggle
        v-model="botaoSelecionado"
        class="justify-center"
      >
        <v-btn v-if="logado" value="voce" class="ml-4 mr-4" variant="outlined" rounded="xl">Para você</v-btn>
        <v-btn v-if="logado" value="seguindo" class="ml-4 mr-4" variant="outlined" rounded="xl">Seguindo</v-btn>
        <v-btn value="alta" class="ml-4 mr-4" variant="outlined" rounded="xl">Em alta</v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>

  <v-row class="mt-2">
    <v-col
        v-for="(canal, index) in canais"
        :key="index + canais.lenght + index"
        sm="6"
      >
      <v-card
        class="mx-auto pa-2"
        max-width="90%"
        height="90%"
      >
        <v-row>
          <v-col cols="4">
            <v-avatar size="x-large"  :image="'http://apifanwitch.local:81/storage/imagens/perfil/' + canal.avatar"></v-avatar>
          </v-col>
          <v-col cols="8">
            <b>{{ canal.nome_canal }}</b>
            <b>{{ canal.seguidores.lenght }}</b>
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
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    key: 0,
    dialog: false,
    listaCanais: [],
  }),
  methods: {
  },
  computed: {
    botaoSelecionado: {
      get() {
        return this.$store.getters['global/getBotaoSelecionado']
      },
      set(value) {
        this.$store.dispatch('global/setBotaoSelecionado',value)
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