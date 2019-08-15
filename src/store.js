import Vuex from 'vuex';
import Vue from 'vue';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    wishlistIsOpen: false,
    cartIsOpen: false,
    scrollIsLocked: false,
  },
  mutations: {
    lockBodyScroll(state, targetEl) {
      disableBodyScroll(targetEl);
      // document.body.classList.add('scroll-lock');
      state.scrollIsLocked = true;
    },
    unlockBodyScroll(state, targetEl) {
      // document.body.classList.remove('scroll-lock');
      enableBodyScroll(targetEl);
      state.scrollIsLocked = false;
    },
    switchBodyScrollPadding(state, timeout = 0) {
      if (state.scrollIsLocked) {
        setTimeout(() => {
          document.body.classList.add('scroll-lock');
        }, 0);
      } else {
        setTimeout(() => {
          document.body.classList.remove('scroll-lock');
        }, timeout); // depends on fade animation time
      }
    }
  }
});

export default store;
