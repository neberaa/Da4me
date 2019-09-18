<template>
  <Layout>
    <div class="container wishlist">
      <div class="header">
        <HeartIcon class="icon icon--coral"/>
        <h3 class="page-title">LOVE list</h3>
      </div>
      <div class="products">
        <div v-for="product in favouriteProducts" :key="product.node.id" class="product">
          <g-link
            :to="product.node.path"
            class="product__image">
            <ResponsiveImage
              :url="product.node.image"
              :alt="product.node.title"
              :settings-mobile="'w_400,h_800,c_fit'"
              :settings-tablet="'w_300,h_600,c_fit'"
              :settings-desktop="'w_300,h_600,c_fit'"/>
          </g-link>
          <div class="product__content">
            <p class="title" v-text="product.node.title"/>
            <div class="price">
              <SignIcon class="icon price__icon"/>
              <span class="price__value">{{product.node.price}}, 00 грн</span>
            </div>
            <div class="buttons">
              <button
                class="buttons__item cta"
                @click="removeFromWishList">
                Убрать из списка
              </button>
              <transition name="fade400">
                <button
                  v-show="!isAddedToCart(product.node.id)"
                  class="buttons__item cta blue"
                  @click="addToCart(product.node.id)">
                  Добавить в корзину
                </button>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <p v-show="wishList.length === 0">Список желаний пуст...</p>
    </div>
  </Layout>
</template>

<page-query>
  query Products  {
    products: allProductItem {
      edges{
        node {
          title
          image
          id
          path
          price
          article
        }
      }
    }
  }
</page-query>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex';
  import HeartIcon from '../assets/icons/heart.svg';
  import SignIcon from '../assets/icons/sign.svg';
  export default {
    name: "WishList",
    components: {
      HeartIcon,
      SignIcon,
    },
    computed: {
      ...mapState([
        'wishList',
      ]),
      ...mapGetters([
        'isAddedToCart'
      ]),
      favouriteProducts() {
        return this.$page.products.edges.filter(item => this.wishList.includes(item.node.id));
      }
    },
    methods: {
      ...mapMutations([
        'removeFromWishList',
        'loadJSON',
        'addToCart'
      ]),
    },
    beforeMount() {
      this.loadJSON('wishList');
    },
  }
</script>

<style lang="scss" scoped>
  .wishlist{
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid $light-gray;
  margin: 20px 0;
  .icon {
    display: block;
    width: 2rem;
    height: 2rem;
    margin-right: 20px;
  }
  .page-title {
    margin: 0;
  }

}
    .product {
      position: relative;
      margin-bottom: 15px;
      overflow: hidden;
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
      border-bottom: 1px solid $light-gray;
      padding: 20px 0;
      @include screenBreakpoint2(phone) {
        flex-direction: column;
      }

      &__image {
        width: 200px;
        height: 300px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        position: relative;
        flex: 0 0 200px;
        @include screenBreakpoint2(phone) {
          width: 100%;
          flex-basis: 500px;
        }
      }
      &__content {
        margin-left: 1rem;
        position: relative;
        @include screenBreakpoint2(phone) {
          margin-left: 0;
        }
        .title {
          margin: 0 0 1rem 0;
          font-size: 1.4rem;
          @include screenBreakpoint2(phone) {
            margin-bottom: 0.5rem;
          }
        }
        .price {
          @include screenBreakpoint2(phone) {
            margin-bottom: 2rem;
          }
          &__icon {
            width: 1rem;
            height: 1rem;
          }
          &__value {
            font-size: 1.2rem;
          }
        }
        .buttons {
          position: absolute;
          bottom: 0;
          display: flex;
          @include screenBreakpoint2(phone) {
            flex-direction: column;
            position: relative;
          }
          &__item {
            padding: 5px 15px;
            font-size: 1rem;
            text-align: center;
            @include screenBreakpoint2(phone) {
              padding: 10px 15px;
            }
            &:last-of-type {
              margin-left: 1rem;
              @include screenBreakpoint2(phone) {
                margin-left: 0;
                margin-top: 1rem;
              }
            }
          }
        }
      }
    }
  }
</style>
