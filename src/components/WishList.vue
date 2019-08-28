<template>
    <transition name="slide-right">
        <div class="wishlist__popup" v-click-outside="manageWishList"  v-show="wishListIsOpen">
            <button class="icon cross" @click="closeWishList"/>
            <h2>Wishlist</h2>
            <div class="products">
                <div v-for="product in favouriteProducts" :key="product.node.id" class="product">
                    <g-link :to="product.node.path" class="product__image" :style="{'background-image' : `url(${product.node.image})`}"></g-link>
                    <button class="product__cta" @click="removeFromWishList">Remove from list</button>
                </div>
            </div>
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
    props: {
      Products: {
        type: Array,
        required: false,
      },
    },
    computed: {
      ...mapState([
        'wishListIsOpen',
        'wishList'
      ]),
      favouriteProducts() {
        return this.Products.filter(item => this.wishList.includes(item.node.id));
      }
    },
    methods: {
      ...mapMutations([
        'closeWishList',
        'removeFromWishList',
        'loadJSON',
      ]),
      manageWishList(e) {
        if (this.wishListIsOpen) {
          const listIcon = e.target.className.baseVal ? true: e.target.className.indexOf('wishlist') >= 0;
          if (!listIcon) {
            this.closeWishList();
          }
        }
      }
    },
    beforeMount() {
      this.loadJSON('wishList');
    },
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
  box-shadow: -2px 4px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 2rem 2rem 8rem 2rem;
  overflow-y: auto;
  @include screenBreakpoint2(phone) {
    top: 4rem;
    width: 100%;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    padding-bottom: 6rem;
  }

  .icon.cross {
    width: 30px;
    height: 30px;

    &::before, &::after {
      height: 30px;
    }
  }

  .product {
    width: 150px;
    height: 250px;
    position: relative;
    margin-bottom: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__image {
      width: 150px;
      height: 200px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: block;
    }

    &__cta {
      padding: 5px;
      font-size: 0.8rem;
      border: 2px solid $blue;
      margin-top: 10px;
    }
  }
}

.slide-right-enter-active {
    transition: all 0.5s  ease;
}

.slide-right-leave-active {
    transition: all 0.6s cubic-bezier(0, 1, 0.5, 1);
}

.slide-right-enter-to, .slide-right-leave {
    right: 0;
}

.slide-right-enter, .slide-right-leave-to {
    right: -50%;
    @include screenBreakpoint2(phone) {
        right: -100%;
    }
}
</style>
