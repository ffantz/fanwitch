<template>
  <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
    <v-container class="h-100">
      <v-row class="h-100">
        <v-col md="8" class="h-100 sidebar-menu">
          <Banner />

          <Canais class="mt-auto" />
        </v-col>
        <v-col md="4">
          <div class="h-100 w-100" style="background-color: #e5c8d6;"></div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Banner from '@/components/Banner.vue'
import Canais from '@/components/Canais.vue'

export default {
  components: {
    Banner,
    Canais,
  },
  data: () => ({
  })
}
</script>

<style scoped lang="scss">

.sidebar-menu {
  font-size: 1.15em;
  display: flex;
  flex-direction: column;
}
</style>