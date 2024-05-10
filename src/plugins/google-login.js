import GAuth from 'vue3-google-oauth2'

const gAuthOptions = {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    prompt: 'consent',
    plugin_name: 'Practice Yourself'
}


export default {
    GAuth,
    gAuthOptions
}