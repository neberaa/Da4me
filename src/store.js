import Vuex from 'vuex';
import Vue from 'vue';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    wishList: [],
    wishListIsOpen: false,
    cartIsOpen: false,
    menuIsOpen: false,
  },
  mutations: {
    toggleWishList(state) {
        state.wishListIsOpen = !state.wishListIsOpen;
    },
    toggleMenu(state) {
        state.menuIsOpen = !state.menuIsOpen;
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
    addToWishList (state, id ) {
      state.wishList.push(id);
      localStorage.setItem('wishList', JSON.stringify(state.wishList));
    },
    removeFromWishList (state, id) {
      state.wishList.splice(state.wishList.indexOf(id), 1);
      localStorage.setItem('wishList', JSON.stringify(state.wishList));
    },
    wishListLoadJSON(state) {
      const json = localStorage.getItem('wishList');
      if (json) {
        state.wishList = JSON.parse(json);
      }
    }
  },
  getters: {
    isAddedToWishList: (state) => (id) => {
      return state.wishList.includes(id);
    },
  }
});

export default store;
