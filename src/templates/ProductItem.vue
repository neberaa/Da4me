<template>
  <Layout>
    <div class="project">

      <div class="container">

        <div class="project-header">
          <h1 class="project-title" v-html="$page.product.title" />
          <g-image :src="$page.product.image" :alt="$page.product.title"/>
          <button @click="addToWishList($page.product.id)" v-show="!isAddedToWishList($page.product.id)">Add to favourite</button>
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
    imageGallery
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
      'addToWishList'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
