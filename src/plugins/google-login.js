import GAuth from 'vue3-google-oauth2'

const gAuthOptions = {
    clientId: '50395106962-na1ters0b2rgimgq95gnpsnnrpkev3v8.apps.googleusercontent.com',
    prompt: 'consent',
    plugin_name: 'Practice Yourself'
}


export default {
    GAuth,
    gAuthOptions
}