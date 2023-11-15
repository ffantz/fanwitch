<template>
  <v-row dense>
    <v-col cols="9" class="mx-auto">
      <v-btn-toggle
        v-model="botaoSelecionado"
        @click="defineListaCanal"
        class="justify-center"
      >
        <v-btn value="voce" class="ml-4 mr-4" variant="outlined" rounded="xl">Para você</v-btn>
        <v-btn value="seguindo" class="ml-4 mr-4" variant="outlined" rounded="xl">Seguindo</v-btn>
        <v-btn value="alta" class="ml-4 mr-4" variant="outlined" rounded="xl">Em alta</v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
  <v-row v-if="botaoSelecionado == 'seguindo' && !logado" class="h-100 w-100">
    <v-card
      class="d-flex justify-center align-center"
      min-width="80%"
    >
      <v-row>
        <v-col>
          <div class="div">Faça login ou cadastre-se para continuar</div>
          <v-card-actions class="mt-auto div">
            <v-btn
              class="ms-2"
              variant="outlined"
              size="large"
              @click="dialog = true"
            >
              Login
            </v-btn>
            <v-btn
              class="ms-2"
              variant="outlined"
              size="large"
            >
              Cadastre-se
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-row>

  <DialogLogin v-model:dialog="dialog"/>

  <v-row>
    <v-col
        v-for="(canal, index) in listaCanais"
        :key="index + key"
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
import DialogLogin from '@/components/DialogLogin.vue'

export default {
  components: {
    DialogLogin: DialogLogin,
  },
  data: () => ({
    botaoSelecionado: null,
    dialog: false,
    listaCanais: [],
    listaCanaisVoce: [],
    listaCanaisSeguindo: [],
    listaCanaisAlta: [],
    key: 0,
  }),
  methods: {
    initialize(){
      if (this.canais && this.canais.lenght > 0) {
        this.listaCanaisVoce = this.canais.slice(0, 8)
        this.listaCanaisSeguindo = this.logado ? this.canais.sort(this.ordenarStatus).slice(0, 8) : []
        this.listaCanaisAlta = this.canais.slice(0, 8)
      }
    },
    defineListaCanal(){
      if ((this.listaCanaisVoce && this.listaCanaisVoce.lenght == 0)
        || (this.listaCanaisSeguindo && this.listaCanaisSeguindo.lenght == 0)
        || (this.listaCanaisAlta && this.listaCanaisAlta.lenght == 0)) {
        this.initialize()
      }

      if (this.botaoSelecionado == 'seguindo') {
        this.listaCanais = this.listaCanaisSeguindo
      } else if (this.botaoSelecionado == 'alta') {
        this.listaCanais = this.listaCanaisAlta
      } else {
        this.listaCanais = this.listaCanaisVoce
      }

    },
    ordenarStatus (a, b) {
      if (a.status === b.status) {
        return b.recomendacoes - a.recomendacoes;
      } else {
        return b.status - a.status;
      }
    }
  },
  computed: {
    canais() {
      return this.$store.getters["global/getCanais"]
    },
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
  },
  watch: {
    canais(val) {
      if (val && val.lenght > 0) {
        this.initialize()
      }
    }
  },
  created() {
    this.defineListaCanal()
  },
  mounted() {
    this.initialize()
  }
}
</script>

<style scoped lang="scss">
.div {
  display: inline-block;
  margin: 0px 30%;
}
</style>