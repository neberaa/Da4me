import DefaultLayout from "~/layouts/Default.vue";
import carousel from 'vue-owl-carousel'
import store from './store';

export default function(Vue, { head, appOptions }) {
  Vue.component("Layout", DefaultLayout);
  Vue.component(carousel);
  head.htmlAttrs = { lang: 'ru' };
  
  appOptions.store = store;
}
