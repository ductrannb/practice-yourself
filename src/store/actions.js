export default {
    startLoading({commit}) {
        commit('setLoading', true)
    },
    stopLoading({commit}) {
        commit('setLoading', false)
    }
}