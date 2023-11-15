<template>
  <div>
    <v-dialog
      v-model="dialogLogin"
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
        <!-- <v-card-title>
          Fanwitch
        </v-card-title> -->
        <v-card-text>
          <v-text-field
            density="compact"
            variant="outlined"
            label="Usuario ou email"
            prepend-inner-icon="mdi-account"
            single-line
            hide-details
            v-model="username"
          ></v-text-field>
          <v-text-field
            class="mt-2"
            density="compact"
            variant="outlined"
            label="Senha"
            prepend-inner-icon="mdi-lock"
            single-line
            hide-details
            type="password"
            v-model="password"
          ></v-text-field>
        </v-card-text>
          <v-card-actions class="pl-0 pr-0">
            <v-btn @click="login" block large color="primary">Entrar</v-btn>
          </v-card-actions>
        <!-- <v-btn variant="outlined" @click="cadastrar = true">Cadastre-se</v-btn> -->
      </v-form>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  props: [ 'dialog', ],
  data: () => ({
    username: '',
    password: '',
  }),
  methods: {
    login(event) {
      event.preventDefault()
      this.$store.dispatch('logado/login', { username: this.username, password: this.password })
    },
    fechar(val) {
      console.log(val)
      if (val) {
        this.dialogLogin = false
      }
    }
  },
  computed: {
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
    dialogLogin: {
      get () {
        return this.dialog
      },
      set (event) {
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