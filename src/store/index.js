import { createStore } from 'vuex'

import global from './modules/global'
import sideBar from './modules/sideBar'
import logado from './modules/logado'

export default createStore({
  modules: {
    global,
    sideBar,
    logado
  },
})