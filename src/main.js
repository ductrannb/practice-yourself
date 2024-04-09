import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixin from "@/Utils/mixin.js"
import axios from "@/plugins/axios.js"
import vuetify from "@/plugins/vuetify.js"
import './assets/main.css'
import vuex from "@/plugins/vuex.js"
import vue3GoogleLogin from 'vue3-google-login'

window.axios = axios

const app = createApp(App)

app.use(router).use(vuetify).use(vuex).use(vue3GoogleLogin, {
    clientId: '509066628056-3acdojkep730qt997b9q070m8q59a2ai.apps.googleusercontent.com'
})
app.mixin(mixin)
app.mount('#app')
