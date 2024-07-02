export default {
    setLoading(state, value) {
        state.isLoading = value
    },
    setUserAuth(state, auth) {
        state.userAuth = auth
    },
    setPaymentUrl(state, url) {
        state.paymentUrl = url
    },
    setLearningModule(state, module) {
        state.learningModule = module
    },
    setLessonQuestionSelected(state, lessonQuestionSelected) {
        state.lessonQuestionSelected = lessonQuestionSelected
    },
}