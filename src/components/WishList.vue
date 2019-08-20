<template>
    <transition name="slide-right">
        <div class="wishlist__popup"  v-show="wishListIsOpen">
            <h2>Wishlist</h2>
        </div>
    </transition>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import {  mapState, mapMutations } from 'vuex';
  export default {
    name: "WishList",
    directives: {
      ClickOutside
    },
    computed: {
      ...mapState([
        'wishListIsOpen'
      ])
    },
    methods: {
      ...mapMutations([
        'closeWishList'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.wishlist__popup {
    position: absolute;
    right: 0;
    height: 100vh;
    width: 40%;
    top: 6rem;
    background: $white;
    box-shadow: -2px 4px 4px 0 rgba(0,0,0,0.2);
    padding: 20px;
    @include screenBreakpoint2(phone) {
      top: 4rem;
      width: 80%;
    }
}

.slide-right-enter-active {
    transition: all 0.3s  ease-in;
}

.slide-right-leave-active {
    transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
}

.slide-right-enter-to, .slide-right-leave {
    right: 0;
}

.slide-right-enter, .slide-right-leave-to {
    right: -80%;
}
</style>
