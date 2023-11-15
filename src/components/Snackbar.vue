<template>
  <v-snackbar
    v-model="snackbar"
    color="primary"
    class="snackbar"
    elevation="8"
    timeout="5000"
  >
    <div class="texto">{{ mensagem }}</div>
    <template v-slot:actions>
      <v-btn
        color="black"
        variant="text"
        @click="this.snackbar = false"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {
  props: [],
  data: () => ({
    y: 'top',
    x: 'right',
  }),
  computed: {
    snackbar: {
      get() {
        return this.$store.getters['snackbar/getSnackbar']
      },
      set(value) {
        this.$store.dispatch('snackbar/setSnackbar',value)
      }
    },
    mensagem: {
      get() {
        return this.$store.getters['snackbar/getMensagem']
      },
      set(value) {
        this.$store.dispatch('snackbar/setMensagem',value)
      }
    },
  }
}
</script>

<style scoped>
.snackbar {
}
.texto {
  color: black;
}
</style>
