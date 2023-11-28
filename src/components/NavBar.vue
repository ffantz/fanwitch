<template>
  <v-app-bar class="navbar">
    <v-app-bar-nav-icon @click.stop="toggleDrawer" v-show="!drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-text-field
      :loading="loading"
      density="compact"
      variant="outlined"
      label="Pesquisa"
      prepend-inner-icon="mdi-magnify"
      single-line
      hide-details
      v-model="pesquisa"
      @keyup.enter="pesquisar"
    ></v-text-field>

    <v-spacer></v-spacer>

    <!-- Perfil -->
    <section class="mr-4">
      <div v-if="logado">

        <!-- Notificações -->
        <Notificacoes class="mr-2" />

        <!-- Notificações -->
        <v-btn size="medium" @click="logout" icon="mdi-logout"></v-btn>
      </div>
      <div v-else>
        <v-btn variant="outlined" @click="dialogLogin = true">Login</v-btn>
      </div>
    </section>

    <DialogLogin />

  </v-app-bar>
</template>

<script>
import DialogLogin from '@/components/DialogLogin.vue'
import Notificacoes from '@/components/Notificacoes.vue'

export default {
  components: {
    DialogLogin: DialogLogin,
    Notificacoes: Notificacoes,
  },
  data: () => ({
    dialog: false,
    pesquisa: '',
  }),
  methods: {
    pesquisar(){
      this.barraPesquisa = this.pesquisa
      this.$store.dispatch("global/pesquisarCanal", { nome: this.pesquisa })
      this.$store.dispatch("global/pesquisarUsuario", { nome: this.pesquisa })
      this.$router.push('/pesquisa')
    },
    logout(){
      this.$store.dispatch("logado/logout")
    },
    toggleDrawer() {
      this.$store.dispatch("sideBar/toggleDrawer")
    },
  },
  computed: {
    drawer() {
      return this.$store.getters["sideBar/getDrawer"]
    },
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
    loading() {
      return this.$store.getters["gloabl/getLoading"]
    },
    loadingDadosUsuario() {
      return this.$store.getters["logado/getLoadingDadosUsuario"]
    },
    barraPesquisa: {
      get () {
        return this.$store.getters["global/getBarraPesquisa"]
      },
      set (value) {
        this.$store.dispatch('global/setBarraPesquisa', value)
      }
    },
    dialogLogin: {
      get () {
        return this.$store.getters["global/getDialogLogin"]
      },
      set (value) {
        this.$store.dispatch('global/setDialogLogin', value)
      }
    },
  },
  watch: {
    pesquisa(val) {
      if (val == '')
        this.barraPesquisa = this.pesquisa
    }
  }
}
</script>

<style scoped lang="scss">
.navbar {
  overflow: hidden;
  overflow-y: hidden;
  height: 61px;
}

.v-badge__badge {
  .badge-navbar-10 {
    text-indent: -5px !important;
  }
}

.badge-navbar .v-badge__badge {
  width: 20px !important;
  height: 20px !important;
  min-width: 20px !important;
}
</style>