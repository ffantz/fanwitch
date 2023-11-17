/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import store from './store'
import axiosPlugin from './plugins/axios'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.use(store)
app.use(axiosPlugin);

registerPlugins(app)

app.mount('#app')
