import { createStore } from 'vuex';

const store = createStore({
  state: {
    loggedIn: false,
    frameworks: []
  },
  mutations: {
    loadFrameworks(state, frameworks) {
      state.frameworks = frameworks;
    }
  },
  getters: {
    getFrameworks(state) {
      return state.frameworks;
    }
  }
});

export default store;
