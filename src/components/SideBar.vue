<template>
  <v-navigation-drawer class="h-100" mobile-break-point="1360" v-model="drawer">
    <v-list class="h-100 sidebar-menu">
      <v-list-item
        class="text-left fanwitch"
        prepend-avatar="@/assets/logo.png"
      >
        Fanwitch
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item class="mb-4 text-left">
        <template v-slot:prepend>
          <v-icon color="primary">mdi-apps</v-icon>
        </template>
        Painel
      </v-list-item>

      <div v-if="logado">
        <v-list-item class="mb-4 text-wrap">
          <template v-slot:prepend>
          <v-icon color="gray">mdi-compass-outline</v-icon>
        </template>
          Minhas recomendações
        </v-list-item>

        <v-list-item class="mb-4 text-left">
          <template v-slot:prepend>
            <v-icon color="gray">mdi-email</v-icon>
          </template>
          Mensagem
        </v-list-item>
      </div>

      <v-list-item class="mb-4 text-left mt-auto">
        <template v-slot:prepend>
          <v-icon color="gray">mdi-cog</v-icon>
        </template>
        Configurações
      </v-list-item>

      <v-list-item class="text-left">
        <template v-slot:prepend>
          <v-icon color="gray">mdi-help-circle</v-icon>
        </template>
        Ajuda & Suporte
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    drawer: {
      get () {
        return this.$store.state.sideBar.drawer
      },
      set (value) {
        this.$store.dispatch('sideBar/setDrawer', value)
      }
    },
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
  }
};
</script>

<style scoped lang="scss">
.fanwitch {
  text-transform: uppercase;
  text-align: justify;
  color: #e5c8d6;
  font-size: 1.1em;
}

.sidebar-menu {
  font-size: 1.15em;
  display: flex;
  flex-direction: column;
}

.v-list-item {
  flex: 0;
  margin-bottom: 5px;
}

.v-navigation-drawer {
  overflow-y: hidden;
}
</style>
