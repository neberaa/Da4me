<template>
    <header class="header sticky" v-click-outside="closeMenu">
        <div class="container">
            <transition name="slide">
                <section class="navigation-container" id="navigation-container" v-show="menuIsOpen">
                    <div class="container" @click="closeMenu">
                        <g-link :to="{ name: 'home' }" class="home-link">
                            <img
                                src="../assets/icons/logo5.png"
                                :alt="settings.site_name"
                                class="logo"/>
                        </g-link>
                        <nav id="nav" class="nav">
                            <g-link
                                v-for="(page, ind) in $static.pages.edges"
                                :key="`page-${ind}`"
                                class="nav__link"
                                :to="page.node.path">{{ page.node.title }}</g-link>
                        </nav>
                    </div>
            </section>
            </transition>
            <div class="column column--left">
                <div class="hamburger hamburger--spin js-hamburger" :class="{'is-active': menuIsOpen}" @click="toggleMenu">
                    <div class="hamburger-box">
                        <div class="hamburger-inner"></div>
                    </div>
                </div>
                <a href="" class="icon social-icon instagram"/>
                <a href="" class="icon social-icon facebook"/>
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
                <a href="tel:" class="phone-number"/>
                <a href="" class="icon wishlist"/>
                <a href="" class="icon cart"/>
            </div>
        </div>
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
export default {
  directives: {
    ClickOutside
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
    }
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
    transition: all 200ms ease;
    &.sticky {
      height: 4rem;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.4);
        .column--center {
            .logo {
                width: 100px;
            }
        }
    }
    & > .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }

    .navigation-container {
        background: rgba(75,75,75,1);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        height: 20rem;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.4);
        .container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 20px;
            .home-link {
                display: block;
                margin-bottom: 30px;
            }
            .nav {
                display: flex;
                flex-direction: column;
                text-align: center;
                width: 100%;
                &__link {
                    text-decoration: none;
                    color: $white;
                    line-height: 30px;
                    &:not(:last-child) {
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
    .column {
        &--left {
            .hamburger {
                padding: 0;
                &-inner,
                &-inner::before,
                &-inner::after {
                    height: 3px;
                }
                &.is-active {
                    .hamburger-inner,
                    .hamburger-inner::before,
                    .hamburger-inner::after {
                        background-color: $white;
                    }
                }
            }
        }
    }

}
.scroll-lock .header {
    /*position: absolute;*/
    /*padding-right: 17px;*/
}



</style>
