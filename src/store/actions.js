export default {
    startLoading({commit}, state) {
        console.log('startLoading')
        commit('startLoading', state)
    },
    stopLoading({commit}, state) {
        console.log('stopLoading')
        commit('stopLoading', state)
    }
}