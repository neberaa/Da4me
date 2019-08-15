import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/theme.json";
import Vuex from "vuex";
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import store from './store';

export default function(Vue, { head, appOptions }) {
  Vue.component("Layout", DefaultLayout);
  head.htmlAttrs = { lang: 'ru' };
  
  appOptions.store = store;
}
