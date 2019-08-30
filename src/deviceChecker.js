/**
 * Please apply this to root Vue instance only
 * after that, any injected child component would have
 * access to device object, which is reactive on resize
 * device {
 *  mobile: Boolean,
 *  tablet: Boolean,
 *  desktop: Boolean
 * }
 *
 * Example:
 * use inject: ['resp']
 *
 * <div v-if="resp.device.tablet">Would show only on tablet</div>
 */

const breakpoints = {
  tablet: 768,
  desktop: 1200,
};

const allDevices = [
  'mobile',
  'tablet',
  'desktop',
];

let currentDevice = 'desktop';
// desktop by default

const checkScreen = {
  mobile(width) {
    return width && (width < breakpoints.tablet);
  },
  tablet(width) {
    return width && ((width < breakpoints.desktop) && (width >= breakpoints.tablet));
  },
  desktop(width) {
    return width && breakpoints.desktop <= width;
  },
};

export default {
  data() {
    return {
      oldWidth: null,
      currentWidth: null,
      device: {
        mobile: false,
        tablet: false,
        desktop: false,
      },
    };
  },
  provide() {
    // Please don't use it as common pattern
    // (apply Vuex or global event bus instead)
    // to use device object in any child component, use inject: ['resp']
    const resp = {};
    // Object.defineProperty() is used to make device reactive
    Object.defineProperty(resp, 'device', {
      enumerable: true,
      get: () => this.device,
    });
    return { resp };
  },
  methods: {
    handleResize() {
      this.currentWidth = window.innerWidth;
      for (let i = 0; i < allDevices.length; i += 1 ) {
        const d = allDevices[i];
        if (checkScreen[d](this.currentWidth) && !checkScreen[d](this.oldWidth)) {
          this.oldWidth = this.currentWidth;
          this.device[currentDevice] = false;
          currentDevice = d;
          this.device[d] = true;
        }
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
}
