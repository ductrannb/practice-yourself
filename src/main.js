import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixin from "@/mixins/mixin.js"
import axios from "@/plugins/axios.js"
import vuetify from "@/plugins/vuetify.js"
import './assets/main.css'

window.axios = axios

const app = createApp(App)

app.use(router).use(vuetify)
app.mixin(mixin)
app.mount('#app')
