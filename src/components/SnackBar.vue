<template>
  <div class="snackbar" :class="{active: snackBarIsShown}">
    <div class="snackbar__content" v-text="snackBarText"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  watch: {
    snackBarIsShown(isShown) {
      if (isShown) {
        setTimeout(() => {
          this.hideSnackBar();
        }, 1000);
      }
    }
  },
  computed: {
    ...mapState([
      'snackBarIsShown',
      'snackBarText',
    ])
  },
  methods: {
    ...mapMutations([
      'hideSnackBar'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .snackbar {
    @include center('x');
    position: fixed;
    bottom: 0;
    background: rgba($gray, 0.7);
    padding: 15px;
    opacity: 0;
    transition: all 400ms ease;
    color: $white;
    font-size: 1rem;
    width: fit-content;
    z-index: 100;
    @include screenBreakpoint2(desktop) {
      font-size: 1.2rem;
    }
    &__content {
      text-align: center;
    }
    &.active {
      bottom: 2rem;
      opacity: 1;
    }
  }
</style>
