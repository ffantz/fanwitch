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
                  :class="'badge-navbar' + (listNotifications.length > 0 ? 'badge-navbar-10' : '')"
                  color="red"
                  :content="listNotifications.length > 0 ? listNotifications.length : '0'"
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
              v-if="listNotifications.length > 0"
            >
              <!-- <NotificationsNavigator /> -->
            </v-list>
          </v-menu>
        </div>
        <div v-else>
          <v-btn variant="outlined" @click="dialog = true">Login</v-btn>
        </div>
      </section>

      <DialogLogin dialog="dialog"></DialogLogin>

  </v-app-bar>
</template>

<script>
export default {
  components: {
    DialogLogin: () => import('@/components/DialogLogin.vue'),
  },
  data: () => ({
    dialog: false,
    listNotifications: [
      {
        titulo: 'teste notificacao 1',
        texto: 'essa é uma notificação',
        lida: 0,
      },
      {
        titulo: 'teste notificacao 2',
        texto: 'essa é uma notificação',
        lida: 0,
      },
      {
        titulo: 'teste notificacao 3',
        texto: 'essa é uma notificação',
        lida: 0,
      },
      {
        titulo: 'teste notificacao 4',
        texto: 'essa é uma notificação',
        lida: 0,
      },
      {
        titulo: 'teste notificacao 5',
        texto: 'essa é uma notificação',
        lida: 0,
      },
    ]
  }),
  methods: {
    logout(){
      this.$store.dispatch("logado/logout")
    },
    login(){
      this.$store.dispatch("logado/login", {
        username: 'ffantz',
        password: '123456'
      })
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
</style>