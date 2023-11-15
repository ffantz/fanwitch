import { createStore } from 'vuex'

import global from './modules/global'
import sideBar from './modules/sideBar'
import logado from './modules/logado'
import snackbar from './modules/snackbar'

export default createStore({
  modules: {
    global,
    sideBar,
    logado,
    snackbar,
  },
})