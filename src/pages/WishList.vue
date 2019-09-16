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
            <h4 class="title" v-text="product.node.title"/>
            <div class="price">
              <SignIcon class="icon price__icon"/>
              <span class="price__value">{{product.node.price}}, 00 грн</span>
            </div>
            <div class="buttons">
              <button class="buttons__item" @click="removeFromWishList">Убрать из списка</button>
              <g-link
                :to="product.node.path"
                class="buttons__item">
                Перейти к товару
              </g-link>
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
  import { mapState, mapMutations } from 'vuex';
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
        'wishList'
      ]),
      favouriteProducts() {
        return this.$page.products.edges.filter(item => this.wishList.includes(item.node.id));
      }
    },
    methods: {
      ...mapMutations([
        'removeFromWishList',
        'loadJSON',
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
  align-items: baseline;
  border-bottom: 1px solid $light-gray;
  margin-bottom: 20px;
  .icon {
    display: block;
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .page-title {
    margin: 20px 0 5px 0;
  }

}
    .product {
      /*width: 150px;*/
      /*height: 250px;*/
      position: relative;
      margin-bottom: 15px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 1px solid $light-gray;
      padding: 20px 0;

      &__image {
        width: 150px;
        height: 200px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        position: relative;
      }
      &__content {
        .title {

        }
        .price {

        }
        .buttons {
          &__item {
            padding: 5px;
            font-size: 0.8rem;
            border: 2px solid $blue;
            margin-top: 10px;
          }
        }
      }
    }
  }
</style>
