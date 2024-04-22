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
        }
    }
}