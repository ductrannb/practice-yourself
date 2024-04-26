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
            return await this.$swal({
                title: title,
                text: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
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
        async checkAuth() {
            if (localStorage.getItem('access_token') && store.state.userAuth == null) {
                try {
                    const response = await axios.get('me')
                    store.state.userAuth = response.data.data
                } catch (error) {
                    console.log(error)
                    localStorage.removeItem('access_token')
                }
            }
        },
        reloadValueInputValidation(value) {
            this.$bus.emit('reload-value', value)
        },
        configRequestFormData() {
            return {headers: {'Content-Type': 'multipart/form-data'}}
        },
        objectToFormData(obj, formData = new FormData(), parentKey = '') {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let propName = parentKey ? `${parentKey}[${key}]` : key;
                    let propValue = obj[key];

                    if (typeof propValue === 'object' && !(propValue instanceof File)) {
                        this.objectToFormData(propValue, formData, propName);
                    } else if (propValue instanceof FileList) {
                        for (let i = 0; i < propValue.length; i++) {
                            formData.append(propName, propValue[i]);
                        }
                    } else {
                        formData.append(propName, propValue);
                    }
                }
            }
            return formData;
        }
    }
}