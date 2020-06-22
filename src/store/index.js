import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const AUTHENTICATE = 'AUTHENTICATE';
const CLEAR_TOKEN = 'CLEAR_TOKEN';

const { sessionStorage } = window;
const CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';
const USER_IS_ADMIN = 'USER_IS_ADMIN';

export default new Vuex.Store({
  state: {},
  mutations: {
    [AUTHENTICATE]: (state, payload) => {
      state.isAuthenticated = true;
      sessionStorage.setItem(USER_IS_ADMIN, payload != null && payload.userrole === 'admin');
      sessionStorage.setItem(CHECK_AUTHENTICATION, 'true');
    },
    [CLEAR_TOKEN]: () => {
      sessionStorage.clear(CHECK_AUTHENTICATION);
      sessionStorage.clear(USER_IS_ADMIN);
    },
  },
  actions: {
    authenticate({ commit }, payload) {
      commit(AUTHENTICATE, payload);
    },
    cleartoken({ commit }) {
      commit(CLEAR_TOKEN);
    },
  },
  modules: {},
  getters: {},
});
