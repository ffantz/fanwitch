<template>
  <v-card
    class="mx-auto"
    max-width="344"
    title="User Registration"
  >
    <v-container>
      <v-text-field
        v-model="first"
        color="primary"
        label="First name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="last"
        color="primary"
        label="Last name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="I agree to site terms and conditions"
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: [ 'dialog', ],
  data: () => ({
    email: '',
    username: '',
    password: '',
    regras: {
      obrigatorio: value => !!value || 'O campo é obrigatório',
    },
  }),
  methods: {
    cadastrar(event) {
      event.preventDefault()
      this.$store.dispatch('logado/cadastrar', { email: this.email, username: this.username, password: this.password })
    },
    fechar(val) {
      if (val) {
        this.dialogCadastro = false
      }
    }
  },
  computed: {
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
    dialogCadastro: {
      get () {
        return this.dialog
      },
      set (event) {
        this.username = ''
        this.password = ''
        this.email = ''
        this.$emit('update:dialog', event)
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