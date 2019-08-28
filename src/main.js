import DefaultLayout from "~/layouts/Default.vue";
import store from './store';
import VueAgile from 'vue-agile'

export default function(Vue, { head, appOptions }) {
  Vue.component('agile', VueAgile);
  Vue.component("Layout", DefaultLayout);
  head.htmlAttrs = { lang: 'ru' };
  
  
  appOptions.store = store;
}
