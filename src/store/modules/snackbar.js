export default {
  namespaced: true,
  state: {
    snackbar: null,
    mensagem: false,
  },
  mutations: {
    setSnackbar: (state, value) => state.snackbar = value,
    setMensagem: (state, value) => state.mensagem = value,
  },
  actions: {
    setSnackbar: (context, value) => { context.commit('setSnackbar', value) },
    setMensagem: (context, value) => { context.commit('setMensagem', value) },
    mostrarNotificacao: ({ commit }, dados) => {
      commit('setSnackbar', true)
      commit('setMensagem', dados.mensagem)
    },
  },
  getters: {
    getSnackbar: state => state.snackbar,
    getMensagem: state => state.mensagem,
  }
}