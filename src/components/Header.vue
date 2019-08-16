<template>
    <header class="header sticky" v-click-outside="closeMenu">
        <div class="nav-container">
            <div class="container">
                <div class="column column--left">
                    <div class="hamburger hamburger--spin js-hamburger" :class="{'is-active': menuIsOpen}" @click="toggleMenu">
                        <div class="hamburger-box">
                            <div class="hamburger-inner"></div>
                        </div>
                    </div>
                    <div class="social-icons">
                        <a :href="contacts.instagram" class="social-icons__item">
                            <InstagramIcon class="icon"/>
                        </a>
                        <a :href="contacts.facebook" class="social-icons__item">
                            <FacebookIcon class="icon"/>
                        </a>
                    </div>
                </div>
                <div class="column column--center">
                    <g-link :to="{ name: 'home' }" class="home-link">
                        <img
                                src="../../static/logo.png"
                                :alt="settings.site_name"
                                class="logo"/>
                    </g-link>
                </div>
                <div class="column column--right">
                    <a :href="`tel:+38${contacts.phone}`" class="phone-number">+38 {{contacts.phone}}</a>
                    <a href="" class="icon wishlist">
                        <HeartIcon class="icon"/>
                    </a>
                    <a href="" class="icon cart">
                        <CartIcon class="icon"/>
                    </a>
                </div>
            </div>
        </div>
        <transition name="slide">
            <div class="nav-container nav-container--expandable" id="navigation-container" v-show="menuIsOpen">
                <div class="bg-wrapper"/>
                <div class="container" @click="closeMenu">
                    <div class="column column--left">
                        <h4 class="nav-title">MENU</h4>
                        <nav id="nav" class="nav">
                            <g-link
                                    v-for="(page, ind) in $static.pages.edges"
                                    :key="`page-${ind}`"
                                    class="nav__link"
                                    :to="page.node.path">{{ page.node.title }}</g-link>
                        </nav>
                        <div class="social-icons">
                            <a :href="contacts.instagram" class="social-icons__item">
                                <InstagramIcon class="icon icon--white"/>
                            </a>
                            <a :href="contacts.facebook" class="social-icons__item">
                                <FacebookIcon class="icon icon--white"/>
                            </a>
                        </div>
                        <a :href="`tel:+38${contacts.phone}`" class="phone-number phone-number--mobile">+38 {{contacts.phone}}</a>
                    </div>
                    <div class="column column--center">
                        <g-link :to="{ name: 'home' }" class="home-link">
                            <img
                                    src="../assets/icons/logo5.png"
                                    :alt="settings.site_name"
                                    class="logo"/>
                        </g-link>
                    </div>
                    <div class="column column--right">
                        <a :href="`tel:+38${contacts.phone}`" class="phone-number">+38 {{contacts.phone}}</a>
                        <a href="" class="icon wishlist">
                            <HeartIcon class="icon icon--white"/>
                        </a>
                        <a href="" class="icon cart">
                            <CartIcon class="icon icon--white"/>
                        </a>
                    </div>
                </div>
            </div>
        </transition>
    </header>
</template>

<static-query>
query allPageItem  {
  pages: allPageItem(filter: { showInNav: {eq:true}}) {
    edges{
      node{
       title
       path
      }
    }
  }
}
</static-query>

<script>
import ClickOutside from 'vue-click-outside';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import InstagramIcon from '../assets/icons/instagram.svg';
import FacebookIcon from '../assets/icons/facebook.svg';
import CartIcon from '../assets/icons/shopping-bag.svg';
import HeartIcon from '../assets/icons/heart.svg';

export default {
  directives: {
    ClickOutside
  },
  components: {
    InstagramIcon,
    FacebookIcon,
    CartIcon,
    HeartIcon,
  },
  data() {
    return {
      logo: require("../../static/logo.png"),
      settings: require("../../data/theme.json"),
      contacts: require("../../data/contacts.json"),
      menuIsOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    closeMenu() {
      console.log('close menu');
      if(this.menuIsOpen) {
        this.menuIsOpen = false;
      }
    },
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
        enableBodyScroll(navContainer);
        setTimeout(() => {
          document.body.classList.remove('scroll-lock');
        }, 0);
      }
    },
  },
  watch: {
    menuIsOpen(cond) {
      console.log('menu is open', this.menuIsOpen);
        this.switchScroll(cond);
    },
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
    &.sticky {
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    }
    .nav-container {
        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            .icon {
                width: 30px;
                height: 30px;
                fill: $gray;
                &--white {
                    fill: $white;
                }
            }
            .column {
                display: flex;
                align-items: center;
                &--left {
                    justify-content: flex-start;
                    .hamburger {
                        position: absolute;
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
                            display: block;
                        }
                        &__item:not(:first-of-type) {
                            margin-left: 20px;
                        }
                    }
                }
                &--center {
                    justify-content: center;
                    .logo {
                        width: 150px;
                        transition: width 400ms ease;
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
            background: rgba($gray, 0.7);
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            height: 20rem;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
            .bg-wrapper {
                background: $gray;
                height: 6rem;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: -1;
            }
            .container {
                align-items: flex-start;
                padding-top: 1rem;
                .column {
                    &--left {
                        margin-left: 60px;
                        flex-direction: column;
                        align-items: flex-start;
                        .nav-title {
                            text-transform: uppercase;
                            color: $white;
                            margin-bottom: 40px;
                        }
                        .nav {
                            display: flex;
                            flex-direction: column;
                            text-align: left;
                            &__link {
                                text-decoration: none;
                                color: $white;
                                margin-bottom: 5px;
                                &:last-of-type {
                                    margin-bottom: 20px;
                                }
                            }
                        }
                        .social-icons {
                            padding-left: 0;
                            display: block;
                            margin-bottom: 10px;
                            &__item:not(:first-of-type) {
                                margin-left: 10px;
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
                        .logo {
                            width: 120px;
                        }
                    }
                    &--right {
                        margin-top: 1rem;
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
