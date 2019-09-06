<template>
  <transition name="slide-right">
    <div class="cart__popup" v-click-outside="manageCart"  v-show="cartIsOpen">
      <button class="icon cross" data-lock @click="closeCart"/>
      <h2>Корзина</h2>
      <div class="products">
        <div v-for="product in addedProducts" :key="product.node.id" class="product">
          <div class="column column--left">
            <g-link
              :to="product.node.path"
              class="product__image">
              <ResponsiveImage
                :url="product.node.image"
                :alt="product.node.title"
                :settings-mobile="'w_400,h_800,c_fill'"
                :settings-tablet="'w_300,h_600,c_fill'"
                :settings-desktop="'w_300,h_600,c_fill'"/>
            </g-link>
          </div>
          <div class="column column--right">
            <button class="icon cross" data-lock @click="removeFromCart(product.node.id)"/>
            <p class="product__price">Цена: {{product.node.price}}, 00 грн</p>
            <label :for="`quantity-select-${product.node.id}`">Кол-во</label>
            <select :id="`quantity-select-${product.node.id}`" v-model="product.node.quantity">
              <option v-for="i in 10" :key="i" :value="i">{{i || 1}}</option>
            </select>
            <div class="summary">ИТОГО: {{totalAmount(product.node.price, product.node.quantity || 1)}}, 00 грн</div>
          </div>
        </div>
      </div>
      <p v-show="cart.length > 0">Общая сумма заказа: {{totalOrderAmount}}, 00 грн</p>
      <g-link class="cta cart-order" :to="{ name: 'order' }" v-show="cart.length > 0 && $route.name !== 'order'">Оформить заказ</g-link>
      <p v-show="cart.length === 0" class="empty-text">Ваша корзина пуста...</p>
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
    props: {
      Products: {
        type: Array,
        required: false,
      },
    },
    computed: {
      ...mapState([
        'cartIsOpen',
        'cart',
        'orderData'
      ]),
      addedProducts() {
        return this.Products.filter(item => this.cart.includes(item.node.id));
      },
      totalOrderAmount() {
        let total = 0;
        this.addedProducts.forEach(p => {
          const productTotal = parseInt(p.node.price) * parseInt(p.node.quantity || 1);
          total += productTotal;
        });
        return total;
      }
    },
    watch: {
      addedProducts() {
        this.setOrderData(this.addedProducts);
      },
    },
    methods: {
      ...mapMutations([
        'closeCart',
        'removeFromCart',
        'loadJSON',
        'setOrderData'
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
      this.loadJSON('cart');
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
    padding: 2rem 2rem 8rem 2rem;
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
      height: 250px;
      position: relative;
      margin-bottom: 15px;
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      &__image {
        width: 150px;
        height: 200px;
        display: block;
        position: relative;
      }

      &__cta {
        padding: 5px;
        font-size: 0.8rem;
        border: 2px solid $blue;
        margin-top: 10px;
      }
      .column--right {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
        .icon.cross {
          width: 15px;
          height: 15px;
          &::before, &::after {
            height: 15px;
          }
        }
      }
    }
  }
</style>
