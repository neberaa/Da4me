<template>
  <Layout>
    <div class="category">
      <div class="container category-container">
        <nav class="breadcrumbs">
          <g-link class="breadcrumbs__item" to="/">Главная/</g-link>
          <g-link class="breadcrumbs__item" to="/categories">Категории/</g-link>
          <g-link class="breadcrumbs__item" to="">{{$page.category.header}}</g-link>
        </nav>
        <h1 v-html="$page.category.header" class="title" />
        <div class="content">
          <aside class="sidebar">
            <div class="category-menu">
              <h4 class="sidebar__title">Категории</h4>
              <g-link
                :to="item.node.path"
                v-for="item in $page.categories.edges"
                :key="item.node.id">
                {{item.node.header}}
              </g-link>
            </div>
            <div class="category-sort">
              <h4 class="category-sort__title">Сортировать:</h4>
              <button class="category-sort__item cta" v-for="item in sortItems" @click="sortBy(item.sortBy, item.index)" :class="{active: activeSortItem === item.index}" v-text="item.name"/>
            </div>
          </aside>
          <div class="products">
            <g-link
              v-for="product in filteredProducts"
              :to="product.node.path"
              :key="product.node.id"
              class="product__item">
              <div class="image-container">
                <ResponsiveImage
                  :url="product.node.image"
                  :alt="product.node.title"
                  :settings-mobile="'w_400,h_800,c_fit'"
                  :settings-tablet="'w_0.5,h_0.5,c_fit'"/>
              </div>
              <p v-text="product.node.title"/>
              <div class="price">
                <SignIcon class="icon price__icon"/>
                <span class="price__value">{{product.node.price}}, 00 грн</span>
              </div>
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
        price
      }
    }
  }
}
</page-query>

<script>
  import SignIcon from '../assets/icons/sign.svg';
export default {
  components: {
    SignIcon,
  },
  data() {
    return {
      sortItems: [
        {name: 'название: А - Я', sortBy: 'nameAsc', index: 0},
        {name: 'название: Я - A', sortBy: 'nameDesc', index: 1},
        {name: 'цена: по убыванию', sortBy: 'priceDesc', index: 2},
        {name: 'цена: по возрастанию', sortBy: 'priceAsc', index: 3},
      ],
      activeSortItem: 0,
    }
  },
  computed: {
    filteredProducts() {
      return this.$page.products.edges.filter(p => {
        const category = `/${p.node.category}.md`;
        return category.indexOf(this.$route.path) > -1;
      });
    }
  },
  methods: {
    sortBy(value, ind) {
      this.activeSortItem = ind;
      this.filteredProducts.sort((a, b) => {
        if (value === 'nameDesc') {
          const nameA = a.node.title.toUpperCase();
          const nameB = b.node.title.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        }
        if (value === 'nameAsc') {
          const nameA = a.node.title.toUpperCase();
          const nameB = b.node.title.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
        if (value === 'priceAsc') {
          return a.node.price - b.node.price;
        }
        if (value === 'priceDesc') {
          return b.node.price - a.node.price;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    margin: 20px 0;
    &__item {
      color: $gray;
    }
  }
  .title {
    text-align: center;
  }
  .content {
    display: flex;
    align-items: flex-start;
    @include screenBreakpoint2(phone) {
      flex-direction: column;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      flex: 0 0 20%;
      @include screenBreakpoint2(phone) {
        flex-direction: row;
        flex: 1 1 100%;
        width: 100%;
        border-bottom: 1px solid $light-gray;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
      }
      h4 {
        color: $blue;
        font-weight: normal;
        margin-bottom: 1rem;
        @include screenBreakpoint2(phone) {
          font-size: 1.2rem;
        }
      }
      .category-menu {
        display: flex;
        flex-direction: column;
        a.active {
          color: $blue;
        }
        @include screenBreakpoint2(phone) {
          margin-right: 1rem;
        }
      }
      .category-sort {
        display: flex;
        flex-direction: column;
        &__item {
          padding: 5px 10px;
          text-align: center;
          border-radius: 2rem;
          transition: all 300ms ease;
          @include screenBreakpoint2(phone) {
            font-size: 0.8rem;
            padding: 5px;
          }
          &.active {
            border-color: $blue;
            color: $blue;
          }
          &:not(:last-of-type) {
            margin-bottom: 0.5rem;
          }
        }
      }
    }

    .products {
      flex: 0 0 80%;
      display: flex;
      flex-wrap: wrap;
      @include screenBreakpoint2(phone) {
        flex-basis: 100%;
        width: 100%;
      }
      .product__item {
        display: flex;
        flex-direction: column;
        flex: 0 0 200px;
        overflow: hidden;
        margin: 0 20px 20px;
        @include screenBreakpoint2(phone) {
          flex-basis: 100%;
          height: 500px;
          margin: 0 0 2rem 0;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 300px;
        }
        p {
          margin-top: 0;
        }
        .price {
          &__icon {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }

</style>
