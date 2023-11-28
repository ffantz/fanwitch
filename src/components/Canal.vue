<template>
  <v-card class="w-100 h-100">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img
            :src="baseUrl + '/storage/imagens/capa/' + canal.foto_capa"
            class="align-end"
            height="300"
          >
          </v-img>
        </v-col>
        <v-col cols="12">
          <v-avatar size="x-large"  :image="baseUrl + '/storage/imagens/perfil/' + canal.avatar"></v-avatar>
          <span class="ml-2">{{ canal.username }}</span>
        </v-col>
        <v-col sm="6" cols="12" class="h-100">
          <v-card>
            <v-card-title>
              Bem vindo(a) ao {{ canal.nome_canal }}!
            </v-card-title>
            <v-card-item>
              {{ canal.descricao }}
            </v-card-item>
          </v-card>
        </v-col>
        <v-col sm="6" cols="12" class="h-100">
          <v-card>
            <v-card-item>
              <span class="text-black">Seguidores: {{ canal.seguidores }}</span><br>
              <span class="text-black">Inscritos: {{ canal.inscricoes }}</span><br>
              <span class="text-black">Recomendações: {{ canal.recomendacoes }}</span><br>
            </v-card-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="outlined" color="primary" @click="acaoBotao(canal.seguido ? 'PARAR_SEGUIR' : 'SEGUIR')">{{ canal.seguido ? 'Deixar de seguir' : 'Seguir' }}</v-btn>
              <v-btn variant="outlined" color="primary" @click="acaoBotao(canal.inscrito ? 'DESINSCREVER' : 'INSCREVER')">{{ canal.inscrito ? 'Finalizar Inscrição' : 'Inscrever' }}</v-btn>
              <v-btn variant="outlined" color="primary" @click="acaoBotao(canal.recomendado ? 'REMOVER_RECOMENDADO' : 'RECOMENDADO')">{{ canal.recomendado ? 'Deixar de recomendar' : 'Recomendar' }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    baseUrl: import.meta.env.VITE_BASE_URL,
    canal: ''
  }),
  methods: {
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
    canais() {
      return this.$store.getters["global/getCanaisRecomendados"].filter((canal) => {
        return canal.recomendacoes > 0
      })
    },
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
  },
  created(){
    this.canais.forEach(element => {
      if (element.username == this.$route.params.username) {
        this.canal = element
      }
    })
  }
}
</script>

<style scoped lang="scss">

</style>