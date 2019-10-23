<template>
  <Layout>
    <div class="container">
      <div class="error-page">
        <div class="error-page__content">
          <h1 class="title">Ой!</h1>
          <h4 class="subtitle">Похоже, мы не можем найти нужную вам страницу.</h4>
          <p class="error">Код ошибки: 404</p>
          <g-link to="/" class="cta red">Вернуться домой</g-link>
        </div>
        <div class="error-page__img"/>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .error-page {
    min-height: 50vh;
    display: flex;
    justify-content: space-between;
    position: relative;
    &__content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      max-width: calc(100% - 400px);
      @include screenBreakpoint2(tablet) {
        max-width: calc(100% - 300px);
      }
      @include screenBreakpoint2(phone) {
        max-width: calc(100% - 150px);
      }
      .title {
        font-size: 5rem;
        color: $red;
        margin-bottom: 2rem;
        @include screenBreakpoint2(desktop) {
          font-size: 6rem;
        }
      }
      .title,
      .subtitle,
      .error {
        margin-top: 0;
      }
    }
    &__img {
      position: absolute;
      right: 0;
      top: 0;
      width: 400px;
      height: 380px;
      background: url("../assets/icons/sparrow.png") center no-repeat;
      background-size: cover;
      @include screenBreakpoint2(tablet) {
        width: 300px;
        height: 280px;
      }
      @include screenBreakpoint2(phone) {
        width: 300px;
        height: 280px;
        right: -50vw;
      }
    }
  }

</style>

