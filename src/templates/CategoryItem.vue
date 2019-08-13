<template>
  <Layout>
    <div class="category">
      <div class="container category-container">
          <g-link
                  :to="item.node.path"
                  v-for="item in $page.categories.edges"
                  :key="item.node.id">
              {{item.node.title}}
          </g-link>
        <h1 v-html="$page.category.title" class="category-title" />
          <p>{{$page.category.path}}</p>
          <div v-for="product in filteredProducts">
              <g-link
                  :to="product.node.path"
                  :key="product.node.id"
                  class="product__item">
                  {{product.node.title}}
                  <img
                      :src="product.node.image"
                      :alt="product.node.title">
              </g-link>
          </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query CategoryItem ($path: String!) {
  category: categoryItem (path: $path) {
    title
    image
    description
    path
  },
  categories: allCategoryItem {
    edges{
      node {
        id
        path
        title
      }
    }
  },
  products: allProductItem {
    edges {
      node {
        title
        category
        image
        path
      }
    }
  }
}
</page-query>

<script>

export default {
  computed: {
    filteredProducts() {
      return this.$page.products.edges.filter(p => {
        const category = `/${p.node.category}.md`;
        return category.indexOf(this.$route.path) > -1;
      });
    }
  },
}
</script>

<style scoped>
    a.active {
        color: red;
    }
</style>
