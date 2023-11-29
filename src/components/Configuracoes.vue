<template>
  <v-container class="ma-0 container d-flex flex-column">
    <v-row>
      <v-col>
        <h1 class="mb-4">Configurações - Fanwitch</h1>

        <div v-if="!logado">
          <!-- Configurações de Conta -->
          <v-divider class="mb-4"></v-divider>
          <h2 class="mb-2">Criar nova Conta</h2>
          <v-form class="">
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
          <v-form class="">
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

            <v-btn color="primary" @click="login">Login</v-btn>
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
                  v-model="dadosUsuario.nome"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  variant="outlined"
                  label="Data de nascimento"
                  prepend-inner-icon="mdi-calendar-account"
                  v-model="dadosUsuario.data_nascimento"
                  placeholder="dd/mm/aaaa"
                  clearable
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-textarea
                  variant="outlined"
                  label="Descrição"
                  prepend-inner-icon="mdi-image-text"
                  v-model="dadosUsuario.descricao"
                  clearable
                >
                </v-textarea>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-file-input
                  label="Avatar"
                  variant="outlined"
                  prepend-inner-icon="mdi-file-account-outline"
                  prepend-icon=""
                  show-size
                  accept="image/png, image/jpeg, image/bmp"
                  v-model="dadosUsuario.imagemAvatar"
                  @input="definirNovoAvatar"
                  @click:clear="limparCampo"
                  clearable
                >
                </v-file-input>
                <v-avatar v-if="dadosUsuario.imagemAvatar == null" size="x-large" :image="baseUrl + '/storage/imagens/perfil/'
                  + (dadosUsuario.avatar
                  ? dadosUsuario.avatar
                  : 'no_photo.png')"
                ></v-avatar>
                <v-avatar v-else size="x-large" :image="url"></v-avatar>
                <v-btn v-if="dadosUsuario.avatar !== null" class="ml-4" color="primary" variant="outlined" @click="removerFoto('usuario', dadosUsuario, 'avatar')">Remover foto</v-btn>
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

        <div v-if="logado">
          <v-divider class="mt-6 mb-4"></v-divider>
          <h2 class="mb-2">Configurações de canal</h2>
          <div>
            <v-btn color="primary" v-if="Object.keys(canal).length == 0 && !canalHabilitado" @click="canalHabilitado = !canalHabilitado">Habilitar canal</v-btn>
            <v-form v-if="Object.keys(canal).length > 0 || canalHabilitado">
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    variant="outlined"
                    label="Nome canal"
                    prepend-inner-icon="mdi-account"
                    v-model="canal.nome_canal"
                    clearable
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    variant="outlined"
                    label="Username canal"
                    prepend-inner-icon="mdi-account"
                    v-model="canal.username"
                    :disabled="canal.uuid !== undefined"
                    clearable
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-file-input
                    label="Avatar canal"
                    variant="outlined"
                    prepend-inner-icon="mdi-file-account-outline"
                    prepend-icon=""
                    show-size
                    accept="image/png, image/jpeg, image/bmp"
                    v-model="canal.imagemAvatar"
                    @input="definirNovoAvatarCanal"
                    @click:clear="limparCampoCanal"
                    clearable
                  >
                  </v-file-input>
                  <v-avatar v-if="canal.imagemAvatar == null" size="x-large" :image="baseUrl + '/storage/imagens/perfil/'
                    + (canal.avatar
                    ? canal.avatar
                    : 'no_photo.png')"
                  ></v-avatar>
                  <v-avatar v-else size="x-large" :image="urlCanal"></v-avatar>
                  <v-btn v-if="canal.avatar !== undefined && canal.avatar !== null" class="ml-4" color="primary" variant="outlined" @click="removerFoto('canal', canal, 'avatar')">Remover foto</v-btn>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-file-input
                    label="Capa canal"
                    variant="outlined"
                    prepend-inner-icon="mdi-file-account-outline"
                    prepend-icon=""
                    show-size
                    accept="image/png, image/jpeg, image/bmp"
                    v-model="canal.imagemCapa"
                    @input="definirNovaCapa"
                    @click:clear="limparCampoCapa"
                    clearable
                  >
                  </v-file-input>
                  <v-avatar v-if="canal.imagemCapa == null" size="x-large" :image="baseUrl + '/storage/imagens/capa/'
                    + (canal.foto_capa
                    ? canal.foto_capa
                    : 'no_photo.png')"
                  ></v-avatar>
                  <v-avatar v-else size="x-large" :image="urlCapa"></v-avatar>
                  <v-btn v-if="canal.foto_capa !== undefined && canal.foto_capa !== null" class="ml-4" color="primary" variant="outlined" @click="removerFoto('canal', canal, 'foto_capa')">Remover foto</v-btn>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-textarea
                    variant="outlined"
                    label="Descrição"
                    prepend-inner-icon="mdi-image-text"
                    v-model="canal.descricao"
                    clearable
                  >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-btn color="primary" @click="atualizarCanal">{{ canal.uuid == undefined ? 'Criar canal' : 'Atualizar dados do canal' }}</v-btn>
              <v-btn color="primary" class="ml-4" v-if="canal.uuid !== undefined" @click="deletarCanal(canal)">Deletar Canal</v-btn>
            </v-form>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Rodapé -->
    <v-footer class="mt-auto footer">
      <v-row>
        <v-col>
          <p>
            Visite nossa página <a class="link" @click="goTo('/saiba-mais')">Saiba Mais</a> para obter informações adicionais sobre o Fanwitch.
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>

  <v-dialog
    v-model="modalDeletar"
    max-width="400px"
    max-height="600px"
    persistent
  >
    <v-card>
      <div class="pa-2">
        <v-card-title class="text-wrap">
          Tem certeza que deseja deletar o canal?
        </v-card-title>
        <v-card-text>
          Essa ação não poderá ser desfeita.
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="deletarCanal(canal, true)" color="error">Deletar</v-btn>
          <v-btn @click="modalDeletar = !modalDeletar" color="primary">Cancelar</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  components: {
  },
  props: [],
  data: () => ({
    baseUrl: import.meta.env.VITE_BASE_URL,
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
    password: '',
    passwordConfirm: '',

    // Modal data
    dataInicialModel: '',
    menuDataInicial: { value: null, on: false },

    canalHabilitado: false,

    url: null,
    urlCanal: null,
    urlCapa: null,

    modalDeletar: false,

    // Validações
    regras: {
      obrigatorio: value => !!value || 'O campo é obrigatório',
    },
  }),
  methods: {
    goTo(rota) {
      this.$router.push(rota)
    },
    login(event) {
      event.preventDefault()
      this.$store.dispatch('logado/login', { username: this.usernameLogin, password: this.passwordLogin })
      this.usernameLogin = ''
      this.passwordLogin = ''
    },
    cadastrar(event) {
      event.preventDefault()
      this.$store.dispatch('logado/cadastrar', { email: this.emailCadastro, username: this.usernameCadastro,  password: this.passwordCadastro })
      this.emailCadastro = ''
      this.usernameCadastro = ''
      this.passwordCadastro = ''
    },
    atualizarInformacoes(event) {
      event.preventDefault()
      console.log(event, this.dadosUsuario.imagemAvatar)
      const formData = new FormData()

      if (this.dadosUsuario.data_nascimento !== null) {
        let data_nascimento = this.dadosUsuario.data_nascimento.split('/').reverse().join('-')
        this.dadosUsuario.data_nascimento = data_nascimento
        formData.append('data_nascimento', this.dadosUsuario.data_nascimento)
      }

      if (this.dadosUsuario.nome !== null) {
        formData.append('nome', this.dadosUsuario.nome)
      }

      if (this.dadosUsuario.descricao !== null) {
        formData.append('descricao', this.dadosUsuario.descricao)
      }

      if (this.password !== ''){
        if (this.passwordConfirm !== this.password) {
          this.$store.dispatch('snackbar/mostrarNotificacao', { mensagem: "As senhas não conferem" })
          return
        } else {
          this.dadosUsuario.password = this.password
          formData.append('password', this.dadosUsuario.password)
        }
      }

      if (this.dadosUsuario.imagemAvatar !== null && this.url !== null && this.dadosUsuario.imagemAvatar.length > 0) {
        formData.append('imagem_avatar', this.dadosUsuario.imagemAvatar[0])
      }

      this.$store.dispatch('logado/atualizarInformacoes', formData)
      this.password = ''
      this.passwordConfirm = ''
    },
    atualizarCanal(event){
      event.preventDefault()
      const formData = new FormData()
      formData.append('nome_canal', this.canal.nome_canal)
      formData.append('username', this.canal.username)
      formData.append('descricao', this.canal.descricao)

      if (this.canal.imagemAvatar !== null && this.urlCanal !== null && this.canal.imagemAvatar.length > 0) {
        formData.append('imagem_avatar', this.canal.imagemAvatar[0])
      }

      if (this.canal.imagemCapa !== null && this.urlCapa !== null && this.canal.imagemCapa.length > 0) {
        formData.append('imagem_capa', this.canal.imagemCapa[0])
      }

      if (this.canal.uuid !== undefined) {
        formData.append('uuid', this.canal.uuid)
        formData.append('_method', 'PUT')
      }

      this.$store.dispatch('logado/atualizarCanal', formData)
    },
    definirNovoAvatar(event) {
      let file = event.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    definirNovoAvatarCanal(event) {
      let file = event.target.files[0];
      this.urlCanal = URL.createObjectURL(file);
    },
    definirNovaCapa(event) {
      let file = event.target.files[0];
      this.urlCapa = URL.createObjectURL(file);
    },
    limparCampo(){
      this.url = null
      this.dadosUsuario.imagemAvatar = null
    },
    limparCampoCanal(){
      this.urlCanal = null
      this.canal.imagemAvatar = null
    },
    limparCampoCapa(){
      this.urlCapa = null
      this.canal.imagemCapa = null
    },
    removerFoto(tipo, canal, campo) {
      this.$store.dispatch('logado/deletarFoto', { tipo: tipo, uuid: canal.uuid, campo: campo })
    },
    deletarCanal(canal, confirmacao = false) {
      if (confirmacao) {
        this.$store.dispatch('logado/deletarCanal', canal)
      }

      this.modalDeletar = !this.modalDeletar
    },
  },
  computed: {
    logado() {
      return this.$store.getters["logado/getLogado"]
    },
    dadosUsuario: {
      get() {
        return this.$store.getters["logado/getDadosUsuario"]
      },
      set(value) {
        this.$store.dispatch('logado/setDadosUsuario', value)
      }
    },
    canal: {
      get() {
        return this.$store.getters["logado/getCanal"]
      },
      set(value) {
        this.$store.dispatch('logado/setCanal', value)
      }
    },
  },
  watch: {
  },
}
</script>

<style scoped>
.footer{
  height: auto;
  min-height: 40px;
  max-height: 50px !important;
}

.container{
  height: 90vh;
  overflow-y: auto;
}

.link{
  text-decoration: underline;
  color: blue;
}

a:hover {
  cursor: pointer;
}

</style>
