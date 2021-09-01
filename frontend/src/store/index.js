import { createStore } from 'vuex'

export default createStore({
  state: {
    companyName: "Groupomania"
  },
  getters: {
    copyright: (state) => {
      const currentYear = new Date().getFullYear()
      return ` © ${currentYear} ${state.companyName} Tous droits réservés`
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})