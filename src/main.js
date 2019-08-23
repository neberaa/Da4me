import DefaultLayout from "~/layouts/Default.vue";
import store from './store';
import RETICOOL from 'reticool';
import reticoolConfig from './reticoolConfig'

export default function(Vue, { head, appOptions }) {
  Vue.component("Layout", DefaultLayout);
  head.htmlAttrs = { lang: 'ru' };
  
  appOptions.store = store;
  new RETICOOL(reticoolConfig);
}
