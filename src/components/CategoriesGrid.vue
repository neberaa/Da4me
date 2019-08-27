<template>
    <div class="categories">
      <g-link
        :to="item.node.path"
        class="category"
        v-for="(item, ind) in categories"
        :key="item.node.id">
        <div
          class="category__image"
          :style="{'background-image' : `url(${item.node.image})`}"/>
        <button
          data-lock
          class="category__cta">
          {{ item.node.header }}
        </button>
      </g-link>
      <div class="category item3" ></div>
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
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-auto-rows: 400px;
      grid-gap: 1rem;
      grid-auto-flow: dense;
      .category {
        overflow: hidden;
        position: relative;
        &:hover {
          .category__image {
            transform: scale(1.1);
          }
        }
        &__image {
          width: 100%;
          height: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          transition: all 0.3s ease;
        }
        &__cta {
          @include center('x');
          bottom: 15px;
          padding: 10px 15px;
          background: $white;
          outline: 2px solid $blue;
          font-size: 1rem;
          color: $gray;
          outline-offset: -4px;
          white-space: nowrap;
          font-weight: bold;
        }
      }
    }
</style>
