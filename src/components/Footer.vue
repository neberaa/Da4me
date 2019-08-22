<template>
  <footer class="footer" :style="{'background-image' : `url(${settings.footer_bg})`}">
    <div class="container">
      <div class="column logo column--left">
        <g-link :to="{ name: 'home' }" class="home-link">
          <img
            src="../assets/icons/logo7.png"
            :alt="settings.site_name"
            class="logo"/>
          </g-link>
        </div>
        <div class="column nav column--center">
          <h2 class="nav__title">Информация</h2>
          <g-link
            v-for="(page, ind) in $static.pages.edges"
            :key="`page-${ind}`"
            class="nav__link"
            :to="page.node.path">
            {{ page.node.title }}
          </g-link>
        </div>
        <div class="column contacts column--right">
          <h2 class="nav__title">Контакты</h2>
          <a :href="https://www.google.com/maps/place/Kharkiv,+Kharkiv+Oblast/@49.9947277,36.1457427,11z/data=!3m1!4b1!4m5!3m4!1s0x4127a09f63ab0f8b:0x2d4c18681aa4be0a!8m2!3d49.9935!4d36.230383" class="address">{{contacts.address}}</a>
          <a :href="`mailto:${contacts.email}`" class="email">{{contacts.email}}</a>
          <a :href="`tel:+38${contacts.phone}`" class="phone-number">+38 {{contacts.phone}}</a>
        </div>
    </div>
  </footer>
</template>

<static-query>
query Posts  {
  pages: allPageItem(filter: { showInNav: {eq:true}}) {
    edges{
      node{
        title
        path
      }
    }
  },
}
</static-query>

<script>
export default {
  data() {
    return {
      contacts: require("../../data/contacts.json"),
      settings: require("../../data/theme.json"),
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  font-size: 0.8rem;
  padding: 3rem 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .column {
      &--left {
        .logo {
          width: 150px;
        }
      }
      &--center {
        .nav {
          display: flex;
          flex-direction: column;
        }
      }
      &--right {

      }
    }
  }
}
</style>
