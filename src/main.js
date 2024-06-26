import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixin from '@/Utils/mixin.js'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
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

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'

window.axios = axios
const app = createApp(App)

app.config.globalProperties.$filter = {
    formatNumber(number) {
        if (!number) {
            return 0
        }
        return number.toLocaleString() || 0
    },
    formatDatetime(datetime) {
        return moment(datetime).format('DD/MM/YYYY HH:mm')
    },
    formatMoney(number) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
    },
    formatNumberChart(number) {
        if (!number || typeof number == "string" || isNaN(number) || isNaN(parseFloat(number))) {
            return 0
        }
        if (number >= 1e9) {
            return (number / 1e9).toFixed(1) + 'B'
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M'
        } else if (number >= 0.9e3) {
            return (number / 1e3).toFixed(1) + 'K'
        } else {
            return number.toString()
        }
    }
}
app.config.globalProperties.$axios = axios
app.config.globalProperties.$bus = bus
app.use(router).use(vuetify).use(vuex).use(CKEditor)
    .use(googleLogin.GAuth, googleLogin.gAuthOptions)
    .use(Sweetalert.VueSweetalert2, Sweetalert.options)
    .use(CoreuiVue)
app.provide('icons', icons)
app.component('InputValidation', InputValidation)
    .component('Form', Form)
    .component('Field', Field)
    .component('VueCountdown', VueCountdown)
    .component('CustomCkeditor', CustomCkeditor)
    .component('CIcon', CIcon)
app.mixin(mixin)
app.mount('#app')
