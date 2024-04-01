import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixin from "@/mixins/mixin.js"
import axios from "@/plugins/axios.js"
import vuetify from "@/plugins/vuetify.js"
import './assets/main.css'
import vuex from "@/plugins/vuex.js";

window.axios = axios

const app = createApp(App)

app.use(router).use(vuetify).use(vuex)
app.mixin(mixin)
app.mount('#app')
