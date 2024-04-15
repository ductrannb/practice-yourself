import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixin from '@/Utils/mixin.js'
import axios from '@/plugins/axios.js'
import vuetify from '@/plugins/vuetify.js'
import './assets/main.css'
import vuex from '@/plugins/vuex.js'
import googleLogin from "@/plugins/google-login.js"
import InputValidation from '@/components/InputValidation.vue'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { Field, Form } from 'vee-validate'
import '@/plugins/vee-validate.js'


window.axios = axios

const app = createApp(App)

app.config.globalProperties.$filter = {
    formatNumber(number) {
        return number.toLocaleString() || 0
    }
}
app.use(router).use(vuetify).use(vuex).use(googleLogin.vue3GoogleLogin, googleLogin.options)
app.component('InputValidation', InputValidation)
    .component('Form', Form)
    .component('Field', Field)
    .component('VueCountdown', VueCountdown)
app.mixin(mixin)
app.mount('#app')
