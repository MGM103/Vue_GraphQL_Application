import { createStore } from 'vuex';

const state = {
  id: null,
  username: null,
  frameworks: []
};

const getters = {
  getId(state) {
    return state.id;
  },
  getUsername(state) {
    return state.username;
  },
  getFrameworks(state) {
    return state.frameworks;
  }
};

const actions = {
  updateId: ({ commit }, id) => commit('updateId', id),
  updateUsername: ({ commit }, username) => commit('updateUsername', username)
};

const mutations = {
  updateId(state, id) {
    state.id = id;
  },
  updateUsername(state, username) {
    state.username = username;
  }
};

const store = createStore({
  state,
  getters,
  actions,
  mutations
});

export default store;
