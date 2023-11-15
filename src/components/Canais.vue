<template>
  <v-row dense>
    <v-col cols="9" class="mx-auto">
      <v-btn-toggle
        v-model="botaoSelecionado"
        @click="teste"
        class="justify-center"
      >
        <v-btn value="voce" class="ml-4 mr-4" variant="outlined" rounded="xl">Para você</v-btn>
        <v-btn value="seguindo" class="ml-4 mr-4" variant="outlined" rounded="xl">Seguindo</v-btn>
        <v-btn value="alta" class="ml-4 mr-4" variant="outlined" rounded="xl">Em alta</v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
  <v-row>
    <v-col
        v-for="(canal, index) in canais.slice(0,4)"
        :key="index"
        sm="6"
      >
      <v-card
        class="mx-auto pa-2"
        max-width="90%"
        height="90%"
      >
        <v-row>
          <v-col cols="4">
            <v-avatar size="x-large"  :image="'http://apifanwitch.local:81/storage/imagens/perfil/' + canal.avatar"></v-avatar>
          </v-col>
          <v-col cols="8">
            <b>{{ canal.nome_canal }}</b>
            <v-divider class="mt-auto"></v-divider>
            <v-card-actions>
              <v-btn @click="openPage(canal)" style="color: #e5c8d6;">
                > Detalhes
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data: () => ({
    botaoSelecionado: null
  }),
  methods: {
    teste () {
      console.log(this.botaoSelecionado)
    }
  },
  computed: {
    canais() {
      return this.$store.getters["global/getCanais"]
    },
  }
}
</script>

<style scoped lang="scss">

</style>