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
    usuariosPesquisa: [],
    canaisPesquisa: [],
    canal: [],
    usuario: [],
    minhasRecomendacoes: [],
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
    setUsuariosPesquisa: (state, value) => state.usuariosPesquisa = value,
    setCanaisPesquisa: (state, value) => state.canaisPesquisa = value,
    setCanal: (state, value) => state.canal = value,
    setUsuario: (state, value) => state.usuario = value,
    setMinhasRecomendacoes: (state, value) => state.minhasRecomendacoes = value,
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
            if (err.response.data.message == "Unauthenticated.") {
              localStorage.removeItem('token')
              delete axios.defaults.headers.common['Authorization']
              dispatchEvent('logado/logout', {}, { root: true })
            }
            reject(err)
          }).then(() => {
            commit('setLoading', false)
          })
      })
    },
    acaoCanal: ({ commit }, data) => {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios({ url: '/acao-canal', method: 'POST', data: data })
          .then(() => {
            resolve()
          }).catch(err => {
            reject(err)
          }).then(() => {
            commit('setLoading', false)
          })
      })
    },
    acaoUsuario: ({ commit }, data) => {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        let url = data.acao == 'AMIZADE' ? 'solicitacao-amizade' : 'remover-amizade'
        axios({ url: url, method: 'POST', data: { id_usuario: data.id_usuario } })
          .then(() => {
            resolve()
          }).catch(err => {
            reject(err)
          }).then(() => {
            commit('setLoading', false)
          })
      })
    },
    pesquisarCanal: ({ commit, rootGetters, state }, data) => {
      commit('setLoading', true)
      let url = rootGetters['logado/getLogado'] ? '/pesquisa-canal' : '/pesquisar-canal'
      return new Promise((resolve, reject) => {
        axios({ url: url, method: 'POST', data: { nome: (data.nome ? data.nome : state.barraPesquisa) } })
          .then(resp => {
            let response = resp.data.data
            if (data.perfil) {
              commit('setCanal', response.length > 0 ? response[0] : false)
            } else {
              commit('setCanaisPesquisa', response)
            }
            resolve()
          }).catch(err => {
            reject(err)
          }).then(() => {
            commit('setLoading', false)
          })
      })
    },
    pesquisarUsuario: ({ commit, rootGetters, state }, data) => {
      commit('setLoading', true)
      let url = rootGetters['logado/getLogado'] ? '/pesquisa-usuario' : '/pesquisar-usuario'
      return new Promise((resolve, reject) => {
        axios({ url: url, method: 'POST', data: { nome: (data.nome ? data.nome : state.barraPesquisa) } })
          .then(resp => {
            let response = resp.data.data
            if (data.perfil) {
              commit('setUsuario', response.length > 0 ? response[0] : false)
            } else {
              commit('setUsuariosPesquisa', response)
            }
            resolve()
          }).catch(err => {
            reject(err)
          }).then(() => {
            commit('setLoading', false)
          })
      })
    },
    dadosCanal: ({ commit }, data) => {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios({ url: '/dados-canal', method: 'POST', data: data })
          .then(resp => {
            let usuarios = resp.data.data
            commit('setUsuariosPesquisa', usuarios)
            resolve()
          }).catch(err => {
            reject(err)
          }).then(() => {
            commit('setLoading', false)
          })
      })
    },
    dadosUsuario: ({ commit }, data) => {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios({ url: '/dados-usuario', method: 'POST', data: data })
          .then(resp => {
            let usuarios = resp.data.data
            commit('setUsuariosPesquisa', usuarios)
            resolve()
          }).catch(err => {
            if (err.response.data.message == "Unauthenticated.") {
              localStorage.removeItem('token')
              delete axios.defaults.headers.common['Authorization']
              dispatchEvent('logado/logout', {}, { root: true })
            }
            reject(err)
          }).then(() => {
            commit('setLoading', false)
          })
      })
    },
    buscaCanaisRecomendados: ({ commit }) => {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios({ url: '/busca-canais-recomendados', method: 'GET' })
          .then(resp => {
            commit('setMinhasRecomendacoes', resp.data.data)
            resolve()
          }).catch(err => {
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
    getUsuariosPesquisa: state => state.usuariosPesquisa,
    getCanaisPesquisa: state => state.canaisPesquisa,
    getCanal: state => state.canal,
    getUsuario: state => state.usuario,
    getMinhasRecomendacoes: state => state.minhasRecomendacoes,
  }
}