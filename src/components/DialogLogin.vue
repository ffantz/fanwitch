<template>
    <v-dialog
      v-model="dialogLoginInterno"
      :max-width="'400px'"
      :max-height="'600px'"
    >
    <v-card>
      <v-form @submit="login">
        <v-img
          src="@/assets/logo.png"
          height="50px"
          class="mt-4"
        ></v-img>

        <v-card-text>
          <v-text-field
            variant="outlined"
            :rules="[regras.obrigatorio]"
            label="Usuario ou email"
            prepend-inner-icon="mdi-account"
            v-model="username"
            clearable
            @keyup.enter="login"
          ></v-text-field>
          <v-text-field

            class="mt-2"
            variant="outlined"
            :rules="[regras.obrigatorio]"
            label="Senha"
            prepend-inner-icon="mdi-lock"
            type="password"
            clearable
            v-model="password"
            @keyup.enter="login"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="pl-0 pr-0 justify-center align-center">
          <v-btn @click="login" large color="primary">Entrar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: [ 'dialogLogin', ],
  data: () => ({
    username: '',
    password: '',
    regras: {
      obrigatorio: value => !!value || 'O campo é obrigatório',
    },
  }),
  methods: {
    login(event) {
      event.preventDefault()
      this.$store.dispatch('logado/login', { username: this.username, password: this.password })
    },
    fechar(val) {
      if (val) {
        this.dialogLoginInterno = false
      }
    }
  },
  computed: {
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
    dialogLoginInterno: {
      get () {
        return this.$store.getters["global/getDialogLogin"]
      },
      set (value) {
        this.username = ''
        this.password = ''
        this.$store.dispatch('global/setDialogLogin', value)
      }
    },
  },
  watch: {
    logado (val) {
      this.fechar(val)
    },
  }
}
</script>

<style scoped>

.fanwitch {
  text-transform: uppercase;
  text-align: justify;
  color: #e5c8d6;
  font-size: 1.1em;
}
</style>