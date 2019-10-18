<template>
  <transition name="slide-right">
    <div class="cart__popup" v-click-outside="manageCart"  v-show="cartIsOpen">
      <button
        class="icon cross"
        @click="closeCart"/>
      <h2>Корзина</h2>
      <div class="products">
        <div v-for="product in orderData" :key="product.id" class="product">
          <div class="column column--left">
            <g-link
              :to="product.path"
              class="product__image">
              <ResponsiveImage
                :url="product.imageGallery.length > 0 ? product.imageGallery[0] : product.image"
                :alt="product.title"
                :settings-mobile="'w_400,h_800,c_fit'"
                :settings-tablet="'w_300,h_600,c_fit'"
                :settings-desktop="'w_300,h_600,c_fit'"/>
            </g-link>
          </div>
          <div class="column column--right">
            <h5 class="product__title" v-text="product.title"/>
            <span class="product__article" v-text="product.artikul"/>
            <p class="product__price">Цена: {{product.price}}, 00 грн</p>
            <p class="product__size" v-show="product.selectedSize">Размер: {{product.selectedSize}}</p>
            <p class="product__quantity">Кол-во: {{product.quantity || 1}}</p>
            <div class="product__summary">ИТОГО: {{product.price * (product.quantity || 1)}}, 00 грн</div>
            <button
              class="product__cta cta small"
              @click="removeFromOrderData(product.id)">
              Убрать из корзины
            </button>
          </div>
        </div>
      </div>
      <p v-show="orderData.length > 0">Общая сумма заказа: {{totalOrderAmount}}, 00 грн</p>
      <g-link class="cta cart-order blue" :to="{ name: 'order' }" v-show="orderData.length > 0 && $route.name !== 'order'">Оформить заказ</g-link>
      <p v-show="orderData.length === 0" class="empty-text">Ваша корзина пуста...</p>
    </div>
  </transition>
</template>

<script>
  import ClickOutside from 'vue-click-outside';
  import {  mapState, mapMutations } from 'vuex';

  export default {
    name: "ShoppingCart",
    directives: {
      ClickOutside
    },
    computed: {
      ...mapState([
        'cartIsOpen',
        'cart',
        'orderData'
      ]),
      totalOrderAmount() {
        let total = 0;
        this.orderData.forEach(p => {
          const productTotal = parseInt(p.price) * parseInt(p.quantity || 1);
          total += productTotal;
        });
        return total;
      }
    },
    methods: {
      ...mapMutations([
        'closeCart',
        'loadJSON',
        'removeFromOrderData',
      ]),
      manageCart(e) {
        if (this.cartIsOpen) {
          const cartIcon = e.target.className.baseVal ? true: e.target.className.indexOf('cart') >= 0;
          const crossIcon = e.target.className.baseVal ? true : e.target.className.indexOf('cross') >= 0;
          if (!cartIcon && !crossIcon) {
            this.closeCart();
          }
        }
      },
      totalAmount(price, q) {
        return parseInt(price) * q;
      },
    },
    beforeMount() {
      this.loadJSON('orderData');
    },
  }
</script>

<style lang="scss" scoped>
  .cart__popup {
    position: absolute;
    right: 0;
    height: 100vh;
    width: 40%;
    top: 6rem;
    background: $white;
    box-shadow: -2px 4px 4px 0 rgba(0, 0, 0, 0.2);
    padding: 2rem 2rem 10rem 2rem;
    overflow-y: auto;
    @include screenBreakpoint2(phone) {
      top: 4rem;
      width: 100%;
      box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }

    .icon.cross {
      width: 30px;
      height: 30px;
      &::before, &::after {
        height: 30px;
      }
    }

    .product {
      width: 100%;
      position: relative;
      margin-bottom: 1.4rem;
      overflow: hidden;
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
      flex-direction: column;
      @include screenBreakpoint2(desktop) {
        flex-direction: row;
      }

      &__image {
        width: 180px;
        height: 250px;
        display: block;
        position: relative;
        @include screenBreakpoint2(phone) {
          width: 100%;
          height: 60vh;
          margin-bottom: 0.4rem;
        }
        @include screenBreakpoint2(tablet) {
          width: 100%;
          height: 350px;
          margin-bottom: 0.4rem;
        }
      }

      .column--right {
        display: flex;
        flex-direction: column;
        margin: 0;
        align-items: flex-start;
        p, .product__summary {
          margin: 0.4rem 0;
        }
        @include screenBreakpoint2(desktop) {
          margin-left: 1rem;
        }
      }
      &__title {
        margin: 0;
      }
      &__cta {
        @include screenBreakpoint2(desktop) {
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
</style>
