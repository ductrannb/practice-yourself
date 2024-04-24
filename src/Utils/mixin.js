import store from "@/plugins/vuex.js";

export default {
    data() {
        return {}
    },
    methods: {
        changePageTitle(title = 'Practice Yourself') {
            document.title = title
        },
        noticeSuccess(message, title = 'Thông báo') {
            this.$swal(title, message, 'success')
        },
        noticeError(message, title = 'Oops') {
            this.$swal(title, message, 'error')
        },
        async deleteConfirm(message = 'Sau khi xóa sẽ không thể hoàn tác.', title = 'Bạn có chắc chắn?') {
            this.$swal({
                title: title,
                text: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                console.log(result)
            })
        },
        async confirm(message, title) {
            this.$swal({
                title: title,
                text: message,
                icon: 'info',
                showCancelButton: true,
            }).then((result) => {
                console.log(result)
            })
        },
        checkAuth() {
            if (localStorage.getItem('access_token') && store.state.userAuth == null) {
                axios.get('me')
                    .then(response => {
                        console.log(response.data.data)
                        store.state.userAuth = response.data.data
                    })
                    .catch(error => {
                        localStorage.removeItem('access_token')
                        console.log(error)
                    })
            }
        }
    }
}