<template>
  <transition name="slide-right">
    <div class="cart__popup" v-click-outside="manageCart"  v-show="cartIsOpen">
      <button
        class="icon cross"
        @click="closeCart"/>
      <h2 class="cart-title">Корзина</h2>
      <div class="products">
        <div
          v-for="product in orderData"
          :key="product.id"
          class="product">
          <div class="column column--left">
            <g-link
              :to="product.path"
              class="product__image">
              <div
                class="sale-chip"
                v-show="product.oldPrice && product.oldPrice > 0">
                Sale
              </div>
              <ResponsiveImage
                :url="product.imageGallery && product.imageGallery.length > 0 ?
                  product.imageGallery[0] : product.image"
                :alt="product.title"
                :settings-mobile="'w_400,h_800,c_fit'"
                :settings-tablet="'w_300,h_600,c_fit'"
                :settings-desktop="'w_300,h_600,c_fit'"/>
            </g-link>
          </div>
          <div class="column column--right">
            <h5 class="product__title" v-text="product.title"/>
            <p
              class="product__price">
              <span>Цена: </span>
              {{product.price}}, 00 грн
            </p>
            <p
              class="product__size"
              v-show="product.selectedSize">
              <span>Размер: </span>
              {{product.selectedSize}}
            </p>
            <p
              class="product__quantity">
              <span>Кол-во: </span>
              {{product.quantity || 1}} шт
            </p>
            <div
              class="product__summary">
              <span>Сумма: </span>
              {{product.price * (product.quantity || 1)}}, 00 грн
            </div>
            <button
              class="product__cta cta small"
              @click="removeFromOrder(product.id)">
              Убрать из корзины
            </button>
          </div>
        </div>
      </div>
      <p
        class="summary"
        v-show="orderData.length > 0">
        Сумма заказа: {{totalOrderAmount}}, 00 грн
      </p>
      <g-link
        class="cta cart-order blue"
        :to="{ name: 'order' }"
        v-show="orderData.length > 0 && $route.name !== 'order'">
        Оформить заказ
      </g-link>
      <p
        v-show="orderData.length === 0"
        class="empty-text">
        Ваша корзина пуста...
      </p>
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
    watch: {
      $route() {
        if (this.cartIsOpen) {
          this.closeCart();
        }
      }
    },
    methods: {
      ...mapMutations([
        'closeCart',
        'loadJSON',
        'removeFromOrderData',
        'showSnackBar',
      ]),
      manageCart(e) {
        if (this.cartIsOpen) {
          const cartIcon = e.target.className.baseVal ? true: e.target.className.indexOf('cart') >= 0;
          const cta = e.target.className.baseVal ? true : e.target.className.indexOf('cta') >= 0;
          if (!cartIcon && !cta) {
            this.closeCart();
          }
        }
      },
      totalAmount(price, q) {
        return parseInt(price) * q;
      },
      removeFromOrder(id) {
        this.removeFromOrderData(id);
        this.showSnackBar('Товар удален из корзины!');
      }
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
    @include screenBreakpoint2(phone-landscape) {
      top: 4rem;
      width: 100%;
      box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }

    .icon.cross {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 40px;
      &::before, &::after {
        height: 30px;
      }
    }
    .cart-title {
      border-bottom: 1px solid $light-gray;
      padding-left: 4rem;
      margin-top: 0;
      padding-bottom: 1rem;
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
      @include screenBreakpoint2(phone-landscape) {
        flex-direction: row;
      }

      &__image {
        width: 130px;
        height: 200px;
        display: block;
        position: relative;
        @include screenBreakpoint2(phone) {
          width: 100%;
          height: 60vh;
          margin-bottom: 0.4rem;
        }
        @include screenBreakpoint2(phone-landscape) {
          width: 200px;
          height: 300px;
          margin-right: 1.4rem;
          margin-bottom: 0;
        }
        @include screenBreakpoint2(tablet) {
          width: 100%;
          height: 350px;
          margin-bottom: 0.4rem;
        }
        .sale-chip {
          position: absolute;
          top: 10px;
          left: 10px;
          background: $coral;
          color: $white;
          text-transform: uppercase;
          font-size: 0.8rem;
          padding: 5px;
          z-index: 1;
          @include screenBreakpoint2(phone) {
            top: 15px;
            left: 15px;
          }
        }
      }

      .column--right {
        display: flex;
        flex-direction: column;
        margin: 0;
        align-items: flex-start;
        p, div {
          margin-bottom: 0;
          font-size: 0.8rem;
        }
        p, .product__summary {
          margin: 0.4rem 0;
        }
        @include screenBreakpoint2(desktop) {
          margin-left: 1rem;
        }
        p span,
        div span {
          font-weight: bold;
        }
      }
      &__title {
        margin: 0;
      }
      &__size {
        text-transform: uppercase;
        span {
          text-transform: none;
        }
      }
      &__cta {
        margin-top: 0.4rem;
        @include screenBreakpoint2(desktop) {
          position: absolute;
          bottom: 0;
        }
        @include screenBreakpoint2(phone) {
          width: 100%;
        }
        @include screenBreakpoint2(phone-landscape) {
          position: absolute;
          bottom: 0;
          width: auto;
        }
      }
    }
    .summary {
      border-top: 1px solid $light-gray;
      padding-top: 2rem;
      text-transform: uppercase;
      font-weight: bold;
    }
    .cart-order {
      display: block;
    }
  }
</style>
