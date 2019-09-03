<template>
  <Layout>
    <div class="container">
      <template v-if="!formSubmitted">
        <h1>Оформление заказа</h1>
        <form
          name="order"
          method="post"
          @submit.prevent="handleSubmit"
          data-netlify="true"
          data-netlify-honeypot="bot-field">
          <input type="hidden" name="order" value="order-hidden" />
          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>
          <div class="sender-info">
            <div>
              <label for="order-name" class="label" >Введите свое имя</label>
              <input type="text" id="order-name" name="name" v-model="formData.name" />
            </div>
            <div>
              <label for="order-email">Введите свой email</label>
              <input type="email" id="order-email" name="email" v-model="formData.email" />
            </div>
          </div>
          <div class="order-preview">
            <p>Заказ:</p>
            <table>
              <tr class="header">
                <th>Наименование</th>
                <th>Цена</th>
                <th>Кол-во</th>
                <th>Общая сумма</th>
              </tr>
              <tr class="order__item" v-for="item in orderData">
                <td v-text="item.node.title"/>
                <td v-text="item.node.price"/>
                <td v-text="item.node.quantity || 1"/>
                <td v-text="parseInt(item.node.price * (item.node.quantity || 1))"/>
              </tr>
              <tr>
                <td colspan="4">Сумма к оплате: {{totalAmount}}, 00 грн</td>
              </tr>
            </table>
          </div>
          <button type="submit" class="cta">Заказать</button>
        </form>
      </template>
      <template v-if="formSubmitted">
        <h1>Спасибо за ваш заказ</h1>
        <p>Наш менеджер свяжется с вами в ближайшее время!</p>
      </template>
    </div>
  </Layout>
</template>

<page-query>
  query Posts {
    products: allProductItem {
      edges {
        node {
          id
          price
          title
          article
        }
      }
    },
  }
</page-query>

<script>
  import axios from 'axios'
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: "Order",
    data() {
      return {
        formData: {
          email: '',
          name: '',
          title: [],
          articles: [],
          quantity: [],
          price: []
        },
        formSubmitted: false,
      }
    },
    computed: {
      ...mapState([
        'orderData'
      ]),
      totalAmount() {
        let total = 0;
        this.orderData.forEach(p => {
          const productTotal = parseInt(p.node.price) * parseInt(p.node.quantity || 1);
          total += productTotal;
        });
        return total;
      }
    },
    methods: {
      ...mapMutations([
        'clearCart',
      ]),
      encode (data) {
        return Object.keys(data)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
          .join("&");
      },
      prepareFormData() {
        this.orderData.map(d => d.node).forEach(d => {
            this.formData.title.push(d.title);
            this.formData.articles.push(d.article);
          if (!d.hasOwnProperty('quantity')) {
            this.formData.quantity.push(1);
          } else {
            this.formData.quantity.push(d.quantity);
          }
            this.formData.price.push(d.price);
        });
      },
      handleSubmit () {
        this.prepareFormData();
        const axiosConfig = {
          header: { "Content-Type": "application/x-www-form-urlencoded" }
        };
        axios
          .post(
            "/",
            this.encode({
              ...this.formData
            }),
            axiosConfig
          )
          .then(() => {
            this.formSubmitted = true;
            this.clearCart();
          })
          .catch(error => {
            console.log(error);
            // this.$router.push('error');
          });
      }
    },
    mounted() {
      console.log('this.orderdata', this.formSubmitted);
    }
  }
</script>

<style lang="scss" scoped>
  table {
    margin-bottom: 2rem;
    th {
      border-bottom: 1px solid $red;
    }
  }
</style>
