<template>
  <Layout>
    <div class="product">
      <div class="container">
        <div class="product__item">
          <h1 class="title" v-html="$page.product.title" />
          <div
            class="image-container"
            v-if="$page.product.image && $page.product.imageGallery.length === 0">
            <ResponsiveImage
              :url="$page.product.image"
              :alt="$page.product.title"
              :settings-mobile="'w_400,h_800,c_fit'"
              :settings-tablet="'w_400,h_800,c_fit'"/>
          </div>
          <ClientOnly>
            <carousel
              :perPageCustom="[[300, 1], [768, 3]]"
              :paginationActiveColor="gray"
              ref="carousel"
              class="carousel">
              <slide
                class="slide"
               v-for="(img, i) in $page.product.imageGallery"
                :key="`imagegallery${i}`">
                <div class="slide__image">
                  <ResponsiveImage
                    :url="img"
                    :alt="$page.product.title + i"
                    :settings-mobile="'w_400,h_800,c_fit'"
                    :settings-tablet="'w_300,h_600,c_fit'"
                    :settings-desktop="'w_300,h_600,c_fit'"/>
                </div>
              </slide>
            </carousel>
          </ClientOnly>
          <div class="description" v-html="$page.product.description"/>
          <div class="price">
            <SignIcon class="icon price__icon"/>
            <h4 class="price__value">{{$page.product.price}}, 00 грн</h4>
          </div>
          <div class="cta-wrapper">
            <div class="wishlist-cta">
              <button class="cta blue" @click="addToWishList($page.product.id)" v-show="!isAddedToWishList($page.product.id)">Добавить в избранное</button>
              <button class="cta blue" @click="removeFromWishList($page.product.id)" v-show="isAddedToWishList($page.product.id)">Убрать с избранного</button>
            </div>
            <div class="cart-cta" v-show="!isAddedToCart($page.product.id)">
              <CartIcon class="icon" @click="addToCart($page.product.id)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ProductItem ($path: String!) {
  product: productItem (path: $path) {
    title
    image
    imageGallery
    description
    id
    price
    oldPrice
  }
}
</page-query>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CartIcon from "../assets/icons/shopping-bag.svg";
import SignIcon from "../assets/icons/sign.svg";
import ArrowIcon from "../assets/icons/back.svg";

export default {
  components: {
    CartIcon,
    SignIcon,
    ArrowIcon,
    Carousel: () =>
      import ('vue-carousel')
        .then(m => m.Carousel)
        .catch(),
    Slide: () =>
      import ('vue-carousel')
        .then(m => m.Slide)
        .catch()
  },
  metaInfo () {
    return {
      title: this.$page.product.title,
    }
  },
  data() {
    return {
      gray: "#414141"
    }
  },
  computed: {
    ...mapGetters([
      'isAddedToWishList',
      'isAddedToCart'
    ])
  },
  methods: {
    ...mapMutations([
      'addToWishList',
      'removeFromWishList',
      'addToCart'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .product__item {
    display: flex;
    flex-direction: column;
    flex: 1 1 300px;
    justify-content: center;
    align-items: flex-start;
    .image-container {
      position: relative;
      width: 100%;
      height: 100%;
      padding-bottom: 150%;
    }
    .carousel {
      width: 100%;
      margin: auto;
      position: relative;
      .slide {
        position: relative;
        padding-bottom: 56%;
        @include screenBreakpoint2(phone) {
          padding-bottom: 140%;
        }
        &__image {
          position: absolute;
          width: 96%;
          padding: 0 2%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          @include screenBreakpoint2(phone) {
            width: 98%;
            padding: 0 1%;
          }
        }
      }
      .icon {
        width: 40px;
        height: 40px;
        @include center('y');
        &.next {
          transform: rotate(180deg);
          right: 5px;
        }
        &.prev {
          left: 13px;
        }
      }
    }
    .price {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &__icon {
        width: 20px;
        height: 20px;
      }
      &__value {
        margin: 1rem 0 1rem 0.5rem;
      }
    }
    .cta-wrapper {
      display: flex;
      align-items: flex-end;
      .cart-cta {
        margin-left: 2rem;
        position: relative;
        &:before {
          content: '+';
          display: block;
          @include center('both');
          font-size: 2rem;
          z-index: -1;
          color: $gray;
        }
        .icon {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  button {
    padding: 10px;
    margin-top: 20px;
  }
</style>
