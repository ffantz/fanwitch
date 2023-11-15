<template>
  <p class="mt-2 header">Canais recomendados</p>
  <v-list
    class=""
    height="80vh"
    >
    <v-list-item
      v-for="(canal, index) in canais.sort(ordenarStatus)"
      :key="index"
    >
    <v-card width="75%">
        <v-row>
          <v-col cols="1">
            <v-avatar size="x-large"  :image="'http://apifanwitch.local:81/storage/imagens/perfil/' + canal.avatar"></v-avatar>
          </v-col>
          <v-col cols="11">
            <v-card-actions>
              <v-row>
                <v-col cols="9">
                  <v-card-text class="ml-2 py-0">{{ canal.nome_canal }}</v-card-text>
                  <v-card-text class="ml-2 py-0">
                    {{ canal.status == 1 ? 'Ao vivo' : 'Offline' }}
                    <span :class="(canal.status == 1 ? 'online' : 'offline') + ' ml-2'"></span>
                  </v-card-text>
                </v-col>
                <v-col cols="3">
                  <v-btn
                    @click="console.log('clicou')"
                    style="color: #e5c8d6;"
                    rounded
                  >
                    <v-icon
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      mdi-greater-than
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-divider></v-divider>
    </v-card>
  </v-list-item>
  </v-list>
</template>

<script>

export default {
  data: () => ({

  }),
  methods: {
    ordenarStatus (a, b) {
      if (a.status === b.status) {
        return b.recomendacoes - a.recomendacoes;
      } else {
        return b.status - a.status;
      }
    }
  },
  computed: {
    canais() {
      return this.$store.getters["global/getCanais"].filter((canal) => {
        return canal.recomendacoes > 0
      })
    },
  }
}
</script>

<style scoped lang="scss">
.header{
  font-size: 1em;
}
.offline {
  height: 10px;
  width: 10px;
  background-color: #ff4d4d;
  border-radius: 50%;
  display: inline-block;
}

.online {
  height: 10px;
  width: 10px;
  background-color: #8cff8c;
  border-radius: 50%;
  display: inline-block;
}
</style>