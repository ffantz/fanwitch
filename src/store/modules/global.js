import axios from 'axios'

export default {
  namespaced: true,
  state: {
    dialogCadastro: false,
    dialogLogin: false,
    loading: false,
    barraPesquisa: '',
    botaoSelecionado: '',
    canais: [],
    canaisRecomendados: [],
    listaCanaisVoce: [],
    listaCanaisSeguindo: [],
    listaCanaisAlta: [],
  },
  mutations: {
    setDialogCadastro: (state, value) => state.dialogCadastro = value,
    setDialogLogin: (state, value) => state.dialogLogin = value,
    setLoading: (state, value) => state.loading = value,
    setBarraPesquisa: (state, value) => state.barraPesquisa = value,
    setBotaoSelecionado: (state, value) => { state.botaoSelecionado = value },
    setCanais: (state, value) => state.canais = value,
    setCanaisRecomendados: (state, value) => state.canaisRecomendados = value,
    setListaCanaisVoce: (state, value) => state.listaCanaisVoce = value,
    setListaCanaisSeguindo: (state, value) => state.listaCanaisSeguindo = value,
    setListaCanaisAlta: (state, value) => state.listaCanaisAlta = value,
  },
  actions: {
    setDialogCadastro: (context, value) => { context.commit('setDialogCadastro', value) },
    setDialogLogin: (context, value) => { context.commit('setDialogLogin', value) },
    setLoading: (context, value) => { context.commit('setLoading', value) },
    setBotaoSelecionado: (context, value) => { context.commit('setBotaoSelecionado', value) },
    setBarraPesquisa: (context, value) => {
      context.commit('setBarraPesquisa', value)
    },
    initialize: ({ commit, rootGetters }) => {
      commit('setLoading', true)
      let url = rootGetters['logado/getLogado'] ? '/initialize-usuario' : '/initialize'
      return new Promise((resolve, reject) => {
        axios({ url: url, method: 'get' })
          .then(resp => {
            let canais = resp.data.data
            commit('setCanais', canais)
            commit('setCanaisRecomendados', canais.sort((a, b) => { return b.recomendacoes - a.recomendacoes }).slice(0, 8))
            commit('setListaCanaisAlta', canais.sort((a, b) => { return b.seguidores - a.seguidores }).slice(0, 8))
            commit('setListaCanaisVoce', canais.sort(() => { Math.random() > 0.5 ? 1 : -1 }).slice(0, 8))
            commit('setListaCanaisSeguindo', canais.filter((canal) => { return canal.seguido }).slice(0, 8))
            commit('setBotaoSelecionado', 'alta')
            resolve()
          }).catch(err => {
            console.log(err)
            reject(err)
          }).then(() => {
            commit('setLoading', false)
          })
      })
    },
  },
  getters: {
    getDialogCadastro: state => state.dialogCadastro,
    getDialogLogin: state => state.dialogLogin,
    getLoading: state => state.loading,
    getBarraPesquisa: state => state.barraPesquisa,
    getBotaoSelecionado: state => state.botaoSelecionado,
    getCanais: state => state.canais,
    getCanaisRecomendados: state => state.canaisRecomendados,
    getListaCanaisVoce: state => state.listaCanaisVoce,
    getListaCanaisSeguindo: state => state.listaCanaisSeguindo,
    getListaCanaisAlta: state => state.listaCanaisAlta,
  }
}