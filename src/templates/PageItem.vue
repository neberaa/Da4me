<template>
  <Layout>
    <div class="page">
      <div class="container page-container">
        <h1 v-html="$page.page.title" class="page-title" />
        <page-content :content="$page.page.content" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query PageItem ($path: String!) {
  page: pageItem (path: $path) {
    title
    content
  }
}
</page-query>

<script>
import PageContent from "@/components/PageContent"

export default {
  components: {
    PageContent
  },
  metaInfo () {
    return {
      title: this.$page.page.title
    }
  }
}
</script>

<style scoped>
</style>
