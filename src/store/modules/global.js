import axios from 'axios'

export default {
  namespaced: true,
  state: {
    urlApi: 'http://apifanwitch.local:81/api',
    loading: false,
    barraPesquisa: '',
    canais: [],
  },
  mutations: {
    setLoading: (state, value) => state.loading = value,
    setBarraPesquisa: (state, value) => state.barraPesquisa = value,
    setCanais: (state, value) => state.canais = value,
  },
  actions: {
    setLoading: (context, value) => { context.commit('setLoading', value) },
    setBarraPesquisa: (context, value) => {
      context.commit('setBarraPesquisa', value)
    },
    initialize: ({ commit, state }) => {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios({ url: state.urlApi + '/initialize', method: 'get' })
          .then(resp => {
            commit('setCanais', resp.data.data)
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
    getCanais: state => state.canais,
  }
}