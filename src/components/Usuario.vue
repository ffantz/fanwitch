<template>
  <v-card class="w-100 h-100">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-avatar size="x-large" :image="baseUrl + '/storage/imagens/perfil/' + usuario.avatar"></v-avatar>
          <span class="ml-2">{{ usuario.username }}</span>
        </v-col>
        <v-col sm="6" cols="12" class="h-100">
          <v-card>
            <v-card-title>
              Bem vindo(a) ao {{ usuario.nome }}!
            </v-card-title>
            <v-card-item>
              <!-- {{ canal.descricao }} -->
            </v-card-item>
          </v-card>
        </v-col>
        <v-col sm="6" cols="12" class="h-100">
          <v-card>
            <v-card-item>
            </v-card-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn variant="outlined" color="primary" @click="acaoBotao(usuario.seguido ? 'PARAR_SEGUIR' : 'SEGUIR')">{{ canal.seguido ? 'Deixar de seguir' : 'Seguir' }}</v-btn> -->
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
    usuario: ''
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
    }
  },
  computed: {
    usuariosPesquisa() {
      return this.$store.getters["global/getUsuariosPesquisa"]
    },
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
  },
  created(){
    this.usuariosPesquisa.forEach(element => {
      if (element.username == this.$route.params.username) {
        this.usuario = element
      }
    })
  }
}
</script>

<style scoped lang="scss">

</style>