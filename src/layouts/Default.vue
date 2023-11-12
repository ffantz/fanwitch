<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <SideBar />

      <NavBar />

      <MainContent />
    </v-layout>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import MainContent from '@/components/Content.vue'

export default {
  components: {
    SideBar,
    NavBar,
    MainContent,
  },
  created() {
    this.$store.dispatch('global/initialize')
  }
}
</script>
