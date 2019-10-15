<template>
  <Layout>
    <div class="product">
      <div class="container">
        <nav class="breadcrumbs">
          <g-link class="breadcrumbs__item" to="/">Главная/</g-link>
          <g-link class="breadcrumbs__item" to="/">Категории/</g-link>
          <g-link class="breadcrumbs__item" :to="activeCategory.path">{{ activeCategory.header }}</g-link>
        </nav>
        <div class="product__item">
          <div
            class="image-container"
            v-if="$page.product.image && $page.product.imageGallery.length < 2">
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
          <div class="gallery" v-if="$page.product.imageGallery.length > 1">
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
                      :settings-desktop="'w_500,h_700,c_fit'"/>
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
            <h2 class="title" v-html="$page.product.title" />
            <span class="art" v-text="$page.product.artikul"/>
            <div class="price">
              <SignIcon class="icon price__icon"/>
              <div class="price__value">
                <h4
                  class="old"
                  v-show="$page.product.oldPrice">
                  {{ $page.product.oldPrice }}, 00
                </h4>
                <h4>{{ $page.product.price }}, 00</h4>
              </div>
              <h4>грн</h4>
            </div>
            <div class="description" v-html="$page.product.description"/>
            <div class="colors-container" v-show="$page.product.colors.length > 0">
              <p class="colors-title">Цвет:</p>
              <ul class="colors" v-if="$page.product.colors.length > 0">
                <li
                  class="colors__item"
                  :class="{active: $page.product.activeColor === item.colorId}"
                  @click="setActiveColorImage($page.product.id, item.colorId)"
                  v-if="item.color"
                  v-for="(item, colorInd) in $page.product.colors"
                  :key="`color${colorInd}`"
                  :style="{'background-color': item.color}"/>
              </ul>
            </div>
            <div class="size-container" v-show="$page.product.size.length > 0">
              <p class="title">Размер: </p>
              <button
                class="size"
                :class="{selected: selectedSize === sizeInd}"
                v-for="(size, sizeInd) in $page.product.size"
                :key="sizeInd" @click="selectSize(sizeInd)"
                v-text="size"/>
              <a v-if="settings.size_chart.length > 0" href="" @click.prevent="showSizeTable" class="size-table">Таблица размеров</a>
              <g-link v-if="settings.size_chart.length <= 0" :to="{ name: 'sizes' }" class="size-table"></g-link>
            </div>
            <div class="quantity-container">
              <p class="title">Количество: </p>
              <div class="quantity">
                <span class="dec" @click="[productQuantity > 0 ? productQuantity-- : false]">-</span>
                <input type="number" min="1" :value="productQuantity">
                <span class="inc" @click="productQuantity++">+</span>
              </div>
            </div>
            <div class="cta-wrapper">
              <button
                data-lock
                class="cta blue"
                :class="{inactive: isAddedToCart($page.product.id)}"
                @click="[isAddedToCart($page.product.id) ? false : addToCart($page.product.id)]">
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
    category
    artikul
    size
    colors {
      color1
      imagesColor1
      color2
      imagesColor2
      color3
      imagesColor3
    }
  },
  categories: allCategoryItem {
    edges{
      node {
        path
        header
      }
    }
  },
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
      activeColor: null,
      selectedSize: 0,
      productQuantity: 1,
      settings: require("../../data/theme.json"),
    }
  },
  computed: {
    ...mapGetters([
      'isAddedToWishList',
      'isAddedToCart'
    ]),
    activeCategory() {
      const {categories, product} = this.$page;
      const prodCategory = product.category.substring(11, product.category.length - 3);
      const activeCategory = categories.edges.filter(c =>  c.node.path.substring(12, c.node.path.length) === prodCategory);

      return activeCategory[0].node;
    }
  },
  watch: {
    $route() {
      this.setProductColors();
      this.setDefaultColor();
    }
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
    },
    setProductColors() {
      const colors = [];
      for (let i = 1; i < 4; i++) {
        const item = {
          colorId: `${this.$page.product.id}-color-${i}`,
          color: this.$page.product.colors[`color${i}`] || null,
          gallery: this.$page.product.colors[`imagesColor${i}`] || null,
        };
        if (item.color !== null) {
          colors.push(item);
        }
      }
      this.$page.product.colors = colors;
    },
    setActiveColorImage(prodId, id) {
      const activeColor = this.$page.product.colors.filter(c => c.colorId === id);
      if (activeColor.length > 0) {
        this.$page.product.image = activeColor[0].gallery[0];
        this.$page.product.imageGallery = activeColor[0].gallery;
      }
      this.$page.product.activeColor = id;
    },
    setDefaultColor() {
      this.$page.product.activeColor = this.$page.product.colors[0].colorId;
      this.$page.product.image = this.$page.product.colors[0].gallery[0];
      this.$page.product.imageGallery = this.$page.product.colors[0].gallery;
    },
    selectSize(ind) {
      this.selectedSize = ind;
    },
    showSizeTable() {
    }
  },
  mounted() {
    console.log('routes', this.$route);
    this.setProductColors();
    this.setDefaultColor();
  }
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
      @include screenBreakpoint2(desktop) {
        min-height: 700px;
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
      p.title {
        margin-bottom: 0.4rem;
      }
      .price {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &__icon {
          width: 30px;
          height: 30px;
        }
        &__value {
          margin: 1rem 0 1rem 0.5rem;
          h4 {
            margin: 0 0.2rem 0 0;
            &.old {
              color: $coral;
              text-decoration: line-through;
            }
          }
        }
      }
      .colors-container {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        .colors-title {
          font-weight: bold;
        }
        .colors {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0;
          margin: 0 0 1rem;
          list-style: none;
          &:empty {
            display: none;
          }
          &__item {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            border: 2px solid transparent;
            transition: all 300ms ease;
            margin-left: 0.5rem;
            cursor: pointer;
            @include screenBreakpoint2(phone) {
              width: 2rem;
              height: 2rem;
              margin-left: 1rem;
            }
            &.active {
              transform: scale(1.4);
              border-color: $light-gray;
            }
          }
        }
      }
      .size-container {
        .title {
          font-weight: bold;
        }
        .size {
          border: 1px solid $gray;
          padding: 5px 20px;
          border-radius: 20px;
          text-transform: uppercase;
          margin-top: 0;
          &:not(:last-of-type) {
            margin-right: 0.4rem;
          }
          &.selected {
            border: 2px solid $blue;
          }
        }
        .size-table {
          font-size: 0.8rem;
          text-decoration: underline dotted;
          display: flex;
        }
      }
      .quantity-container {
        .title {
          font-weight: bold;
        }
        .quantity {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input {
          width: 70px;
          font-weight: bold;
          padding: 5px 20px;
          border: 1px solid $gray;
          border-radius: 20px;
          text-align: center;
        }
        span {
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: bold;
          position: absolute;
          line-height: 0;
          &.dec {
            left: 15px;
            font-size: 1.4rem;
          }
          &.inc {
            right: 13px;
          }
        }
      }
      .cta-wrapper {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        margin-top: 1rem;
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
