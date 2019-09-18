<template>
  <div class="layout sticky-header">
    <div class="cursor"></div>
    <div class="cursor-follower"></div>
    <Header />
      <transition name="fade" appear>
        <main class="page-content">
          <slot/>
        </main>
      </transition>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { TweenMax } from "gsap/TweenMax";
import $ from 'jquery';

export default {
  components: {
    Header,
    Footer
  },
  methods: {
    initCustomCursor() {
      const cursor = $(".cursor"),
        follower = $(".cursor-follower");

      let posX = 0,
        posY = 0;

      let mouseX = 0,
        mouseY = 0;

      TweenMax.to({}, 0.016, {
        repeat: -1,
        onRepeat: function() {
          posX += (mouseX - posX) / 9;
          posY += (mouseY - posY) / 9;

          TweenMax.set(follower, {
            css: {
              left: posX - 12,
              top: posY - 12
            }
          });

          TweenMax.set(cursor, {
            css: {
              left: mouseX,
              top: mouseY
            }
          });
        }
      });

      $(document).on("mousemove", function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      });

      $("[data-lock]").on("mouseenter", function() {
        cursor.addClass("active");
        follower.addClass("active");
      });
      $("[data-lock]").on("mouseleave", function() {
        cursor.removeClass("active");
        follower.removeClass("active");
      });
    }
  },
  mounted() {
    // Add active cursor to all cta buttons
    const buttons = document.querySelectorAll('.cta');
    buttons.forEach(b => {
      b.setAttribute('data-lock', '');
    });
    this.initCustomCursor();
  }
}
</script>


<style lang="scss">

* {
  box-sizing: border-box;
}

body {
  font-family: 'Didact Gothic',system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding: 0;
  font-size: 14px;
  transition: background 0.5s ease;
  overflow-x: hidden;
  @include screenBreakpoint2(desktop) {
    cursor: none;
    font-size: 16px;
  }
  &.scroll-lock {
    @include screenBreakpoint2(desktop) {
      padding-right: 17px;
    }
  }
}

h1 {
  letter-spacing: -0.01em;
  font-size: 2.2rem;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.8rem;
}
h4 {
  font-size: 1.4rem;
}
a {
  color: inherit;
  text-decoration: none;
  font-size: 1rem;
}
p {
  font-size: 1rem;
}
span {
  font-size: 0.8rem;
}

img {
  max-width: 100%;
}

button {
  border: none;
  overflow: visible;
  background-color: transparent;
  cursor: pointer;
  color: inherit;
  font: inherit;
  text-align: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
  &.cta.outline {
    &:focus {
      outline: 2px solid $gray;
    }
    &.blue {
      &:focus {
        outline: 2px solid $blue;
      }
    }
  }
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
}
.cta {
  padding: 10px 15px;
  background: $white;
  font-size: 1rem;
  color: $gray;
  white-space: nowrap;
  font-weight: bold;
  border: 2px solid $gray;
  &.blue {
    border-color: $blue;
  }
  &.outline {
    border:none;
    outline: 2px solid $gray;
    outline-offset: -4px;
    &.blue {
      outline: 2px solid $blue;
    }
  }
}
input {
  height: 35px;
  border: 1px solid rgba($gray, 0.3);
  transition: all 300ms ease;
  font-family: 'Didact Gothic';
  font-size: 1rem;
  padding: 10px;
  &:invalid {
    border: 1px solid rgba($red, 0.5);
  }
  &:focus {
    border: 1px solid rgba($blue, 0.5);
    outline: none;
  }
}

.layout {
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  &.sticky-header {
    padding: 6rem 0 0 0;
    @include screenBreakpoint2(phone) {
      padding-top: 4rem;
    }
  }
}

main.page-content {
  padding-bottom: 6rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 6rem;
  overflow-x: hidden;
  @include screenBreakpoint2(phone) {
    padding: 0 2rem;
  }
}

.label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.icon {
  fill: $gray;
  &--white {
    fill: $white;
  }
  &--blue {
    fill: $blue;
  }
  &--coral {
    fill: $coral;
  }
  &.cross {
    position: relative;
    background-color: transparent;
    border: none;

    &::before, &::after {
      position: absolute;
      content: ' ';
      width: 2px;
      background-color: $gray;
      top: 0;
      z-index: 10;
      right: 50%;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}
// Custom cursor
.cursor {
  @include screenBreakpoint2(desktop) {
    display: block;
  }
  display: none;
  position: absolute;
  background-color: $gray;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  transition: 0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
  0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  transform: scale(1);

  &.active {
    opacity: 0.5;
    transform: scale(0);
  }

  &.hovered {
    opacity: 0.08;
  }
}
.cursor-follower {
  @include screenBreakpoint2(desktop) {
    display: block;
  }
  display: none;
  position: absolute;
  background-color: rgba($gray, 0.3);
  width: 40px;
  height: 40px;
  border-radius: 100%;
  transition: 0.6s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
  0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  transform: translate(0px, 0px);

  &.active {
    opacity: 0.7;
    transform: scale(2);
  }

  &.hovered {
    opacity: 0.08;
  }
}


// Vue js animation
// Fade
.fade-enter-active {
    transition: opacity 2s;
}
.fade-enter {
    opacity: 0;
}
// Fade 400
.fade400-enter-active {
  transition: opacity 400ms ease;
}
.fade400-enter {
  opacity: 0;
}
// Slide from top
.slide-enter-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
}

.slide-leave-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
    max-height: 600px;
    overflow: hidden;
}

.slide-enter, .slide-leave-to {
    overflow: hidden;
    max-height: 0;
}

//slide-right
.slide-right-enter-active {
  transition: all 0.5s  ease-in;
}
.slide-right-leave-active {
  transition: all 0.6s cubic-bezier(0, 1, 0.5, 1);
}
.slide-right-enter-to, .slide-right-leave {
  transform: translateX(0);
}
.slide-right-enter, .slide-right-leave-to {
  transform: translateX(100%);
}
</style>
