export default {
    startLoading({commit}) {
        commit('setLoading', true)
    },
    stopLoading({commit}) {
        commit('setLoading', false)
    },
    loginVuex({commit}, user) {
        commit('setUserAuth', user)
    },
    logoutVuex({commit}) {
        commit('setUserAuth', null)
    },
    setPaymentUrl({commit}, url) {
        commit('setPaymentUrl', url)
    },
    removePaymentUrl({commit}) {
        commit('setPaymentUrl', null)
    }
}