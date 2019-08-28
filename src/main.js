import DefaultLayout from "~/layouts/Default.vue";
import store from './store';

export default function(Vue, { head, appOptions }) {
  Vue.component("Layout", DefaultLayout);
  head.htmlAttrs = { lang: 'ru' };
  
  
  appOptions.store = store;
}
