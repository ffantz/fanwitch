import axios from 'axios';

export default {
  install: (app) => {
    // Configuração global do Axios
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL_API

    // Adicione o Axios ao contexto do aplicativo Vue
    app.config.globalProperties.$http = axios

    if (localStorage.getItem('token') !== undefined) {
      app.config.globalProperties.$http.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    }
  },
};

