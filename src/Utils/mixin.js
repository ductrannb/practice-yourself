import store from "@/plugins/vuex.js";
import constants from "@/Utils/constants.js";
import {mapGetters} from "vuex";

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['auth']),
        isAdmin() {
            return this.auth.role_id === constants.ROLE.ADMIN
        },
        isTeacher() {
            return this.auth.role_id === constants.ROLE.TEACHER
        }
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
        },
        getLevelText(value) {
            switch (value) {
                case constants.QUESTION_LEVEL.CODE.LEVEL_EASY:
                    return constants.QUESTION_LEVEL.TEXT.LEVEL_EASY
                case constants.QUESTION_LEVEL.CODE.LEVEL_MEDIUM:
                    return constants.QUESTION_LEVEL.TEXT.LEVEL_MEDIUM
                case constants.QUESTION_LEVEL.CODE.LEVEL_HARD:
                    return constants.QUESTION_LEVEL.TEXT.LEVEL_HARD
            }
        },
        getChoiceCode(index) {
            switch (index) {
                case 0:
                    return "A"
                case 1:
                    return "B"
                case 2:
                    return "C"
                case 3:
                    return "D"
            }
        },
        async destroy(url, id , callback) {
            const rs = await this.deleteConfirm()
            if (rs.isConfirmed) {
                await this.$axios.delete(`${url}/${id}`)
                callback()
            }
        },
        authorIsMe(authorId) {
            return authorId === this.auth.id
        },
        replaceRouteName(routeName) {
            let routeSplit = routeName.split('.')
            if (['admin', 'teacher'].includes(routeSplit[0])) {
                routeSplit[0] = this.isAdmin ? 'admin' : 'teacher'
            } else {
                routeSplit.unshift(this.isAdmin ? 'admin' : 'teacher')
            }
            return routeSplit.join('.')
        }
    }
}