export default {
    data() {
        return {}
    },
    methods: {
        helloWorld() {
            console.log('Hello world from mixins !')
        },
        changePageTitle(title = 'Practice Yourself') {
            document.title = title
        }
    }
}