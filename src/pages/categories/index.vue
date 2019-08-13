<template>
    <Layout>

        <div class="container">
            <div class="journal-hero">
                <h1 class="journal-header">
                    a wise person once said...
                </h1>
            </div>
            <g-link
                    :to="item.node.path"
                    v-for="item in $page.categories.edges"
                    :key="item.node.id">
                    {{item.node.title}}
            </g-link>
        </div>

            <g-link
              :to="item.node.path"
              v-for="item in $page.products.edges"
              :key="item.node.id"
              class="product__item"
            >
              <div class="container journal">
                <h2 class="journal-title">{{ item.node.title }}</h2>
                  <img :src="item.node.image" :alt="item.node.title">
              </div>
            </g-link>

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
        title
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
</style>
