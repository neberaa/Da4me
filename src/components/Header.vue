<template>
  <header class="header sticky" v-click-outside="closeMenu">
    <div class="nav-container">
      <div class="container">
        <div class="column column--left">
          <div
            class="hamburger hamburger--spin js-hamburger"
            data-lock
            :class="{'is-active': menuIsOpen}"
            @click="toggleMenu">
            <div class="hamburger-box">
              <div class="hamburger-inner"/>
            </div>
          </div>
          <div class="social-icons">
            <a
              :href="contacts.instagram"
              data-lock
              class="social-icons__item">
              <InstagramIcon class="icon"/>
            </a>
            <a
              :href="contacts.facebook"
              data-lock
              class="social-icons__item">
              <FacebookIcon class="icon"/>
            </a>
          </div>
        </div>
        <div class="column column--center">
          <g-link
            :to="{ name: 'home' }"
            class="home-link">
            <img
              src="../../static/logo.png"
              :alt="settings.site_name"
              class="logo"/>
          </g-link>
        </div>
        <div class="column column--right">
          <a
            :href="`tel:+38${contacts.phone}`"
            class="phone-number">
            +38 {{contacts.phone}}
          </a>
          <a
            href=""
            class="icon wishlist"
            data-lock
            @click.prevent="toggleWishList">
            <HeartIcon
              class="icon"
              :class="{'icon--blue': wishListIsOpen}"/>
          </a>
          <a
            href=""
            data-lock
            class="icon cart"
            :class="{'cart--blue': cartIsOpen}"
            :data-products-count="[cart.length === 0 ? null : cart.length]"
            @click.prevent="toggleCart">
            <CartIcon
              class="icon"
              :class="{'icon--blue': cartIsOpen}"/>
          </a>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div
        class="nav-container nav-container--expandable"
        id="navigation-container"
        v-show="menuIsOpen">
        <div class="bg-wrapper"/>
          <div
            class="container"
            @click="closeMenu">
            <div class="column column--left">
              <h4 class="nav-title">MENU</h4>
              <nav id="nav" class="nav">
                <g-link
                  v-for="(page, ind) in $static.pages.edges"
                  :key="`page-${ind}`"
                  class="nav__link"
                  :to="page.node.path">
                  {{ page.node.title }}
                </g-link>
              </nav>
              <div class="social-icons">
                <a
                  :href="contacts.instagram"
                  data-lock
                  class="social-icons__item">
                  <InstagramIcon class="icon icon--white"/>
                </a>
                <a
                  :href="contacts.facebook"
                  data-lock
                  class="social-icons__item">
                  <FacebookIcon class="icon icon--white"/>
                </a>
              </div>
                <a
                  :href="`tel:+38${contacts.phone}`"
                  class="phone-number phone-number--mobile">
                  +38 {{contacts.phone}}
                </a>
              </div>
            <div class="column column--center">
              <g-link
                :to="{ name: 'home' }"
                class="home-link">
                <img
                  src="../assets/icons/logo5.png"
                  :alt="settings.site_name"
                  class="logo"/>
              </g-link>
            </div>
            <div class="column column--right">
              <a
                :href="`tel:+38${contacts.phone}`"
                class="phone-number">
                +38 {{contacts.phone}}
              </a>
              <a
                href=""
                class="icon wishlist"
                data-lock
                @click.prevent="toggleWishList">
                <HeartIcon class="icon icon--white"/>
              </a>
              <a
                href=""
                data-lock
                class="icon cart cart--white"
                :data-products-count="[cart.length === 0 ? null : cart.length]"
                @click.prevent="toggleCart">
                <CartIcon class="icon icon--white"/>
              </a>
            </div>
          </div>
      </div>
      </transition>
    <WishList :Products="$static.products.edges"/>
    <ShoppingCart :Products="$static.products.edges"/>
  </header>
</template>

<static-query>
query Posts  {
  pages: allPageItem(filter: { showInNav: {eq:true}}) {
    edges{
      node{
       title
       path
      }
    }
  },
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
</static-query>

<script>
import ClickOutside from 'vue-click-outside';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import InstagramIcon from '../assets/icons/instagram.svg';
import FacebookIcon from '../assets/icons/facebook.svg';
import CartIcon from '../assets/icons/shopping-bag.svg';
import HeartIcon from '../assets/icons/heart.svg';
import WishList from "./WishList";
import { mapMutations, mapState } from 'vuex';
import ShoppingCart from "./ShoppingCart";

export default {
  directives: {
    ClickOutside
  },
  inject: ['resp'],
  components: {
    ShoppingCart,
    InstagramIcon,
    FacebookIcon,
    CartIcon,
    HeartIcon,
    WishList,
  },
  data() {
    return {
      logo: require("../../static/logo.png"),
      settings: require("../../data/theme.json"),
      contacts: require("../../data/contacts.json"),
      href: null,
    }
  },
  computed: {
    ...mapState([
      'menuIsOpen',
      'wishListIsOpen',
      'cartIsOpen',
      'cart'
    ]),
    isMobile() {
      const { width, height } = window.screen;
      const iPhoneXR = this.resp.device.tablet && height === 896 && width === 414;
      return this.resp.device.mobile || iPhoneXR;
    }
  },
  methods: {
    ...mapMutations([
      'toggleWishList',
      'toggleMenu',
      'closeMenu',
      'closeWishList',
      'closeCart',
      'toggleCart'
    ]),
    checkHeader() {
      let scrollPosition = Math.round(window.scrollY);
      if (scrollPosition > 50){
        document.querySelector('header').classList.add('sticky');
      }
      else {
        document.querySelector('header').classList.remove('sticky');
      }
    },
    switchScroll(cond) {
      const navContainer = document.getElementById('navigation-container');
      if (cond) {
        disableBodyScroll(navContainer);
        setTimeout(() => {
          document.body.classList.add('scroll-lock');
        }, 0);
      } else {
        console.log('enable body scroll');
        enableBodyScroll(navContainer);
        setTimeout(() => {
          document.body.classList.remove('scroll-lock');
        }, 0);
      }
    },
  },
  watch: {
    menuIsOpen(cond) {
      if (cond) {
        this.closeWishList();
        this.closeCart();
      }
      this.switchScroll(cond);
    },
    wishListIsOpen(cond) {
      if (cond) {
        this.closeMenu();
        this.closeCart();
      }
    },
    cartIsOpen(cond) {
      if (cond) {
        this.closeMenu();
        this.closeWishList();
      }
    },
    href() {
      if (this.menuIsOpen) {
        this.closeMenu();
        clearAllBodyScrollLocks();
      }
      if (this.wishListIsOpen) {
        this.closeWishList();
      }
      if (this.cartIsOpen) {
        this.closeCart();
      }
    }
  },
  beforeMount() {
    this.href = window.location.href;
  },
  mounted() {
    document.querySelector('header').classList.remove('sticky');
    window.addEventListener('scroll', this.checkHeader);
  }
}
</script>

<style lang="scss" scoped>
@import "~hamburgers/_sass/hamburgers/hamburgers";

.header {
  height: 6rem;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  background: $white;
  position: fixed;
  box-shadow: none;
  transition: box-shadow 400ms ease;
  @include screenBreakpoint2(phone) {
    height: 4rem;
  }

  &.sticky {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }

  .nav-container {
    height: inherit;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;

      .icon {
        width: 30px;
        height: 30px;
        &.cart {
          position: relative;
          &::after {
            display: block;
            content: attr(data-products-count);
            @include center('both');
            height: 15px;
            color: $gray;
          }
          &.cart--blue {
            &::after {
              color: $blue;
            }
          }
          &.cart--white {
            &::after {
              color: $white;
            }
          }
        }
      }

      .column {
        display: flex;
        align-items: center;

        &--left {
          justify-content: flex-start;

          .hamburger {
            position: relative;
            padding: 0;
            height: 22px;
            z-index: 100;

            &-inner,
            &-inner::before,
            &-inner::after {
              height: 2px;
              background-color: $gray;
            }

            &.is-active {
              .hamburger-inner,
              .hamburger-inner::before,
              .hamburger-inner::after {
                background-color: $white;
              }
            }
          }

          .social-icons {
            padding-left: 100px;
            display: none;
            @include screenBreakpoint2(desktop) {
              display: flex;
            }

            &__item {
              display: block;
              width: 30px;
              height: 30px;

              &:not(:first-of-type) {
                margin-left: 20px;
              }
            }
          }
        }

        &--center {
          justify-content: center;
          @include center('x');
          top: 0;

          .logo {
            width: 150px;
            @include screenBreakpoint2(phone) {
              width: 100px;
            }
          }
        }

        &--right {
          justify-content: flex-end;

          a:not(:last-of-type) {
            margin-right: 20px;
          }

          .phone-number {
            color: $gray;
            display: none;
            @include screenBreakpoint2(desktop) {
              display: block;
            }
          }
        }
      }
    }

    &--expandable {
      background: rgba($gray, 0.9);
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: 30rem;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

      .bg-wrapper {
        background: $gray;
        height: 6rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: -1;
        @include screenBreakpoint2(phone) {
          height: 4rem;
        }
      }

      .container {
        position: relative;
        align-items: flex-start;
        padding-top: 1rem;
        overflow: hidden;
        @include screenBreakpoint2(phone) {
          padding-top: 0;
        }

        .column {
          position: absolute;

          &--left {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 5rem;
            @include screenBreakpoint2(phone) {
              margin-top: 4rem;
            }

            .nav-title {
              text-transform: uppercase;
              color: $white;
              margin-bottom: 4rem;
              margin-top: 0;
            }

            .nav {
              display: flex;
              flex-direction: column;
              text-align: left;
              margin-bottom: 1rem;

              &__link {
                text-decoration: none;
                color: $white;
                margin-bottom: 5px;
              }
            }

            .social-icons {
              padding-left: 0;
              display: flex;
              margin-bottom: 1rem;


              &__item {
                width: 30px;
                height: 30px;
                display: block;

                &:not(:first-of-type) {
                  margin-left: 10px;
                }
              }
            }

            .phone-number {
              display: block;
              color: $white;
              @include screenBreakpoint2(desktop) {
                display: none;
              }
            }
          }

          &--center {
            @include center('x');
            margin-top: 0;
            @include screenBreakpoint2(phone) {
              margin-top: 1rem;
            }

            .logo {
              width: 120px;
              @include screenBreakpoint2(phone) {
                width: 80px;
              }
            }
          }

          &--right {
            margin-top: 1rem;
            right: 2rem;
            @include screenBreakpoint2(desktop) {
              right: 6rem;
            }

            .phone-number {
              color: $white;
            }
          }
        }
      }
    }
  }
}



</style>
