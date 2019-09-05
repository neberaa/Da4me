import DefaultLayout from "~/layouts/Default.vue";
import store from './store';
import deviceChecker from './deviceChecker';

export default function(Vue, { head, appOptions }) {
  Vue.component("Layout", DefaultLayout);
  head.htmlAttrs = { lang: 'ru' };
  Vue.mixin(deviceChecker);
  Vue.mixin({
    methods: {
      setImage: (url, settings = null) => {
        if (settings === null) {
          return `${process.env.GRIDSOME_IMAGE_URL_DEFAULT}${url}`
        }
        return `${process.env.GRIDSOME_IMAGE_URL}/${settings}${url}`
      }
    }
  });
  
  appOptions.store = store;
}
