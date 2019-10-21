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
    addOrderData(state, product) {
      state.orderData.push(product);
      localStorage.setItem('orderData', JSON.stringify(state.orderData));
    },
    updateOrderData(state, product) {
      const prodInd = state.orderData.findIndex(p => p.id === product.id);
      state.orderData[prodInd] = product;
      localStorage.setItem('orderData', JSON.stringify(state.orderData));
    },
    removeFromOrderData(state, id) {
      state.orderData = state.orderData.filter(d => d.id !== id);
      localStorage.setItem('orderData', JSON.stringify(state.orderData));
    }
  },
  getters: {
    isAddedToWishList: (state) => (id) => {
      return state.wishList.includes(id);
    },
    isAddedToCart: (state) => (id) => {
      return state.cart.includes(id);
    },
    isAddedToOrder: (state) => (id) => {
      return state.orderData.map(d => d.id).includes(id);
    },
  }
});

export default store;
