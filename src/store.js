import Vuex from 'vuex';
import Vue from 'vue';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    wishList: [],
    cartIsOpen: false,
    menuIsOpen: false,
    cart: [],
    orderData: [],
  },
  mutations: {
    toggleMenu(state) {
        state.menuIsOpen = !state.menuIsOpen;
    },
    toggleCart(state) {
      state.cartIsOpen = !state.cartIsOpen;
    },
    closeMenu(state) {
      if (state.menuIsOpen) {
        state.menuIsOpen = false;
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
    closeCart(state) {
      if (state.cartIsOpen) {
        state.cartIsOpen = false;
      }
    },
    addToCart (state, id ) {
      state.cart.push(id);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart (state, id) {
      state.cart.splice(state.cart.indexOf(id), 1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    loadJSON(state, name) {
      const json = localStorage.getItem(name);
      if (json) {
        state[name] = JSON.parse(json);
      }
    },
    setOrderData(state, data) {
      state.orderData = data;
    }
  },
  getters: {
    isAddedToWishList: (state) => (id) => {
      return state.wishList.includes(id);
    },
    isAddedToCart: (state) => (id) => {
      return state.cart.includes(id);
    },
  }
});

export default store;
