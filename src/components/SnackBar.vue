<template>
  <transition name="slide-fade">
    <div class="snackbar-container">
      <div class="snackbar">
        <div class="snackbar__content" v-text="text"/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      required: false,
      type: String,
      default: 'Добавлен успешно'
    },
  },
  data() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .snackbar-container {

  }
</style>
