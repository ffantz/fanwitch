<template>
  <v-row dense>
    <v-col cols="9" class="mx-auto">
      <v-btn-toggle
        v-model="toggle"
        @click="teste"
        class="justify-center"
      >
        <v-btn class="ml-4 mr-4" variant="outlined" rounded="xl">Para você</v-btn>
        <v-btn class="ml-4 mr-4" variant="outlined" rounded="xl">Seguindo</v-btn>
        <v-btn class="ml-4 mr-4" variant="outlined" rounded="xl">Em alta</v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
  <v-row>
    <v-col
        v-for="(canal, index) in canais"
        :key="index"
        sm="6"
        >
      <v-card
        :prepend-avatar="'http://apifanwitch.local:81/storage/imagens/perfil/' + canal.avatar"
        :title="canal.nome_canal"
        class="d-flex"
          variant="outlined"
      >
        <v-card-text class="pa-auto ma-auto">Ver detalhes</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data: () => ({
    toggle: null
  }),
  methods: {
    teste () {
      console.log(this.toggle)
    }
  },
  computed: {
    canais() {
      return this.$store.getters["global/getCanais"].slice(0, 4)
    },
  }
}
</script>

<style scoped lang="scss">

</style>