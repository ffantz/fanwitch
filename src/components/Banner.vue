<template>
  <v-container fluid>
    <v-row dense>
      <v-col sm="12" class="mx-auto">
        <v-card class="d-flex background" rounded="xl">
          <div :class="'d-flex ' + (isMobile ?'flex-column' : '')">
            <div class="d-flex flex-column">
              <v-card-title class="text-h3 w-70 text-wrap card-title">
                Recomende seu Streamer favorito!
              </v-card-title>

              <v-card-subtitle class="mt-2">Uma forma simples de indicar seu <b>Streamer favorito</b></v-card-subtitle>

              <v-card-actions class="mt-auto" v-if="!logado" >
                <v-btn
                  class="ms-2"
                  variant="outlined"
                  size="large"
                  @click="goTo('/configuracoes')"
                >
                  Cadastre-se
                </v-btn>
                <v-btn
                  class="ms-2"
                  variant="outlined"
                  size="large"
                  @click="goTo('/saiba-mais')"
                >
                  Saiba mais
                </v-btn>
              </v-card-actions>
            </div>

            <img src="@/assets/fundo.png" height="300"/>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
  }),
  methods: {
    goTo(rota) {
      this.$router.push(rota)
    }
  },
  computed: {
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
    isMobile() {
      return window.innerWidth <= 599
    },
  }
}
</script>

<style scoped lang="scss">
.background {
  background-color: #f3eae9;
}

.card-title {
  line-height: 1.2em !important;
}
</style>