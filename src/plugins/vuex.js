import { createStore } from 'vuex'
import state from "@/store/state.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";
import actions from "@/store/actions.js";

const store = createStore({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
})

export default store