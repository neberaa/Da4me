<template>
  <Layout>
    <div class="container">
      <Hero />
      <categories-grid :categories="$page.categories.edges" />
    </div>
  </Layout>
</template>

<page-query>
query Posts {
	categories: allCategoryItem {
    edges {
      node {
        title
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
import Hero from "@/components/Hero"
import CategoriesGrid from "@/components/CategoriesGrid"

export default {
  components: {
    Hero,
    CategoriesGrid
  }
}
</script>
