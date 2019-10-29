<template>
  <div class="layout sticky-header">
    <Header />
      <transition name="fade" appear>
        <main class="page-content">
          <slot/>
        </main>
      </transition>
    <snack-bar/>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SnackBar from "@/components/SnackBar"

export default {
  components: {
    SnackBar,
    Header,
    Footer
  },
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
  color: $gray;
  @include screenBreakpoint2(desktop) {
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
h5 {
  font-size: 1.2rem;
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
  &.small {
    font-size: 0.6rem;
  }
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
  border: 1px solid $gray;
  text-align: center;
  transition: all 300ms ease;
  &:hover {
    background: $gray;
    color: $white;
  }
  &.blue {
    border-color: $blue;
    &:hover {
      background: $blue;
      color: $white;
    }
  }
  &.red {
    border-color: $red;
    &:hover {
      background: $red;
      color: $white;
    }
  }
  &.outline {
    border:none;
    outline: 1px solid $gray;
    outline-offset: -4px;
    &.blue {
      outline: 1px solid $blue;
      &:hover {
        outline-color: $white;
      }
    }
    &.red {
      outline: 1px solid $red;
    }
  }
  &.thin {
    border-width: 1px;
    font-weight: normal;
    &.outline {
      outline-width: 1px;
    }
  }
  &.inactive {
    cursor: not-allowed;
    border: 1px solid $light-gray;
    color: $light-gray;
    &:hover {
      border: 1px solid $light-gray;
      color: $light-gray;
      background: $white;
    }
  }
  &.small {
    font-size: 0.8rem;
    padding: 10px;
  }
}
input,
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input {
  height: 45px;
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
textarea {
  resize: none;
  border: 1px solid rgba($gray, 0.3);
  font-family: 'Didact Gothic';
  font-size: 1rem;
  padding: 10px;
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
  margin-bottom: 0.4rem;
}

.icon {
  fill: $gray;
  transition: fill 300ms ease;
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
    &.white {
      fill: $white;
      &::before, &::after {
        background-color: $white;
      }
    }
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
