import Vuex from 'vuex';
import Vue from 'vue';


Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    wishListIsOpen: false,
    cartIsOpen: false,
    menuIsOpen: false,
  },
  mutations: {
    toggleWishList(state) {
      setTimeout(() => {
        state.wishListIsOpen = !state.wishListIsOpen;
      }, 100);
    },
    toggleMenu(state) {
      setTimeout(() => {
        state.menuIsOpen = !state.menuIsOpen;
      }, 100);
    },
    closeMenu(state) {
      if (state.menuIsOpen) {
        state.menuIsOpen = false;
      }
    },
    closeWishList(state) {
      if (state.wishListIsOpen) {
        state.wishListIsOpen = false;
      }
    },
  }
});

export default store;
