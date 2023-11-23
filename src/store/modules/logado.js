import axios from 'axios'

const state = () => ({
  loading: false,
  loadingDadosUsuario: false,
  logado: false,
  status: '',
  token: '',
  error: {
    error: '',
    message: ''
  },
  dadosUsuario: {},
  notificacoes: [],
})

// getters
const getters = {
  getLogado: (state) => {
    return state.logado
  },
  getLoading: (state) => {
    return state.loading
  },
  getLoadingDadosUsuario: (state) => {
    return state.loadingDadosUsuario
  },
  getDadosUsuario: (state) => {
    return state.dadosUsuario
  },
  getNotificacoes: (state) => {
    return state.notificacoes
  },
}

// actions
const actions = {
  login: ({ commit, dispatch }, user) => {
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      axios({ url: '/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.access_token
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = "Bearer " + token
          commit('auth_success', { token: token })
          dispatch('dadosUsuario')
          dispatch('global/initialize', {}, { root: true })
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
  dadosUsuario: ({ commit, dispatch }) => {
    commit('setLoading', true)
    commit('setLoadingDadosUsuario', true)
    return new Promise((resolve, reject) => {
      axios({ url: '/dados-usuario', method: 'GET' })
        .then(resp => {
          commit('setDadosUsuario', resp.data.data)
          commit('setNotificacoes', resp.data.data.notificacoes)
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
          commit('setLoadingDadosUsuario', false)
        })
    })
  },
  atualizarInformacoes: ({ commit, dispatch }, data) => {
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      axios({ url: '/atualizar-informacoes', method: 'POST', data: data })
        .then(resp => {
          dispatch('dadosUsuario')
          dispatch('snackbar/mostrarNotificacao', { mensagem: resp.data.message }, { root: true })
          resolve(resp.data.data)
          return resp
        }).catch(err => {
          dispatch('snackbar/mostrarNotificacao', { mensagem: err.response.data.message }, { root: true })
          reject(err)
        })
        .then(() => {
          commit('setLoading', false)
        })
    })
  },
  cadastrar: ({ commit, dispatch }, data) => {
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      axios({ url: '/cadastrar', method: 'POST', data: data })
        .then(resp => {
          dispatch('login', data)
          dispatch('snackbar/mostrarNotificacao', { mensagem: resp.data.message }, { root: true })
          resolve(resp.data.data)
          return resp
        }).catch(err => {
          console.log(err.response.data.errors)
          let message = Object.keys(err.response.data.errors).map(element => {
            return err.response.data.errors[element].join('\n')
          }).join('\n')
          console.log(message)
          dispatch('snackbar/mostrarNotificacao', { mensagem: message }, { root: true })
          reject(err)
        })
        .then(() => {
          commit('setLoading', false)
        })
    })
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
  setLoadingDadosUsuario(state, value) {
    state.loadingDadosUsuario = value
  },
  setDadosUsuario(state, value) {
    state.dadosUsuario = value
  },
  setNotificacoes(state, value) {
    state.notificacoes = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}