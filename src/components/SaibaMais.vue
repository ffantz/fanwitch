<template>
  <v-container class="ma-0 h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <h1 class="mb-4">Saiba Mais - Fanwitch</h1>

        <!-- Principais Conceitos -->
        <v-divider class="mb-4"></v-divider>
        <h2 class="mb-2">Principais Conceitos</h2>
        <v-list>
          <v-list-item v-for="(conceito, index) in conceitos" :key="index" class="mb-2">
            <v-list-item-title>{{ conceito.titulo }}</v-list-item-title>
            <v-list-item-subtitle>{{ conceito.descricao }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- Rodapé -->
    <v-footer class="mt-auto footer">
      <v-row align="center" justify="center">
        <v-col>
          <p class="mb-0">
            Visite nossa página <a href="/saiba-mais">Saiba Mais</a> para obter informações adicionais sobre o Fanwitch.
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
    ]
  }),
  computed: {
  }
}
</script>

<style scoped>
.footer{
  height: auto;
  min-height: 40px;
  max-height: 50px !important;
}
</style>
