<template>
  <div class="categories">
    <g-link
      :to="item.node.path"
      class="category"
      v-for="(item, ind) in categories"
      :key="item.node.id">
      <div class="category__image">
        <picture>
          <source
            media="screen and (max-width: 767px)"
            :srcset="setImage(item.node.image, 'w_300,h_600,c_fill')">
          <source
            media="screen and (min-width: 768px) and (max-width: 1199px)"
            :srcset="setImage(item.node.image, 'w_0.5,h_0.5,c_fill')">
          <source
            media="screen and (min-width: 1200px)"
            :srcset="setImage(item.node.image)">
          <img
            :scr="setImage(item.node.image)"
            :alt="item.node.title || null">
        </picture>
      </div>
      <button
        data-lock
        class="category__cta cta">
        {{ item.node.header }}
      </button>
    </g-link>
    </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
  .categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 350px;
    grid-gap: 1.5rem;
    grid-auto-flow: dense;
    @include screenBreakpoint2(phone) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-auto-rows: 400px;
    }
    .category {
      overflow: hidden;
      position: relative;
      &:first-child {
        grid-column: span 2;
        grid-row: span 2;
        @include screenBreakpoint2(phone) {
          grid-column: span 1;
          grid-row: span 1;
        }
      }
      &:nth-child(4n) {
        grid-column: span 2;
        grid-row: span 2;
        @include screenBreakpoint2(phone) {
          grid-column: span 1;
          grid-row: span 1;
        }
      }
      &:nth-child(5n) {
        grid-column: span 2;
        grid-row: span 1;
        @include screenBreakpoint2(phone) {
          grid-column: span 1;
          grid-row: span 1;
        }
      }
      &:nth-child(8n) {
        grid-column: span 2;
        grid-row: span 2;
        @include screenBreakpoint2(phone) {
          grid-column: span 1;
          grid-row: span 1;
        }
      }
      &:nth-child(9n) {
        grid-column: span 2;
        grid-row: span 1;
        @include screenBreakpoint2(phone) {
          grid-column: span 1;
          grid-row: span 1;
        }
      }
      &:hover {
        .category__image {
          transform: scale(1.1);
        }
      }
      &__image {
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
        position: relative;
      }
      &__cta {
        @include center('x');
        bottom: 15px;
        width: 150px;
        text-align: center;
        white-space: normal;
      }
    }
  }
</style>
