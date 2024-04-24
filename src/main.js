import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixin from '@/Utils/mixin.js'
import axios from '@/plugins/axios.js'
import vuetify from '@/plugins/vuetify.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import './assets/main.css'
import vuex from '@/plugins/vuex.js'
import googleLogin from "@/plugins/google-login.js"
import InputValidation from '@/components/InputValidation.vue'
import CustomCkeditor from '@/components/CustomCkeditor.vue'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { Field, Form } from 'vee-validate'
import '@/plugins/vee-validate.js'
import moment from "moment"
import Sweetalert from "@/plugins/sweetalert.js"
import CKEditor from '@ckeditor/ckeditor5-vue'
import mitt from 'mitt';
const bus = mitt();

window.axios = axios
const app = createApp(App)

app.config.globalProperties.$filter = {
    formatNumber(number) {
        return number.toLocaleString() || 0
    },
    formatDatetime(datetime) {
        return moment(datetime).format('DD/MM/YYYY HH:mm')
    }
}
app.config.globalProperties.$axios = axios
app.config.globalProperties.$bus = bus
app.use(router).use(vuetify).use(vuex).use(CKEditor)
    .use(googleLogin.vue3GoogleLogin, googleLogin.options)
    .use(Sweetalert.VueSweetalert2, Sweetalert.options)
app.component('InputValidation', InputValidation)
    .component('Form', Form)
    .component('Field', Field)
    .component('VueCountdown', VueCountdown)
    .component('CustomCkeditor', CustomCkeditor)
app.mixin(mixin)
app.mount('#app')
