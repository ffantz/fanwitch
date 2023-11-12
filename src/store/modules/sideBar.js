export default {
  namespaced: true,
  state: {
    drawer: null,
    toggleDrawer: false,
  },
  mutations: {
    toggleDrawer: (state) => state.drawer = !state.drawer,
    setDrawer: (state, value) => state.drawer = value,
  },
  actions: {
    toggleDrawer: (context) => { context.commit('toggleDrawer') },
    setDrawer: (context, value) => { context.commit('setDrawer', value) },
  },
  getters: {
    getDrawer: state => state.drawer,
  }
}