<template>
  <Layout>
    <div class="category">
      <div class="container category-container">

          <nav class="breadcrumbs">
              <g-link to="/">Главная/</g-link>
              <g-link to="/categories">Категории</g-link>
          </nav>
          <h1 v-html="$page.category.title" class="category-title" />
          <div class="content">
              <aside class="sidebar">
                  <g-link
                          :to="item.node.path"
                          v-for="item in $page.categories.edges"
                          :key="item.node.id">
                      {{item.node.title}}
                  </g-link>
              </aside>
              <div class="products">
                  <g-link
                          v-for="product in filteredProducts"
                          :to="product.node.path"
                          :key="product.node.id"
                          class="product__item">
                      {{product.node.title}}
                      <g-image
                              :src="product.node.image"
                              :alt="product.node.title"/>
                  </g-link>
              </div>
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

<style lang="scss" scoped>
    a.active {
        color: red;
    }
    .breadcrumbs {
        margin: 20px 0;
    }
    .content {
        display: flex;
        .sidebar {
            display: flex;
            flex-direction: column;
        }
        .products {
            display: flex;
            .product__item {
                display: block;
                width: 300px;
                height: 600px;
                overflow: hidden;
                border: 1px solid darkgray;
                margin: 0 20px;
            }
        }
    }

</style>
