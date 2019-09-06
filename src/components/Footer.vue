<template>
  <footer class="footer" :style="{'background-image' : `url(${settings.cloudinary_url}${settings.footer_bg})`}">
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
          <h2 class="nav__title title">Информация</h2>
          <g-link
            v-for="(page, ind) in $static.pages.edges"
            :key="`page-${ind}`"
            class="nav__link link"
            :to="page.node.path">
            {{ page.node.title }}
          </g-link>
        </div>
        <div class="column contacts column--right">
          <h2 class="contacts__title title">Контакты</h2>
          <a href="https://www.google.com/maps/place/Kharkiv,+Kharkiv+Oblast/@49.9947277,36.1457427,11z/data=!3m1!4b1!4m5!3m4!1s0x4127a09f63ab0f8b:0x2d4c18681aa4be0a!8m2!3d49.9935!4d36.230383" class="contacts__link link address">
            <LocationIcon class="icon"/>
            {{contacts.address}}
          </a>
          <a :href="`mailto:${contacts.email}`" class="link contacts__link email">
            <EmailIcon class="icon"/>
            {{ contacts.email }}
          </a>
          <a :href="`tel:+38${contacts.phone}`" class="link contacts__link phone-number">
            <PhoneIcon class="icon"/>
            +38 {{contacts.phone}}
          </a>
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
import LocationIcon from '../assets/icons/location.svg';
import EmailIcon from '../assets/icons/envelope.svg';
import PhoneIcon from '../assets/icons/telephone.svg';
export default {
  components: {
    LocationIcon,
    EmailIcon,
    PhoneIcon,
  },
  data() {
    return {
      contacts: require("../../data/contacts.json"),
      settings: require("../../data/theme.json"),
    }
  },
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
    align-items: flex-start;
    @include screenBreakpoint2(phone) {
      flex-direction: column;
    }
    .column {
      display: flex;
      flex-direction: column;
      .title {
        color: $red;
        margin-top: 0;
        font-size: 20px;
      }
      .link {
        margin-bottom: 5px;
        font-size: 16px;
        color: $gray;
        font-weight: bold;
      }
      .icon {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 5px;
      }
       &.logo {
          width: 150px;
         margin-top: 20px;
         @include screenBreakpoint2(phone) {
           margin-top: 0;
           margin-bottom: 20px;
           width: 120px;
         }
        }
       &.nav {
         @include screenBreakpoint2(phone) {
           margin-bottom: 20px;
         }
       }
       &.contacts {

      }
    }
  }
}
</style>
