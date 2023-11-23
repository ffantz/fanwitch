<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <SideBar />

      <NavBar />

      <v-main class="d-flex align-center justify-center w-100" style="min-height: 300px;">
        <v-container class="h-100 container">
          <router-view />
        </v-container>
      </v-main>

      <Snackbar />
    </v-layout>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue'
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    Snackbar,
    SideBar,
    NavBar,
  },
  created() {
    if (localStorage.token !== undefined) {
      this.$store.dispatch('logado/setLogado', true)
      this.$store.dispatch('logado/dadosUsuario')
    }
    this.$store.dispatch('global/initialize')
  }
}
</script>

<style scoped lang="scss">

.container{
  max-width: 100% !important;
}
</style>
