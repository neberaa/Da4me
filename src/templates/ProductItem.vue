<template>
  <Layout>
    <div class="product">
      <div class="container">
        <div class="product__item">
          <h1 class="title" v-html="$page.product.title" />
          <g-image class="image" :src="$page.product.image" :alt="$page.product.title"/>
          <div class="description" v-html="$page.product.description"/>
          <div class="price">
            <SignIcon class="icon price__icon"/>
            <h4 class="price__value">{{$page.product.price}}, 00 грн</h4>
          </div>
          <div class="cta-wrapper">
            <div class="wishlist-cta">
              <button @click="addToWishList($page.product.id)" v-show="!isAddedToWishList($page.product.id)">Add to favourite</button>
              <button @click="removeFromWishList($page.product.id)" v-show="isAddedToWishList($page.product.id)">Remove from favourite</button>
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
export default {
  components: {
    CartIcon,
    SignIcon
  },
  metaInfo () {
    return {
      title: this.$page.product.title,
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
