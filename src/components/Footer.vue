<template>
    <footer class="footer" :style="{'background-image' : `url(${settings.footer_bg})`}">
        <div class="container">
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            settings: require("../../data/theme.json")
        }
    }
}
</script>

<style scoped>
.footer {
    font-size: 0.8rem;
    padding: 6rem 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
