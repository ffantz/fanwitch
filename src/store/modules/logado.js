import axios from 'axios'

const state = () => ({
  loading: false,
  logado: false,
  status: '',
  token: '',
  error: {
    error: '',
    message: ''
  },
  dadosUsuario: {},
})

// getters
const getters = {
  getLogado: (state) => {
    return state.logado
  },
  getLoading: (state) => {
    return state.loading
  },
  getDadosUsuario: (state) => {
    return state.dadosUsuario
  },
}

// actions
const actions = {
  login: ({ commit, dispatch, rootGetters }, user) => {
    let urlApi = rootGetters['global/getUrlApi']
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      axios({ url: urlApi + '/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.access_token
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = "Bearer " + token
          commit('auth_success', { token: token })
          dispatch('dadosUsuario')
          resolve()
          return resp
        }).catch(err => {
          commit('auth_error')
          commit('define_error', { error: true, message: err.response.data.message })
          dispatch('snackbar/mostrarNotificacao', { mensagem: err.response.data.message }, { root: true })
          localStorage.removeItem('token')
          reject(err)
        })
        .then(() => {
          commit('setLoading', false)
        })
    })
  },
  dadosUsuario: ({ commit, dispatch, rootGetters }) => {
    let urlApi = rootGetters['global/getUrlApi']
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      axios({ url: urlApi + '/dados-usuario', method: 'GET' })
        .then(resp => {
          commit('setDadosUsuario', resp.data.data)
          resolve(resp.data.data)
          return resp
        }).catch(err => {
          commit('auth_error')
          commit('define_error', { error: true, message: err.response.data.message })
          dispatch('snackbar/mostrarNotificacao', { mensagem: err.response.data.message }, { root: true })
          reject(err)
        })
        .then(() => {
          commit('setLoading', false)
        })
    })
  },
  configurarToken: () => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.token
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('logout')
      commit('define_error', { error: false, message: "" })

      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      commit('logout_success')
      resolve()
    })
  },
  setLogado({ commit }, value) {
    commit('setLogado', value)
  },
}

// mutations
const mutations = {
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state, object) {
    state.status = 'success'
    state.token = object.token
    state.error.error = false
    state.error.message = ""
    state.logado = true
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = 'loading'
    state.token = ''
    state.logado = false
  },
  logout_success(state) {
    state.status = ''
  },
  define_error(state, object) {
    state.error.error = object.error
    state.error.message = object.message
  },
  setLogado(state, value) {
    state.logado = value
  },
  setLoading(state, value) {
    state.loading = value
  },
  setDadosUsuario(state, value) {
    state.dadosUsuario = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}