<template>
  <Layout>
    <div class="product">
      <div class="container">
        <nav class="breadcrumbs">
          <g-link class="breadcrumbs__item" to="/">Главная/</g-link>
          <g-link class="breadcrumbs__item" to="/categories">Категории/</g-link>
        </nav>
        <div class="product__item">
          <div
            class="image-container"
            v-if="$page.product.image && $page.product.imageGallery.length === 0">
            <a
              class="wishlist"
              data-lock
              @click.prevent="toggleWishList($page.product.id)">
              <HeartIcon
                class="icon"
                :class="{'icon--coral': isAddedToWishList($page.product.id)}"/>
            </a>
            <ResponsiveImage
              :url="$page.product.image"
              :alt="$page.product.title"
              :settings-mobile="'w_400,h_800,c_fit'"
              :settings-tablet="'w_400,h_800,c_fit'"/>
          </div>
          <div class="gallery" v-if="$page.product.imageGallery.length > 0">
            <a
              class="wishlist"
              data-lock
              @click.prevent="toggleWishList($page.product.id)">
              <HeartIcon
                class="icon"
                :class="{'icon--coral': isAddedToWishList($page.product.id)}"/>
            </a>
            <ClientOnly>
              <slick ref="slider" :options="sliderOptions" class="slider">
                <div class="slide" :key="`imagegallery${i}`" v-for="(img, i) in $page.product.imageGallery">
                  <div class="slide__image">
                    <ResponsiveImage
                      :url="img"
                      :alt="$page.product.title + i"
                      :settings-mobile="'w_400,h_800,c_fit'"
                      :settings-tablet="'w_300,h_600,c_fit'"
                      :settings-desktop="'w_300,h_600,c_fit'"/>
                  </div>
                </div>
              </slick>
              <slick ref="sliderNavThumbnails" :options="sliderNavOptions" class="slider-nav-thumbnails">
                <div class="slide" :key="`imageNavgallery${i}`" v-for="(img, i) in $page.product.imageGallery">
                  <div class="slide__image">
                    <ResponsiveImage
                      :is-thumb-car="true"
                      :url="img"
                      :alt="$page.product.title + i"
                      :settings-mobile="'w_150,h_200,c_fit'"
                      :settings-tablet="'w_150,h_200,c_fit'"
                      :settings-desktop="'w_150,h_200,c_fit'"/>
                  </div>
                </div>
              </slick>
            </ClientOnly>
          </div>
          <div class="content">
            <h1 class="title" v-html="$page.product.title" />
            <div class="description" v-html="$page.product.description"/>
            <div class="price">
              <SignIcon class="icon price__icon"/>
              <h4 class="price__value">{{$page.product.price}}, 00 грн</h4>
            </div>
            <div class="cta-wrapper">
              <button
                data-lock
                class="cta blue"
                :class="{inactive: isAddedToCart($page.product.id)}"
                @click="addToCart($page.product.id)">
                Добавить в корзину
              </button>
              <span class="small" v-show="isAddedToCart($page.product.id)">
                Товар успешно добавлен в корзину
              </span>
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
import HeartIcon from "../assets/icons/heart.svg";
import ArrowIcon from "../assets/icons/back.svg";
import '../../node_modules/slick-carousel/slick/slick.css';

export default {
  components: {
    CartIcon,
    SignIcon,
    ArrowIcon,
    HeartIcon,
    Slick: () => import('vue-slick').catch()
  },
  metaInfo () {
    return {
      title: this.$page.product.title,
    }
  },
  data() {
    return {
      sliderOptions: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        asNavFor: '.slider-nav-thumbnails',
      },
      sliderNavOptions: {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider',
        dots: false,
        arrows: false,
        focusOnSelect: true,
      },
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
    ]),
    toggleWishList(id) {
      if (this.isAddedToWishList(id)) {
        this.removeFromWishList(id)
      } else {
        this.addToWishList(id);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .product__item {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    @include screenBreakpoint2(phone) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .wishlist {
      position: absolute;
      cursor: pointer;
      z-index: 2;
      background: $white;
      width: 40px;
      height: 40px;
      top: 15px;
      right: 15px;
      border-radius: 50%;
      @include screenBreakpoint2(desktop) {
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
      }
      .icon {

        width: 25px;
        height: 25px;
        top: 8px;
        left: 8px;
        position: relative;
        @include screenBreakpoint2(desktop) {
          width: 30px;
          height: 30px;
          top: 10px;
          left: 10px;
        }
      }
    }
    .image-container {
      position: relative;
      width: 100%;
      flex: 0 0;
      flex-basis: calc(45% - 2rem);
      overflow: hidden;
      margin: 1.2rem 2rem 1.2rem 0;
      padding-bottom: 60%;
      @include screenBreakpoint2(phone) {
        margin: 1.2rem auto;
        padding-bottom: 150%;
      }
    }
    .gallery {
      flex: 0 0;
      flex-basis: calc(45% - 2rem);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      margin-right: 2rem;
      position: relative;
      @include screenBreakpoint2(phone) {
        margin: auto;
        max-height: calc(100vh - 100px);
      }
      .wishlist {
        top: calc(1.2rem + 15px);
        @include screenBreakpoint2(desktop) {
          top: calc(1.2rem + 20px);
        }
      }
      .slide__image {
        position: relative;
        width: 100%;
        overflow: hidden;
        padding-bottom: 130%;
      }
      picture {
        img {
          @include screenBreakpoint2(phone) {
            max-width: calc(100vw - 4rem);
          }
        }
      }
      .slider {
        width: 100%;
        margin: 1.2rem 0;
        overflow: hidden;
        @include screenBreakpoint2(phone) {
          width: calc(100vw - 4rem);
          margin: 1.2rem auto;
          max-height: calc(80vh - 2.4rem);
        }
      }
      .slider-nav-thumbnails {
        width: 100%;
        @include screenBreakpoint2(phone) {
          width: calc(100vw - 4rem);
          margin: auto;
          max-height: 22vh;
        }
      }
    }
    .content {
      flex: 0 0 55%;
      @include screenBreakpoint2(phone) {
        flex-basis: 100%;
      }
      .title {
        margin-top: 1.2rem;
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
        align-items: flex-start;
        flex-direction: column;
        .small {
          font-size: 0.7rem;
          padding: 0.2rem 0;
          font-style: italic;
        }
      }
    }
  }
  button {
    padding: 10px;
    margin-top: 20px;
  }
</style>
