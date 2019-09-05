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
        const IMAGE_URL = "https://res.cloudinary.com/da4me";
        const IMAGE_URL_DEFAULT = "https://res.cloudinary.com/da4me/fl_progressive,q_auto:best";
        
        if (settings === null) {
          return `${IMAGE_URL_DEFAULT}${url}`
        }
        return `${IMAGE_URL}/${settings}${url}`
      }
    }
  });
  
  appOptions.store = store;
}
