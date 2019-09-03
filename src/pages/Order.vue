<template>
  <Layout>
    <div class="container">
      <template v-if="!formSubmitted">
        <h1>Оформление заказа</h1>
        <form
          name="order"
          method="post"
          @submit.prevent="handleSubmit"
          action="/success/"
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
              <label for="name" class="label" >Введите свое имя</label>
              <input type="text" name="name" v-model="formData.name" />
            </div>
            <div>
              <label for="email">Введите свой email</label>
              <input type="email" name="email" v-model="formData.email" />
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
  import { mapState } from 'vuex';
  export default {
    name: "Order",
    data() {
      return {
        formData: {},
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
      encode (data) {
        return Object.keys(data)
          .map(
            key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
          )
          .join("&");
      },
      prepareFormData() {
        this.formData.order = [];
        this.orderData.map(d => d.node).forEach(d => {
          let orderItem = {};
            if (!d.hasOwnProperty('quantity')) {
              orderItem.quantity = 1;
            } else {
              orderItem.quantity = d.quantity;
            }
            orderItem.title = d.title;
            orderItem.price = d.price;
            orderItem.article = d.article;
            orderItem.totalCost = orderItem.quantity * parseInt(orderItem.price);
            this.formData.order.push(orderItem);
        });
        console.log('form data', this.formData);
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
              "form-name": "ask-question",
              "name": this.formData.name,
              "email": this.formData.email,
              ...this.formData.order
            }),
            axiosConfig
          )
          .then(() => this.formSubmitted = true)
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
