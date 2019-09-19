<template>
  <Layout>
    <div class="container">
      <h1 class="hero-title" v-html="settings.hero_title" />
      <h2 class="hero-subtitle" v-html="settings.hero_subtitle" />
      <categories-grid :categories="$page.categories.edges" />
      <section class="page-block page-block--paint">
        <h2 class="page-block__title" v-text="paintBlock.title"/>
        <div class="page-block__content" v-html="paintBlock.description"/>
        <div class="page-block__bg" :style="{'background-image' : `url(${settings.cloudinary_url}${paintBlock.bgImage})`}"/>
        <ClientOnly>
          <carousel
            :perPageCustom="[[300, 1], [768, 3]]"
            :paginationActiveColor="gray"
            :scrollPerPage="true"
            ref="blockcarousel"
            class="page-block__carousel">
            <slide
              class="slide"
              v-for="(img, i) in paintBlock.gallery"
              :key="`imagegallery${i}`">
              <div class="slide__image">
                <ResponsiveImage
                  :url="img"
                  :alt="`${paintBlock.title}-${i}`"
                  :settings-mobile="'w_300,h_300,c_fit'"
                  :settings-tablet="'w_300,h_300,c_fit'"
                  :settings-desktop="'w_300,h_300,c_fit'"/>
              </div>
            </slide>
          </carousel>
        </ClientOnly>
      </section>
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
  },
  paintBlock: allBlockItem(filter: {key: {eq: "block_paint"}}) {
    edges {
      node {
        title
        description
        bgImage
        gallery
      }
    }
  }
}
</page-query>

<script>
import CategoriesGrid from "@/components/CategoriesGrid"

export default {
  components: {
    CategoriesGrid,
    Carousel: () =>
      import ('vue-carousel')
        .then(m => m.Carousel)
        .catch(),
    Slide: () =>
      import ('vue-carousel')
        .then(m => m.Slide)
        .catch(),
  },
  data() {
    return {
      settings: require("../../data/theme.json"),
      gray: "#414141"
    }
  },
  computed: {
    paintBlock() {
      return this.$page.paintBlock.edges[0].node;
    }
  }
}
</script>
<style lang="scss" scoped>
  .hero-title,
  .hero-subtitle {
    text-align: center;
  }
  .page-block {
    margin-top: 2rem;
    position: relative;
    &__title {
      text-align: center;
      color: $red;
    }
    &__content {
      margin: 0 0 0 auto;
      width: 60%;
      @include screenBreakpoint2(phone) {
        width: 100%;
        margin: auto;
      }
    }
    &__bg {
      position: absolute;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      top: -5%;
      left: 5%;
      width: 30%;
      height: 100%;
      @include screenBreakpoint2(phone) {
        display: none;
      }
      @include screenBreakpoint2(tablet) {
        left: -20%;
        width: 50%;
      }
    }
    &__carousel {
      width: 60%;
      margin: 2rem 0 0 auto;
      position: relative;
      @include screenBreakpoint2(phone) {
        width: 100%;
        margin: 2rem auto 0;
      }
      .slide {
        position: relative;
        padding-bottom: 30%;
        @include screenBreakpoint2(phone) {
          padding-bottom: 100%;
        }
        &__image {
          position: absolute;
          width: 95%;
          margin: 0 5%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          @include screenBreakpoint2(phone) {
            width: 100%;
            margin: 0;
          }
        }
      }
    }

  }
</style>
