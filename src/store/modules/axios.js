import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://apifanwitch.local:81/api/',
  timeout: 1000,
});

export default instance