import store from "@/plugins/vuex.js";
import constants from "@/Utils/constants.js";
import {mapActions, mapGetters} from "vuex";

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['auth']),
        isAdmin() {
            return this.auth?.role_id === constants.ROLE.ADMIN
        },
        isTeacher() {
            return this.auth?.role_id === constants.ROLE.TEACHER
        }
    },
    methods: {
        ...mapActions(['logoutVuex']),
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
        async checkAuth(force = false) {
            if (localStorage.getItem('access_token') && (force || store.state.userAuth == null)) {
                try {
                    const response = await axios.get('me')
                    store.state.userAuth = response.data.data
                } catch (error) {
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
            if (this.auth.role_id === constants.ROLE.ADMIN) {
                return true
            }
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
        },
        async logout() {
            await axios.get('logout')
            this.logoutVuex()
            localStorage.removeItem('access_token')
            this.$router.push({name: 'home'})
        },
        scrollToQuestion(questionIndex) {
            const element = document.getElementById(`question-${questionIndex}`);
            if (!element) {
                return
            }
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const topPosition = rect.top + scrollTop - parseFloat('8rem') * 16; // Convert rem to pixels
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        },
        async googleLogin() {
            const googleUser = await this.$gAuth.signIn();
            if (!googleUser) {
                return null;
            }
            const user = {
                email: googleUser.getBasicProfile().getEmail(),
                name: googleUser.getBasicProfile().getName(),
                avatar: googleUser.getBasicProfile().getImageUrl(),
                token_type: googleUser.getAuthResponse().token_type,
                access_token: googleUser.getAuthResponse().access_token,
            }
            const res = await this.$axios.post('login/google', user)
            await this.handleLoginSuccess()
        },
        async handleLoginSuccess() {
            await this.checkAuth()
            setTimeout(this.noticeSuccess('Đăng nhập thành công'), 100)
            switch (this.auth.role_id) {
                case constants.ROLE.USER:
                    this.$router.push({name: 'home'})
                    break
                case constants.ROLE.TEACHER:
                    this.$router.push({name: 'teacher.dashboard'})
                    break
                case constants.ROLE.ADMIN:
                    this.$router.push({name: 'admin.dashboard'})
                    break
                default:
                    this.$router.push({name: 'home'})
            }
        }
    }
}