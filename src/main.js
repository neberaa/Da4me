import DefaultLayout from "~/layouts/Default.vue";
import ResponsiveImage from "~/components/ResponsiveImage.vue";
import store from './store';
import deviceChecker from './deviceChecker';

export default function(Vue, { head, appOptions }) {
  Vue.component("Layout", DefaultLayout);
  Vue.component("ResponsiveImage", ResponsiveImage);
  head.htmlAttrs = { lang: 'ru' };
  Vue.mixin(deviceChecker);
  
  appOptions.store = store;
}
