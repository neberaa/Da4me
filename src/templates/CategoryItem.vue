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
                v-for="(item, i) in $page.categories.edges"
                :key="item.node.id">
                {{item.node.header}}
              </g-link>
            </div>
            <div class="category-sort">
              <h4 class="category-sort__title">Сортировать:</h4>
              <button
                v-show="!isMobile"
                class="category-sort__item cta"
                :key="`sortItem${item.index}`"
                v-for="item in sortItems"
                @click="sortBy(item.sortBy, item.index)"
                :class="{active: activeSortItem === item.index}"
                v-text="item.name"/>
              <select v-show="isMobile" name="category-sort--mobile" class="category-sort--mobile" id="category-sort--mobile" @change="sortBy(sortByMob)" v-model="sortByMob">
                <option value="null" selected disabled>Выберите сортировку</option>
                <option
                  :key="`sortItemMob${ind}`"
                  v-for="(item, ind) in sortItems"
                  :value="item.sortBy"
                  v-text="item.name"/>
              </select>
            </div>
          </aside>
          <div class="products">
            <p v-show="filteredProducts.length === 0">Категория пуста...</p>
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
              <p class="description" v-text="product.node.description"/>
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
        description
      }
    }
  }
}
</page-query>

<script>
  import SignIcon from '../assets/icons/sign.svg';
export default {
  inject: ['resp'],
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
      activeSortItem: null,
      sortByMob: null,
    }
  },
  computed: {
    filteredProducts() {
      return this.$page.products.edges.filter(p => {
        const category = `/${p.node.category}.md`;
        return category.indexOf(this.$route.path) > -1;
      });
    },
    isMobile() {
      return this.resp.device.mobile;
    }
  },
  watch: {
    $route() {
      this.activeSortItem = null;
      this.sortByMob = null;
    }
  },
  methods: {
    sortBy(value, ind = null) {
      if (ind !== null) {
        this.activeSortItem = ind;
      }
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
  },
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
        margin-top: 0;
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
        &--mobile {
          border: 2px solid $gray;
          padding: 5px 10px;
          font-family: 'Didact Gothic';
          font-size: 0.8rem;
          background-color: $white;
          &:focus {
            outline: none;
            border: 2px solid $blue;
            box-shadow: none;
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
      p {
        margin-top: 0;
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
          @include screenBreakpoint2(desktop) {
            flex: 0 0;
          }
        }
        p {
          margin-top: 0;
          &.description {
            font-style: italic;
            font-size: 0.8rem;
          }
          @include screenBreakpoint2(phone) {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
          }
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
