<template>
  <Layout>
    <div class="category">
      <div class="container category-container">
        <nav class="breadcrumbs">
          <g-link to="/">Главная/</g-link>
          <g-link to="/categories">Категории</g-link>
        </nav>
        <h1 v-html="$page.category.header" class="category-title" />
        <div class="content">
          <aside class="sidebar">
            <g-link
              :to="item.node.path"
              v-for="item in $page.categories.edges"
              :key="item.node.id">
              {{item.node.header}}
            </g-link>
          </aside>
          <div class="products">
            <g-link
              v-for="product in filteredProducts"
              :to="product.node.path"
              :key="product.node.id"
              class="product__item">
              <p v-text="product.node.title"/>
              <ResponsiveImage
                :url="product.node.image"
                :alt="product.node.title"
                :settings-mobile="'w_400,h_800,c_fill'"
                :settings-tablet="'w_0.5,h_0.5,c_fill'"/>
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
    header
    image
    description
    path
  },
  categories: allCategoryItem {
    edges{
      node {
        id
        path
        header
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
      flex: 0 0 20%;
    }

    .products {
      flex: 0 0 80%;
      display: flex;
      flex-wrap: wrap;
      .product__item {
        display: flex;
        flex-direction: column;
        flex: 0 0 200px;
        overflow: hidden;
        margin: 0 20px 20px;
        p {
          margin-top: 0;
        }
      }
    }
  }

</style>
