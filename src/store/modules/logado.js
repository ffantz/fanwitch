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
})

// getters
const getters = {
  getLogado: (state) => {
    return state.logado
  },
  getLoading: (state) => {
    return state.loading
  },
}

// actions
const actions = {
  login: ({ commit, dispatch, rootGetters }, user) => {
    let urlApi = rootGetters['global/getUrlApi']
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: urlApi + '/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.access_token
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = "Bearer " + token
          commit('auth_success', { token: token })
          commit('setLoading', false)
          // dispatch('getUserAccessData')
          //   .then(userAccessData => {
          //     commit('auth_success', { token: token })
          //     dispatch('updateUserAccessData', userAccessData)
          //     // router.push({ path: '/' })
          //     resolve(userAccessData)
          //   })
          return resp
        }).catch(err => {
          commit('auth_error')
          commit('define_error', { error: true, message: "CPF ou senha inválidos..." })
          localStorage.removeItem('token')
          reject(err)
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
}

// mutations
const mutations = {
  auth_request(state) {
    state.status = 'loading'
    state.logado = true
  },
  auth_success(state, object) {
    state.status = 'success'
    state.token = object.token
    state.error.error = false
    state.error.message = ""
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
  setLogin(state, value) {
    state.login = value
  },
  setLoading(state, value) {
    state.loading = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}