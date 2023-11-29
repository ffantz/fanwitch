<template>
  <v-card class="h-100 w-100">
    <h3 class="pa-2 mt-2">Usuários</h3>
    <v-row v-if="usuariosPesquisa.length > 0">
      <v-col>
        <span class="pa-2 mb-4 mt-4">Melhor correspondencia: </span>
        <v-row class="mt-2 mb-4">
          <v-col
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            cols="12"
            class="pa-0 mt-2"
          >
            <v-card class="mx-auto pa-2" max-width="90%">
              <v-row>
                <v-col cols="4">
                  <v-avatar size="x-large"
                    :image="baseUrl + '/storage/imagens/perfil/' + (usuariosPesquisa[0].avatar ? usuariosPesquisa[0].avatar : 'no_photo.png')"></v-avatar>
                </v-col>
                <v-col cols="8">
                  <b>{{ usuariosPesquisa[0].username }} {{ usuariosPesquisa[0].nome ? ' - ' + usuariosPesquisa[0].nome : '' }}</b>
                  <v-divider class="mt-auto"></v-divider>
                  <v-card-actions class="div">
                    <v-spacer></v-spacer>
                    <v-btn @click="openPage('usuario', usuariosPesquisa[0])" style="color: #e5c8d6;">
                      Detalhes
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <span class="pa-2 mt-4 mb-4">Outras sugestões:</span>
        <v-row class="mt-2 ma-0 mb-4">
          <v-col
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            cols="12"
            v-for="(usuario, index) in usuariosPesquisa.slice(1,2)" :key="'pesquisa-usuario' + index"
            class="pa-0 mt-2"
          >
            <v-card class="mx-auto pa-2" max-width="90%">
              <v-row>
                <v-col cols="4">
                  <v-avatar size="x-large"
                    :image="baseUrl + '/storage/imagens/perfil/' + (usuario.avatar ? usuario.avatar : 'no_photo.png')"></v-avatar>
                </v-col>
                <v-col cols="8">
                  <b>{{ usuario.username }} {{ usuario.nome ? ' - ' + usuario.nome : '' }}</b>
                  <v-divider class="mt-auto"></v-divider>
                  <v-card-actions class="div">
                    <v-spacer></v-spacer>
                    <v-btn @click="openPage('usuario', usuario)" style="color: #e5c8d6;">
                      Detalhes
                  </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else class="ma-0">
      <v-col>
        <span class="pa-2 mb-4">Nenhum usuário encontrado</span>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <h3 class="pa-2 mt-2">Canais</h3>
    <v-row v-if="canaisPesquisa.length > 0">
      <v-col>
        <span class="pa-2 mb-4 mt-4">Melhor correspondencia: </span>
        <v-row class="mt-2 mb-4">
          <v-col
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            cols="12"
            class="pa-0 mt-2"
          >
            <v-card class="mx-auto pa-2" max-width="90%">
              <v-row>
                <v-col cols="4">
                  <v-avatar size="x-large"
                    :image="baseUrl + '/storage/imagens/perfil/' + (canaisPesquisa[0].avatar ? canaisPesquisa[0].avatar : 'no_photo.png')"></v-avatar>
                </v-col>
                <v-col cols="8">
                  <b>{{ canaisPesquisa[0].username }} {{ canaisPesquisa[0].nome_canal ? ' - ' + canaisPesquisa[0].nome_canal : '' }}</b>
                  <v-divider class="mt-auto"></v-divider>
                  <v-card-actions class="div">
                    <v-spacer></v-spacer>
                    <v-btn @click="openPage('canal', canaisPesquisa[0])" style="color: #e5c8d6;">
                      Detalhes
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else class="ma-0">
      <v-col>
        <span class="pa-2 mb-4">Nenhum canal encontrado</span><br>
        <span class="pa-2 mb-4">Outras sugestões:</span>
        <v-row class="mt-2">
          <v-col
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            cols="12"
            v-for="(canal, index) in canais" :key="'pesquisa' + index"
            class="pa-0 mt-2 align-self-stretch"
          >
            <v-card class="mx-auto pa-2" max-width="90%">
              <v-row>
                <v-col cols="4">
                  <v-avatar size="x-large"
                    :image="baseUrl + '/storage/imagens/perfil/' + canal.avatar"></v-avatar>
                </v-col>
                <v-col cols="8">
                  <b>{{ canal.nome_canal }}</b>
                  <v-divider class="mt-auto"></v-divider>
                  <v-card-actions class="div">
                    <v-spacer></v-spacer>
                    <v-btn @click="openPage('canal', canal)" style="color: #e5c8d6;">
                      Detalhes
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    baseUrl: import.meta.env.VITE_BASE_URL
  }),
  methods: {
    openPage(rota, item) {
      this.$router.push({ path: '/' + rota + '/' + item.username })
    }
  },
  computed: {
    usuariosPesquisa() {
      return this.$store.getters["global/getUsuariosPesquisa"]
    },
    canaisPesquisa() {
      return this.$store.getters["global/getCanaisPesquisa"]
    },
    canais() {
      return this.$store.getters["global/getCanais"].slice(0, 4)
    },
    barraPesquisa() {
      return this.$store.getters["global/getBarraPesquisa"]
    },
  },
  watch: {
  },
  created() {
    if (this.barraPesquisa == '') {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">

</style>