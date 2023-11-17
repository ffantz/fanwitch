import axios from 'axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    barraPesquisa: '',
    botaoSelecionado: 'alta',
    canais: [],
    canaisRecomendados: [],
    listaCanais: [],
    listaCanaisVoce: [],
    listaCanaisSeguindo: [],
    listaCanaisAlta: [],
  },
  mutations: {
    setLoading: (state, value) => state.loading = value,
    setBarraPesquisa: (state, value) => state.barraPesquisa = value,
    setBotaoSelecionado: (state, value) => {
      state.botaoSelecionado = value
      if (value == 'alta') {
        state.listaCanais = state.listaCanaisAlta
      } else if (value == 'voce') {
        state.listaCanais = state.listaCanaisVoce
      } else {
        state.listaCanais = state.listaCanaisSeguindo
      }
    },
    setCanais: (state, value) => state.canais = value,
    setCanaisRecomendados: (state, value) => state.canaisRecomendados = value,
    setListaCanaisVoce: (state, value) => state.listaCanaisVoce = value,
    setListaCanaisSeguindo: (state, value) => state.listaCanaisSeguindo = value,
    setListaCanaisAlta: (state, value) => state.listaCanaisAlta = value,
  },
  actions: {
    setLoading: (context, value) => { context.commit('setLoading', value) },
    setBotaoSelecionado: (context, value) => { context.commit('setBotaoSelecionado', value) },
    setBarraPesquisa: (context, value) => {
      context.commit('setBarraPesquisa', value)
    },
    initialize: ({ commit }) => {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios({ url: '/initialize', method: 'get' })
          .then(resp => {
            let canais = resp.data.data
            commit('setCanais', canais)
            commit('setCanaisRecomendados', canais.sort((a, b) => { return b.recomendacoes - a.recomendacoes }).slice(0, 10))
            commit('setListaCanaisAlta', canais.sort((a, b) => { return b.seguido - a.seguido }).slice(0, 10))
            commit('setListaCanaisVoce', canais.slice(0, 10))
            commit('setListaCanaisSeguindo', canais.sort((a, b) => { return b.seguido - a.seguido }).slice(20, 10))
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
    getUrlApi: state => state.urlApi,
    getLoading: state => state.loading,
    getBarraPesquisa: state => state.barraPesquisa,
    getBotaoSelecionado: state => state.botaoSelecionado,
    getCanais: state => state.canais,
    getCanaisRecomendados: state => state.canaisRecomendados,
    getListaCanais: state => state.listaCanais,
    getListaCanaisVoce: state => state.listaCanaisVoce,
    getListaCanaisSeguindo: state => state.listaCanaisSeguindo,
    getListaCanaisAlta: state => state.listaCanaisAlta,
  }
}