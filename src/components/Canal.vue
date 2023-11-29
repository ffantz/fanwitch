<template>
  <v-card :loading="canal === null" class="w-100 h-100">
    <v-container class="ma-0" v-if="canal !== null && canal !== false">
      <v-row>
        <v-col cols="12">
          <v-img
            :src="baseUrl + '/storage/imagens/capa/' + (canal.foto_capa ? canal.foto_capa : 'no_photo.png')"
            class="align-end"
            height="300"
          >
          </v-img>
        </v-col>
        <v-col cols="12">
          <v-avatar size="x-large"  :image="baseUrl + '/storage/imagens/perfil/' + (canal.avatar ? canal.avatar : 'no_photo.png')"></v-avatar>
          <span class="ml-2">{{ canal.username }}</span>
        </v-col>
      </v-row>
      <v-row class="d-flex align-stretch mt-2">
        <v-col
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
          cols="12"
        >
          <v-card class="h-100">
            <v-card-title class="text-wrap">
              Bem vindo(a) ao {{ canal.nome_canal }}!
            </v-card-title>
            <v-card-subtitle>
              Sobre:
            </v-card-subtitle>
            <v-card-item>
              {{ canal.descricao ? canal.descricao : 'Este canal ainda não criou uma descrição' }}
            </v-card-item>
          </v-card>
        </v-col>

        <v-col
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
          cols="12"
        >
          <v-card class="d-flex flex-column h-100">
            <v-card-item class="text-wrap">
              <span class="text-black">Seguidores: {{ canal.seguidores }}</span><br>
              <span class="text-black">Inscritos: {{ canal.inscricoes }}</span><br>
              <span class="text-black">Recomendações: {{ canal.recomendacoes }}</span><br>
            </v-card-item>
            <v-card-actions class="mt-auto flex-sm-column flex-md-row align-self-sm-start">
              <v-btn variant="outlined" color="primary" @click="acaoBotao(canal.seguido ? 'PARAR_SEGUIR' : 'SEGUIR')">{{ canal.seguido ? 'Deixar de seguir' : 'Seguir' }}</v-btn>
              <v-btn class="botao" variant="outlined" color="primary" @click="acaoBotao(canal.inscrito ? 'DESINSCREVER' : 'INSCREVER')">{{ canal.inscrito ? 'Finalizar Inscrição' : 'Inscrever' }}</v-btn>
              <v-btn class="botao" variant="outlined" color="primary" @click="acaoBotao(canal.recomendado ? 'REMOVER_RECOMENDADO' : 'RECOMENDADO')">{{ canal.recomendado ? 'Deixar de recomendar' : 'Recomendar' }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      Canal não encontrado
    </v-container>
  </v-card>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  methods: {
    initialize() {
      this.$store.dispatch('global/pesquisarCanal', { nome: this.$route.params.username, perfil: true })
    },
    acaoBotao(acao){
      if (!this.logado) {
        this.$store.dispatch('snackbar/mostrarNotificacao', { mensagem: "Faça login para executar essa ação" })
        return
      }
      this.$store.dispatch('global/acaoCanal', { id_canal: this.canal.id, acao: acao })
      this.defineAcao(acao)
    },
    defineAcao(acao) {
      if (acao == 'PARAR_SEGUIR' || acao == 'SEGUIR') {
        this.canal.seguido = !this.canal.seguido
        if (acao == 'SEGUIR') {
          this.canal.seguidores++
        } else {
          this.canal.seguidores--
        }
      }

      if (acao == 'REMOVER_RECOMENDADO' || acao == 'RECOMENDADO') {
        this.canal.recomendado = !this.canal.recomendado
        if (acao == 'RECOMENDADO') {
          this.canal.recomendacoes++
        } else {
          this.canal.recomendacoes--
        }
      }

      if (acao == 'DESINSCREVER' || acao == 'INSCREVER') {
        this.canal.inscrito = !this.canal.inscrito
        if (acao == 'INSCREVER') {
          this.canal.inscricoes++
        } else {
          this.canal.inscricoes--
        }
      }
    }
  },
  computed: {
    canal() {
      return this.$store.getters["global/getCanal"]
    },
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
  },
  created(){
    this.initialize()
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">

.botao{
  margin-inline-start: 0rem !important;
}

@media (max-width: 600px) {
  .align-self-sm-start {
      align-self: flex-start !important;
  }
}

@media (max-width: 600px) {
  .flex-sm-column {
      flex-direction: column !important;
  }
}

@media (max-width: 960px) {
  .v-card-actions {
    align-items: start !important;
  }
}

</style>