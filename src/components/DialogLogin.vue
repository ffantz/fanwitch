<template>
  <v-dialog
  v-model="dialogLogin"
  :persistent="true"
  :max-width="'400px'"
  >
  <v-card>
    Teste
    <v-btn variant="outlined" @click="dialogLogin = false">Fechar</v-btn>
  </v-card>
  </v-dialog>
</template>

<script>

export default {
  propos: {
    dialog: Boolean
  },
  data() {
  },
  computed: {
    dialogLogin: {
      get () {
        return this.dialog
      },
      set (event) {
        this.$emit('update:dialog', event)
      }
    },
  }
}
</script>

