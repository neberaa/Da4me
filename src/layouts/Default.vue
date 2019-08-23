<template>
  <div class="layout sticky-header">
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

export default {
  components: {
    Header,
    Footer
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
  font-size: 16px;
  transition: background 0.5s ease;
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
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
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
}

// Vue js animation
.fade-enter-active {
    transition: opacity 2s;
}
.fade-enter {
    opacity: 0;
}

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
</style>
