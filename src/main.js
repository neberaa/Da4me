import DefaultLayout from "~/layouts/Default.vue";
import store from './store';
import VueAgile from 'vue-agile'

export default function(Vue, { head, appOptions }) {
  Vue.component("Layout", DefaultLayout);
  Vue.use(VueAgile);
  head.htmlAttrs = { lang: 'ru' };
  
  
  appOptions.store = store;
}
