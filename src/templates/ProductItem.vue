<template>
  <Layout>
    <div class="product">
      <div class="container">
        <div class="product__item">
          <h1 class="project-title" v-html="$page.product.title" />
          <g-image :src="$page.product.image" :alt="$page.product.title"/>
          <button @click="addToWishList($page.product.id)" v-show="!isAddedToWishList($page.product.id)">Add to favourite</button>
          <button @click="removeFromWishList($page.product.id)" v-show="isAddedToWishList($page.product.id)">Remove from favourite</button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ProductItem ($path: String!) {
  product: productItem (path: $path) {
    title
    image
    description
    id
  }
}
</page-query>

<script>
    import { mapGetters, mapMutations } from 'vuex';
export default {
  metaInfo () {
    return {
      title: this.$page.product.title,
    }
  },
  computed: {
    ...mapGetters([
      'isAddedToWishList'
    ])
  },
  methods: {
    ...mapMutations([
      'addToWishList',
      'removeFromWishList'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .product__item {
    display: flex;
    flex-direction: column;
    flex: 1 1 300px;
    justify-content: center;
    align-items: flex-start;
  }
  button {
    padding: 10px;
    border: 2px solid $blue;
    margin-top: 20px;
  }
</style>
