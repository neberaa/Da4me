<template>
  <Layout>
    <div class="category">
      <div class="container category-container">
        <nav class="breadcrumbs">
          <g-link class="breadcrumbs__item" to="/">Главная/</g-link>
          <g-link class="breadcrumbs__item" to="/">Категории/</g-link>
          <g-link class="breadcrumbs__item" to="">{{$page.category.header}}</g-link>
        </nav>
        <h1 v-html="$page.category.header" class="title" />
        <div class="content">
          <aside class="sidebar">
            <section class="categories">
              <h4
                class="categories__title"
                :class="[{'with-arrow': isMobile},
                  {'with-arrow--up': categoryListIsHidden && isMobile}]"
                @click="categoryListIsHidden = !categoryListIsHidden">
                Категории
              </h4>
              <div
                class="categories__list"
                :class="[{hide: isMobile}, {toggled: !categoryListIsHidden && isMobile}]">
                <g-link
                  :to="item.node.path"
                  v-for="(item, i) in $page.categories.edges"
                  :key="item.node.id">
                  {{item.node.header}}
                </g-link>
              </div>
            </section>
            <section class="sort">
              <h4
                class="sort__title"
                :class="[{'with-arrow': isMobile},
                  {'with-arrow--up': sortListIsHidden && isMobile}]"
                @click="sortListIsHidden = !sortListIsHidden">
                Сортировать
              </h4>
              <div
                class="sort__list"
                :class="[{hide: isMobile},
                  {toggled: !sortListIsHidden && isMobile}]">
                <button
                  class="sort-item cta thin"
                  :key="`sortItem${item.index}`"
                  v-for="item in sortItems"
                  @click="sortBy(item.sortBy, item.index)"
                  :class="{active: activeSortItem === item.index}"
                  v-text="item.name"/>
              </div>
            </section>
          </aside>
          <div class="products">
            <p
              v-show="filteredProducts.length === 0">
              Категория пуста...
            </p>
            <div
              v-for="product in filteredProducts"
              :key="product.node.id"
              class="product__item">
              <div class="image-container">
                <a
                  class="wishlist"
                  @click.prevent="toggleWishList(product.node.id)">
                  <HeartIcon
                    class="icon"
                    :class="{'icon--coral': isAddedToWishList(product.node.id)}"/>
                </a>
                <g-link :to="product.node.path">
                  <ResponsiveImage
                    :url="product.node.imageGallery && product.node.imageGallery.length > 0 ?
                  product.node.imageGallery[0] : product.node.image"
                    :alt="product.node.title"
                    :settings-mobile="'w_400,h_800,c_fit'"
                    :settings-tablet="'w_0.5,h_0.5,c_fit'"/>
                </g-link>
                <div
                  class="sale-chip"
                  v-show="product.node.oldPrice && product.node.oldPrice > 0">
                  Sale
                </div>
              </div>
              <h4
                class="title"
                v-text="product.node.title"/>
              <p
                class="description"
                v-text="product.node.description"/>
              <ul
                class="colors"
                v-if="product.node.colors.length > 0">
                <li
                  class="colors__item"
                  :class="{active: product.node.activeColor === item.colorId}"
                  @click="setActiveColorImage(product.node.id, item.colorId)"
                  v-if="item.color"
                  v-for="(item, colorInd) in product.node.colors"
                  :key="`color${colorInd}`"
                  :style="{'background-color': item.color}"/>
              </ul>
              <div class="price">
                <SignIcon class="icon price__icon"/>
                <div class="price__value">
                  <span
                    class="old"
                    v-show="product.node.oldPrice && product.node.oldPrice > 0">
                    {{ product.node.oldPrice }}, 00
                  </span>
                  <span
                    :class="{new: product.node.oldPrice && product.node.oldPrice > 0}">
                    {{ product.node.price }}, 00
                  </span>
                </div>
                <span>грн</span>
              </div>
            </div>
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
        date
        id
        title
        category
        image
        path
        price
        oldPrice
        description
        imageGallery
        colors {
          color1
          imagesColor1
          color2
          imagesColor2
          color3
          imagesColor3
        }
      }
    }
  }
}
</page-query>

<script>
import SignIcon from '../assets/icons/sign.svg';
import { mapGetters, mapMutations, mapState } from 'vuex';
import HeartIcon from "../assets/icons/heart.svg";

export default {
  inject: ['resp'],
  metaInfo () {
    return {
      title: this.$page.category.header
    }
  },
  components: {
    SignIcon,
    HeartIcon,
  },
  data() {
    return {
      sortItems: [
        {name: 'по новизне', sortBy: 'dateDesc', index: 0},
        {name: 'название: А - Я', sortBy: 'nameAsc', index: 1},
        {name: 'название: Я - A', sortBy: 'nameDesc', index: 2},
        {name: 'цена: по убыванию', sortBy: 'priceDesc', index: 3},
        {name: 'цена: по возрастанию', sortBy: 'priceAsc', index: 4},
      ],
      sortListIsHidden : true,
      categoryListIsHidden: true,
      activeSortItem: 0,
      activeColor: null,
    }
  },
  computed: {
    ...mapGetters([
      'isAddedToWishList',
    ]),
    filteredProducts() {
      return this.$page.products.edges.filter(p => {
        const category = `/${p.node.category}.md`;
        return category.indexOf(this.$route.path) > -1;
      });
    },
    isMobile() {
      return this.resp.device.mobile;
    },
  },
  watch: {
    $route() {
      this.activeSortItem = 0;
      this.setProductColors();
      this.setDefaultColor();
    }
  },
  methods: {
    ...mapMutations([
      'addToWishList',
      'removeFromWishList',
      'loadJSON',
      'showSnackBar',
    ]),
    toggleWishList(id) {
      if (this.isAddedToWishList(id)) {
        this.removeFromWishList(id);
        this.showSnackBar('Товар удален из списка желаний!');
      } else {
        this.addToWishList(id);
        this.showSnackBar('Товар успешно добавлен в список желаний!');
      }
    },
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
        if (value === 'dateDesc') {
          return new Date(b.node.date) - new Date(a.node.date);
        }
      })
    },
    setProductColors() {
      this.filteredProducts.forEach(p => {
        const colors = [];
        for (let i = 1; i < 4; i++) {
          const item = {
            prodId: p.node.id,
            colorId: `${p.node.id}-color-${i}`,
            color: p.node.colors[`color${i}`] || null,
            colorTitle: p.node.colors[`titleColor${i}`] || null,
            imageUrl: p.node.colors[`imagesColor${i}`][0] || null
          };

          if (item.color !== null) {
            colors.push(item);
          }
        }
        p.node.colors = colors;
      })
    },
    setActiveColorImage(prodId, id) {
      const item = this.filteredProducts.filter(p => p.node.id === prodId);
      const activeColor = item[0].node.colors.filter(c => c.colorId === id);
      if (activeColor.length > 0) {
        item[0].node.image = activeColor[0].imageUrl;
      }
      item[0].node.activeColor = id;
    },
    setDefaultColor() {
      this.filteredProducts.forEach(p => {
        if (p.node.colors.length > 0) {
          p.node.activeColor = p.node.colors[0].colorId;
          p.node.image = p.node.colors[0].imageUrl;
        }
      });
    }
  },
  mounted() {
    this.setProductColors();
    this.setDefaultColor();
    this.loadJSON('wishList');
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
        margin-top: 0;
        padding-right: 20px;
        @include screenBreakpoint2(phone) {
          font-size: 1.2rem;
        }
        &.with-arrow {
          display: inline-block;
          position: relative;
          transition: margin 400ms ease;
          &::after {
            display: block;
            content: '';
            @include center('y');
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid $blue;
            right: 5px;
            transition: all 300ms ease;
          }
          &--up {
            margin-bottom: 0;
            &::after {
              transform: rotate(180deg);
            }
          }
        }
      }
      .categories {
        &__list {
          display: flex;
          flex-direction: column;
          transition: max-height 400ms ease;
          margin-bottom: 0.5rem;
          &.hide {
            max-height: 0;
            overflow: hidden;
          }
          &.toggled {
            max-height: 300px;
          }
          a.active {
            color: $blue;
          }
          @include screenBreakpoint2(phone) {
            margin-right: 1rem;
          }
        }
      }
      .sort {
        &__list {
          display: flex;
          flex-direction: column;
          transition: max-height 400ms ease;
          &.hide {
            max-height: 0;
            overflow: hidden;
          }
          &.toggled {
            max-height: 300px;
          }
        }
        &-item {
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
            background: $white;
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
      align-items: flex-start;
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
        align-items: flex-start;
        flex: 0 0 200px;
        overflow: hidden;
        margin: 0 20px 20px;
        @include screenBreakpoint2(phone) {
          flex-basis: 100%;
          margin: 0 0 2rem 0;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 300px;
          margin-bottom: 0.5rem;
          @include screenBreakpoint2(phone) {
            height: 70vh;
          }
          @include screenBreakpoint2(phone-landscape) {
            height: 120vw;
          }
          @include screenBreakpoint2(desktop) {
            flex: 0 0;
          }
          .wishlist {
            position: absolute;
            cursor: pointer;
            z-index: 2;
            background: $white;
            width: 30px;
            height: 30px;
            top: 10px;
            right: 10px;
            border-radius: 50%;
            @include screenBreakpoint2(phone) {
              width: 40px;
              height: 40px;
              top: 15px;
              right: 15px;
            }
            .icon {
              width: 20px;
              height: 20px;
              top: 6px;
              left: 5px;
              position: relative;
              @include screenBreakpoint2(phone) {
                width: 25px;
                height: 25px;
                top: 8px;
                left: 8px;
              }
            }
          }
          .sale-chip {
            position: absolute;
            top: 10px;
            left: 10px;
            background: $coral;
            color: $white;
            text-transform: uppercase;
            font-size: 0.8rem;
            padding: 5px;
          }
        }
        .title {
          font-size: 1.4rem;
          margin: 0 0 0.5rem;
          text-align: left;
          font-weight: bold;
        }
        .description {
          font-style: italic;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .colors {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0;
          margin: 0 0 1rem;
          list-style: none;
          &:empty {
            display: none;
          }
          &__item {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            border: 2px solid transparent;
            transition: all 300ms ease;
            margin-left: 0.5rem;
            cursor: pointer;
            @include screenBreakpoint2(phone) {
              width: 2rem;
              height: 2rem;
              margin-left: 1rem;
            }
            &.active {
              transform: scale(1.4);
              border-color: $light-gray;
            }
          }
        }
        .price {
          display: flex;
          align-items: center;
          &__value {
            display: flex;
            span {
              margin: 0 0.4rem 0 0;
              font-size: 1.2rem;
              &.new {
                color: $coral;
              }
              &.old {
                text-decoration: line-through;
              }
            }
          }
          span {
            font-size: 1.2rem;
          }
          &__icon {
            width: 1rem;
            height: 1rem;
            margin-right: 0.2rem;
          }
        }
      }
    }
  }

</style>
