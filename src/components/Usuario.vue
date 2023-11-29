<template>
  <v-card :loading="usuario === null" class="w-100 h-100">
    <v-container v-if="usuario !== null && usuario !== false">
      <v-row>
        <v-col cols="12">
          <v-avatar size="x-large" :image="baseUrl + '/storage/imagens/perfil/' + (usuario.avatar ? usuario.avatar : 'no_photo.png')"></v-avatar>
        </v-col>
        <v-col sm="6" cols="12" class="h-100">
          <v-card>
            <v-card-title>
              Bem vindo(a) ao {{ usuario.nome ? usuario.nome : usuario.username }}!
            </v-card-title>
            <v-card-subtitle>
              Sobre:
            </v-card-subtitle>
            <v-card-item>
              {{ usuario.descricao ? usuario.descricao : 'Este usuário ainda não criou uma descrição' }}
            </v-card-item>
          </v-card>
        </v-col>
        <v-col sm="6" cols="12" class="h-100">
          <v-card>
            <v-card-item>
              <span class="text-black">Usuário: {{ formataData(usuario.username) }}</span><br>
              <span v-if="usuario.data_nascimento !== null" class="text-black">Data de nascimento: {{ formataData(usuario.data_nascimento) }}</span><br>
              <span class="text-black">Amigos: {{ usuario.amigos }}</span><br>
            </v-card-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="outlined" :disabled="dadosUsuario.id == usuario.id" color="primary" @click="acaoBotao(usuario.amigo ? 'DESFAZER_AMIZADE' : 'AMIZADE')">{{ usuario.amigo ? 'Desfazer amizade' : 'Solicitar amizade' }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      Usuário não encontrado
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
      this.$store.dispatch('global/pesquisarUsuario', { nome: this.$route.params.username, perfil: true })
    },
    acaoBotao(acao){
      if (!this.logado) {
        this.$store.dispatch('snackbar/mostrarNotificacao', { mensagem: "Faça login para executar essa ação" })
        return
      }
      this.$store.dispatch('global/acaoUsuario', { id_usuario: this.usuario.id, acao: acao })
      this.defineAcao(acao)
    },
    defineAcao(acao) {
      if (acao == 'DESFAZER_AMIZADE' || acao == 'AMIZADE') {
        this.usuario.amigo = !this.usuario.amigo
        if (acao == 'AMIZADE') {
          this.usuario.amigos++
        } else {
          this.usuario.amigos--
        }
      }
    },
    formataData(dataNascimento) {
      if (dataNascimento) {
        return dataNascimento.split('-').reverse().join('/')
      } else {
        return ''
      }
    }
  },
  computed: {
    usuario() {
      return this.$store.getters["global/getUsuario"]
    },
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
    dadosUsuario() {
      return this.$store.getters["logado/getDadosUsuario"]
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

</style>