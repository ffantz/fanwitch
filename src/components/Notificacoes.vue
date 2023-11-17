<template>
  <v-menu
    bottom
    offset-y
    :close-on-content-click="false"
    >
    <!-- BTN toogle -->
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        v-bind="props"
      >
        <v-badge
          :class="'badge-navbar' + (notificacoes && notificacoes.length > 0 ? 'badge-navbar-10' : '')"
          color="red"
          :content="notificacoes && notificacoes.filter((notificacao) => { return notificacao.lida == '0' }).length > 0 ?
            notificacoes.filter((notificacao) => { return notificacao.lida == '0' }).length : '0'"
          overlap
        >
          <v-icon medium>mdi-bell
          </v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list
      v-if="notificacoes && notificacoes.length > 0"
      class="notificacoes pa-0"
    >
      <v-list-item
        v-for="(notificacao, index) in notificacoes"
        :key="index"
        :class="(notificacao.lida == '0' ? 'nao-lida' : '') + ' py-0'"
      >
          <v-list-item-title>{{ notificacao.titulo }} </v-list-item-title>
          <v-list-item-subtitle class="text-wrap">{{ notificacao.texto }} </v-list-item-subtitle>
          <v-list-item-action class="mt-2 mb-2" v-if="notificacao.lida == '0'">
            <v-spacer></v-spacer>
            <v-btn size="small" color="primary" @click="lerNotificacao(notificacao)">Não Lida</v-btn>
          </v-list-item-action>
        <v-divider v-if="index < notificacoes.length - 1" class="mt-2"></v-divider>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
  }),
  methods: {
    lerNotificacao(item) {
      this.$http({ url: '/notificacoes/' + item.uuid, data: { lida: '1' }, method: 'PUT' })
        .then(resp => {
          if(resp.data.data) {
            item.lida = '1'
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    notificacoes() {
      return this.$store.getters["logado/getNotificacoes"]
    },
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
.v-badge__badge {
  .badge-navbar-10 {
    text-indent: -5px !important;
  }
}

.badge-navbar .v-badge__badge {
  width: 20px !important;
  height: 20px !important;
  min-width: 20px !important;
}

.notificacoes{
  max-width: 450px;
  min-width: 400px;
}

.nao-lida {
  background-color: #ededed;
}
</style>