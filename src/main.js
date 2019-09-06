import DefaultLayout from "~/layouts/Default.vue";
import store from './store';
import deviceChecker from './deviceChecker';

export default function(Vue, { head, appOptions }) {
  Vue.component("Layout", DefaultLayout);
  head.htmlAttrs = { lang: 'ru' };
  Vue.mixin(deviceChecker);
  
  appOptions.store = store;
}
