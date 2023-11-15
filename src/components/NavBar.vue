<template>
  <v-app-bar class="navbar">
    <v-app-bar-nav-icon @click.stop="toggleDrawer" v-show="!drawer"></v-app-bar-nav-icon>

    <v-toolbar-title> Painel </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field
      :loading="loading"
      density="compact"
      variant="outlined"
      label="Pesquisa"
      prepend-inner-icon="mdi-magnify"
      single-line
      hide-details
      v-model="barraPesquisa"
    ></v-text-field>

    <v-spacer></v-spacer>

    <!-- Perfil -->
    <section class="mr-4">
      <div v-if="logado">

        <!-- Notificações -->
        <v-menu
        bottom
        offset-y
        :close-on-content-click="false"
        :nudge-width="160"
        >
        <!-- BTN toogle -->
        <template v-slot:activator="{ on }">
          <v-btn
            v-show="true"
            icon
            v-on="on"
          >
            <v-badge
              :class="'badge-navbar' + (notificacoes && notificacoes.length > 0 ? 'badge-navbar-10' : '')"
              color="red"
              :content="notificacoes && notificacoes.length > 0 ? notificacoes.length : '0'"
              overlap
            >
              <v-icon medium>mdi-bell
              </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list
          class="toolbarBtnBox"
          style="min-width: 400px;"
          v-if="notificacoes && notificacoes.length > 0"
        >
          <!-- <NotificationsNavigator /> -->
        </v-list>
        </v-menu>
        <v-btn size="medium" @click="logout" icon="mdi-logout"></v-btn>
      </div>
      <div v-else>
        <v-btn variant="outlined" @click="dialog = true">Login</v-btn>
      </div>
    </section>

    <DialogLogin v-model:dialog="dialog"/>
    <Snackbar />

  </v-app-bar>
</template>

<script>
import DialogLogin from '@/components/DialogLogin.vue'
import Snackbar from '@/components/Snackbar.vue'

export default {
  components: {
    DialogLogin: DialogLogin,
    Snackbar: Snackbar,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    logout(){
      this.$store.dispatch("logado/logout")
    },
    toggleDrawer() {
      this.$store.dispatch("sideBar/toggleDrawer")
    },
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.getters['snackbar/getSnackbar']
      },
      set(value) {
        this.$store.dispatch('snackbar/setSnackbar',value)
      }
    },
    mensagem: {
      get() {
        return this.$store.getters['snackbar/getMensagem']
      },
      set(value) {
        this.$store.dispatch('snackbar/setMensagem',value)
      }
    },
    drawer() {
      return this.$store.getters["sideBar/getDrawer"]
    },
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
    loading() {
      return this.$store.getters["gloabl/getLoading"]
    },
    notificacoes() {
      return this.$store.getters["logado/getDadosUsuario"].notificacoes
    },
    barraPesquisa: {
      get () {
        return this.$store.getters["global/getBarraPesquisa"]
      },
      set (value) {
        this.$store.dispatch('global/setBarraPesquisa', value)
      }
    },
  }
}
</script>

<style scoped lang="scss">

.toolbarBtnBox {
  width: 320px;
  position: relative;
  padding: 5px;
  background: #fff !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  border-radius: 8px !important;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15) !important;
}

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