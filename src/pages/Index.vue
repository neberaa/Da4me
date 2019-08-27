<template>
  <Layout>
    <div class="container">
      <h1 class="hero-title" v-html="settings.hero_title" />
      <h2 class="hero-subtitle" v-html="settings.hero_subtitle" />
      <categories-grid :categories="$page.categories.edges" />
    </div>
  </Layout>
</template>

<page-query>
query Posts {
	categories: allCategoryItem {
    edges {
      node {
        header
        image
        path
      }
    }
  },
  products: allProductItem {
    edges {
      node {
        id
        title
        description
        category
        image
      }
    }
  }
}
</page-query>

<script>
import CategoriesGrid from "@/components/CategoriesGrid"

export default {
  components: {
    CategoriesGrid
  },
  data() {
    return {
      settings: require("../../data/theme.json")
    }
  }
}
</script>
<style lang="scss" scoped>
  .hero-title,
  .hero-subtitle {
    text-align: center;
  }
</style>
