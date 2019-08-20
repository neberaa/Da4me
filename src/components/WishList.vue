<template>
    <div class="wishlist-container">
        <a href="" class="icon wishlist" @click="toggleWishList">
            <HeartIcon class="icon icon--white"/>
        </a>
        <transition name="slide-right">
            <main class="wishlist-popup" v-show="wishListIsOpen">

            </main>
        </transition>
    </div>
</template>

<script>
  import HeartIcon from '../assets/icons/heart.svg';
  export default {
    name: "WishList",
    components: {
      HeartIcon,
    },
    data() {
      return {
        wishListIsOpen: false,
      }
    },
    methods: {
      toggleWishList() {
        this.wishListIsOpen = !this.wishListIsOpen;
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
