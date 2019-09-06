<template>
  <picture>
    <source
      media="screen and (max-width: 767px)"
      :srcset="setImage(url, settingsMobile)">
    <source
      media="screen and (min-width: 768px) and (max-width: 1199px)"
      :srcset="setImage(url, settingsTablet)">
    <source
      media="screen and (min-width: 1200px)"
      :srcset="setImage(url, settingsDesktop)">
    <img
      :scr="setImage(url)"
      :alt="alt">
  </picture>
</template>

<script>
export default {
  props: {
    url: {
      required: true,
      type: String,
      default: null
    },
    settingsMobile: {
      required: false,
      type: String,
      default: null
    },
    settingsTablet: {
      required: false,
      type: String,
      default: null
    },
    settingsDesktop: {
      required: false,
      type: String,
      default: null
    },
    alt: {
      required: false,
      type: String,
      default: null
    }
  },
  data() {
    return {
      IMAGE_URL: 'https://res.cloudinary.com/da4me',
      IMAGE_URL_DEFAULT: 'https://res.cloudinary.com/da4me/fl_progressive,q_auto:best',
    }
  },
  methods: {
    setImage(url, settings = null) {
      if (settings === null) {
        return `${this.IMAGE_URL_DEFAULT}${url}`
      }
      return `${this.IMAGE_URL}/${settings}${url}`
    }
  }
}
</script>

<style lang="scss" scoped>
  picture {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
</style>
