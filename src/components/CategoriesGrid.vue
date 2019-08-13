<template>
    <div class="categories">
        <div class="category" v-for="item in categories" :key="item.node.id">
            <g-link :to="item.node.path" class="category__link">
            <g-image
                :src="item.node.image"
                :alt="item.node.title"
                class="category__image"
            />
            <h3 class="category__title">{{ item.node.title }}</h3>
            </g-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
      categories: {
        type: Array,
        required: true
        }
    }
}
</script>

<style scoped>
    .categories {
        display: flex;
    }
    .category {
        display: block;
        width: 300px;
        height: 400px;
        overflow: hidden;
        border: 1px solid darkgray;
        margin: 0 20px;
    }
</style>
