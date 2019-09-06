<template>
  <Layout>
    <div class="container">
      <h1 class="header">
         All products
      </h1>
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
            :to="item.node.path"
            v-for="item in $page.products.edges"
            :key="item.node.id"
            class="product__item">
            <h4 class="title" v-text="item.node.title"/>
            <div class="image-container">
              <ResponsiveImage
                :url="item.node.image"
                :alt="item.node.title"
                :settings-mobile="'w_400,h_800,c_fit'"
                :settings-tablet="'w_0.5,h_0.5,c_fit'"/>
            </div>
          </g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
  query Posts {
    products: allProductItem {
      edges {
        node {
          id
          path
          title
          image
        }
      }
    },
    categories: allCategoryItem {
      edges{
        node {
          id
          path
          header
        }
      }
    }
  }
</page-query>

<script>
  export default {
  }
</script>

<style scoped>
  .content {
    display: flex;
  }
  .sidebar {
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
  }
  .products {
    flex: 0 0 80%;
    display: flex;
    flex-wrap: wrap;
   }
  .product__item {
    display: block;
    width: 200px;
    height: 300px;
    overflow: hidden;
    margin: 0 20px;
  }
  .title {
    margin-top: 0;
  }
  .image-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
