<template>
  <v-main class="d-flex align-center justify-center w-100" style="min-height: 300px;">
    <v-container class="h-100 container">
      <v-row class="h-100" v-if="canal !== undefined">
        <v-col sm="12" md="8" class="h-100">
          Resultado principal:
          <v-card
            class="mx-auto pa-2"
            max-width="90%"
            height="90%"
          >
            <v-img
              :src="'http://apifanwitch.local:81/storage/imagens/capa/' + canal[0].foto_capa"
              class="align-end"
              height="200px"
              cover
            >
              <v-card-title class="text-black" :v-text="canal[0].nome_canal"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else class="w-100">
        <span class="justify-center align-center">Não encontramos o canal solicitado, mas aqui estão outras sugestões:</span>
        <v-col
          v-for="(canal, index) in canais"
          :key="index + 'pesquisa'"
          :cols="index == 0 ? '12' : '6'"
        >
          <v-card
            class="mx-auto pa-2"
            max-width="90%"
            height="90%"
            v-if="index == 0"
          >
            <v-row>
              <v-col cols="4">
                <v-avatar size="x-large"  :image="'http://apifanwitch.local:81/storage/imagens/perfil/' + canal.foto_capa"></v-avatar>
              </v-col>
              <v-col cols="8">
                <b>{{ canal.nome_canal }}</b>
                <b>{{ canal.seguidores.lenght }}</b>
                <v-divider class="mt-auto"></v-divider>
                <v-card-actions class="div">
                  <v-btn @click="openPage(canal)" style="color: #e5c8d6;">
                    > Detalhes
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
          <v-card
            class="mx-auto pa-2"
            max-width="90%"
            height="90%"
            v-else
          >
            <v-row>
              <v-col cols="4">
                <v-avatar size="x-large"  :image="'http://apifanwitch.local:81/storage/imagens/perfil/' + canal.avatar"></v-avatar>
              </v-col>
              <v-col cols="8">
                <b>{{ canal.nome_canal }}</b>
                <b>{{ canal.seguidores.lenght }}</b>
                <v-divider class="mt-auto"></v-divider>
                <v-card-actions class="div">
                  <v-btn @click="openPage(canal)" style="color: #e5c8d6;">
                    > Detalhes
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
  }),
  computed: {
    canal(){
      let canais = this.$store.getters["global/getCanais"].filter((canal) => {
        return canal.nome_canal.toLowerCase().includes(this.barraPesquisa.toLowerCase()) || canal.username.toLowerCase().includes(this.barraPesquisa.toLowerCase())
      })
      return canais
    },
    canais() {
      return this.$store.getters["global/getCanais"]
    },
    barraPesquisa() {
      return this.$store.getters["global/getBarraPesquisa"]
    },
  }
}
</script>

<style scoped lang="scss">

</style>