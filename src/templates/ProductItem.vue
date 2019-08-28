<template>
  <Layout>
    <div class="product">
      <div class="container">
        <div class="product__item">
          <h1 class="title" v-html="$page.product.title" />
          <g-image class="image" v-if="$page.product.image && $page.product.imageGallery.length === 0" :src="$page.product.image" :alt="$page.product.title"/>
          <agile
            ref="carousel"
            class="carousel"
            :options="carouselOptions">
            <img
              class="slide"
              v-for="(img, i) in $page.product.imageGallery"
              :src="img"
              :alt="`${$page.product.title}-${i}`"
              :key="`imagegallery${i}`">
            <template slot="prevButton">
              <ArrowIcon class="icon prev"></ArrowIcon>
            </template>
            <template slot="nextButton">
              <ArrowIcon class="icon next"></ArrowIcon>
            </template>
          </agile>
          <div class="description" v-html="$page.product.description"/>
          <div class="price">
            <SignIcon class="icon price__icon"/>
            <h4 class="price__value">{{$page.product.price}}, 00 грн</h4>
          </div>
          <div class="cta-wrapper">
            <div class="wishlist-cta">
              <button @click="addToWishList($page.product.id)" v-show="!isAddedToWishList($page.product.id)">Добавить в избранное</button>
              <button @click="removeFromWishList($page.product.id)" v-show="isAddedToWishList($page.product.id)">Убрать с избранного</button>
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
  }
}
</page-query>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CartIcon from "../assets/icons/shopping-bag.svg";
import SignIcon from "../assets/icons/sign.svg";
import ArrowIcon from "../assets/icons/back.svg";
import { VueAgile } from 'vue-agile'

export default {
  components: {
    CartIcon,
    SignIcon,
    ArrowIcon,
    agile: VueAgile
  },
  metaInfo () {
    return {
      title: this.$page.product.title,
    }
  },
  data() {
    return {
      carouselOptions: {
        slidesToShow: 3,
        dots: false,
        navButtons: true,
        centerMode: true,
      }
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
    .carousel {
      width: 100%;
      margin: auto;
      position: relative;
      img {
        object-fit: cover;
        object-position: center;
        padding: 0 10px;
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
    border: 2px solid $blue;
    margin-top: 20px;
  }
</style>
