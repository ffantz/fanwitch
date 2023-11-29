<template>
  <v-container class="ma-0 h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <h1 class="mb-4">Ajuda & Suporte - Fanwitch</h1>

        <!-- Perguntas Frequentes -->
        <v-divider class="mb-4"></v-divider>
        <h2 class="mb-2">Perguntas Frequentes</h2>
        <v-list>
          <v-list-item v-for="(pergunta, index) in perguntas" :key="index" class="mb-2">
            <v-list-item-title>{{ pergunta.pergunta }}</v-list-item-title>
            <v-list-item-subtitle>{{ pergunta.resposta }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
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

</template>

<script>

export default {
  props: [],
  data: () => ({
    perguntas: [
      {
        pergunta: "1. Como posso criar uma conta no Fanwitch?",
        resposta: "Para criar uma conta, clique no botão \"Cadastre-se\" na página inicial e siga as instruções fornecidas."
      },
      {
        pergunta: "2. Como faço para transmitir meu conteúdo?",
        resposta: "Após fazer login, vá para a página de transmissão, configure as opções desejadas e clique em \"Iniciar Transmissão\"."
      },
      {
        pergunta: "3. É possível personalizar o layout da minha página?",
        resposta: "Sim, você pode personalizar o layout da sua página de transmissão usando as opções disponíveis no painel de controle."
      },
    ]
  }),
  computed: {
  },
  methods: {
    goTo(rota) {
      this.$router.push(rota)
    },
  }
}
</script>

<style scoped>
.footer{
  height: auto;
  min-height: 40px;
  max-height: 50px !important;
}

.link{
  text-decoration: underline;
  color: blue;
}

a:hover {
  cursor: pointer;
}

</style>
