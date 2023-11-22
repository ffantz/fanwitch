<template>
  <v-container class="ma-0 h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <h1 class="mb-4">Configurações - Fanwitch</h1>

        <div v-if="!logado">
          <!-- Configurações de Conta -->
          <v-divider class="mb-4"></v-divider>
          <h2 class="mb-2">Configurações de Conta</h2>
          <v-form class="w-25">
            <v-text-field
              variant="outlined"
              :rules="[regras.obrigatorio]"
              label="Usuario"
              prepend-inner-icon="mdi-account"
              v-model="usernameCadastro"
              clearable
              @keyup.enter="cadastrar"
            ></v-text-field>

            <v-text-field
              variant="outlined"
              :rules="[regras.obrigatorio]"
              label="Email"
              prepend-inner-icon="mdi-email-outline"
              v-model="emailCadastro"
              clearable
              @keyup.enter="cadastrar"
            ></v-text-field>

            <v-text-field
              class="mt-2"
              variant="outlined"
              :rules="[regras.obrigatorio]"
              label="Senha"
              prepend-inner-icon="mdi-lock"
              type="password"
              v-model="passwordCadastro"
              clearable
              @keyup.enter="cadastrar"
            ></v-text-field>

            <v-btn @click="cadastrar" large color="primary">Cadastre-se</v-btn>
          </v-form>
        </div>

        <!-- Login -->
        <div v-if="!logado">
          <v-divider class="mt-6 mb-4"></v-divider>
          <h2 class="mb-2">Caso já possua cadastro, faça login</h2>
          <v-form class="w-25">
            <v-text-field
              variant="outlined"
              :rules="[regras.obrigatorio]"
              label="Usuario ou email"
              prepend-inner-icon="mdi-account"
              v-model="usernameLogin"
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
              v-model="passwordLogin"
              @keyup.enter="login"
            ></v-text-field>

            <v-btn color="primary" @click="fazerLogin">Login</v-btn>
          </v-form>
        </div>

        <!-- Configurações de Usuário -->
        <div v-if="logado">
          <v-divider class="mt-6 mb-4"></v-divider>
          <h2 class="mb-2">Configurações de usuário</h2>
          <v-form>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  variant="outlined"
                  label="Nome"
                  prepend-inner-icon="mdi-account"
                  v-model="nome"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-menu
                  ref="dateStartModal"
                  v-model="menuDataInicial.on"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      variant="outlined"
                      label="Data de nascimento"
                      prepend-inner-icon="mdi-calendar-account"
                      v-model="dataNascimento"
                      clearable
                    >
                      <template v-slot:append-inner-icon>
                        <v-icon v-bind="props">mdi-calendar-account</v-icon>
                      </template>
                    </v-text-field>
                  </template>

                  <v-date-picker
                    v-model="dataInicialModel"
                    no-title
                    scrollable
                    name="data_inicial"
                    locale="pt-br"
                    @input="menuDataInicial.on = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  class="mt-2"
                  variant="outlined"
                  label="Senha"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  class="mt-2"
                  variant="outlined"
                  :rules="password !== '' ? [regras.obrigatorio] : []"
                  label="Confirmar senha"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  v-model="passwordConfirm"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-btn color="primary" @click="atualizarInformacoes">Salvar alterações</v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>

    <!-- Rodapé -->
    <v-footer class="mt-auto footer">
      <v-row>
        <v-col>
          <p>
            Visite nossa página <a href="/saiba-mais">Saiba Mais</a> para obter informações adicionais sobre o Fanwitch.
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>

  <Snackbar />

</template>

<script>
import Snackbar from '@/components/Snackbar.vue'

export default {
  components: {
    Snackbar: Snackbar,
  },
  props: [],
  data: () => ({
    conceitos: [
      {
        titulo: 'Componentização',
        descricao: 'O Fanwitch é construído com base no conceito de componentização, onde diferentes partes da aplicação são encapsuladas em componentes reutilizáveis. Isso facilita a manutenção e escalabilidade do código.'
      },
      {
        titulo: 'Single-Page Application (SPA)',
        descricao: 'A Fanwitch é uma SPA, o que significa que a navegação entre as páginas ocorre sem a necessidade de recarregar a página inteira. Isso proporciona uma experiência mais rápida e suave para os usuários.'
      },
      {
        titulo: 'Responsividade',
        descricao: 'O design responsivo permite que o Fanwitch se adapte a diferentes tamanhos de tela, proporcionando uma experiência consistente em dispositivos variados, como desktops, tablets e smartphones.'
      },
    ],

    // Cadastro
    emailCadastro: '',
    usernameCadastro: '',
    passwordCadastro: '',

    // Login
    usernameLogin: '',
    passwordLogin: '',

    // Atualizar informações
    nome: '',
    dataNascimento: '',
    password: '',
    passwordConfirm: '',

    // Modal data
    dataInicialModel: '',
    menuDataInicial: { value: null, on: false },

    // Validações
    regras: {
      obrigatorio: value => !!value || 'O campo é obrigatório',
    },
  }),
  methods: {
    login(event) {
      event.preventDefault()
      this.$store.dispatch('logado/login', { username: this.usernameLogin, password: this.passwordLogin })
    },
    cadastrar(event) {
      event.preventDefault()
      this.$store.dispatch('logado/cadastrar', { email: this.emailCadastro, username: this.usernameCadastro,  password: this.passwordCadastro })
    },
    atualizarInformacoes(event) {
      event.preventDefault()
      if (this.password !== '' && this.passwordConfirm !== this.password) {
        this.$store.dispatch('snackbar/mostrarNotificacao', { mensagem: "As senhas não conferem" }, { root: true })
        return
      }
      this.$store.dispatch('logado/atualizarInformacoes', { nome: this.nome, data_nascimento: this.data_nascimento, password: this.password })
    },
    // filterDate() {
    //   let date = moment(value, originalFormat, true)
    //   if (date.isValid()) {
    //     return date.format('DD/MM/YYYY');
    //   }
    //   return value
    // }
  },
  computed: {
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
  },
  watch: {
    dataInicial: function (newValue) {
      // this.dataInicialModel = this.$options.filters.dateFormatBr(newValue, 'YYYY-MM-DD')
    },
  },
}
</script>

<style scoped>
.footer{
  height: auto;
  min-height: 40px;
  max-height: 50px !important;
}
</style>
