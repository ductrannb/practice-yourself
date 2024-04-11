export default {
    data() {
        return {}
    },
    methods: {
        formatNumber(number) {
            return number.toLocaleString() || 0
        },
        changePageTitle(title = 'Practice Yourself') {
            document.title = title
        }
    }
}