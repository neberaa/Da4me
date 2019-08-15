<template>
  <Layout>
    <div class="project">

      <div class="container">

        <div class="project-header">
          <h1 class="project-title" v-html="$page.product.title" />
            <g-image :src="$page.product.image" :alt="$page.product.title"/>
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
  }
}
</page-query>

<script>
export default {
  metaInfo () {
    return {
      title: this.$page.product.title,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
