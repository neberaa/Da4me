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
              <input type="text" id="order-name" name="name" v-model="formData.name" placeholder="Имя" />
            </div>
            <div>
              <label for="order-phone" class="label" >Введите свой номер телефона</label>
              <input type="tel" pattern="\+380[0-9]{9}" required id="order-phone" name="phone" v-model="formData.phone" placeholder="+380......"/>
            </div>
            <div>
              <label for="order-email" class="label">Введите свой email</label>
              <input type="email" required id="order-email" name="email" v-model="formData.email" placeholder="Электронная почта"/>
            </div>
          </div>
          <div class="order-preview">
            <h4>Заказ:</h4>
            <table>
              <tr class="header">
                <th>Наименование</th>
                <th>Цена</th>
                <th>Кол-во</th>
                <th>Общая сумма</th>
              </tr>
              <tr class="order__item" v-for="item in orderData">
                <td v-text="item.title"/>
                <td v-text="item.price"/>
                <td v-text="item.quantity || 1"/>
                <td v-text="parseInt(item.price * (item.quantity || 1))"/>
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
          const productTotal = parseInt(p.price) * parseInt(p.quantity || 1);
          total += productTotal;
        });
        return total;
      }
    },
    methods: {
      ...mapMutations([
        'clearCart',
        'loadJSON',
      ]),
      encode (data) {
        return Object.keys(data)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
          .join("&");
      },
      prepareFormData() {
        this.formData.order = [];
        this.orderData.forEach(d => {
          let orderItem = {};
            if (!d.hasOwnProperty('quantity')) {
              orderItem['Кол-во'] = 1;
            } else {
              orderItem['Кол-во'] = d.quantity;
            }
            orderItem['Название'] = d.title;
            orderItem['Цена'] = d.price;
            orderItem['Артикул'] = d.artikul;
            if (d.hasOwnProperty('activeColor')) {
              orderItem['Цвет'] = d.colors.filter(c => c.colorId === d.activeColor).map(c => c.colorTitle)[0];
            }
          if (d.hasOwnProperty('selectedSize')) {
            orderItem['Размер'] = d.selectedSize;
          }
            orderItem['Итого'] = orderItem['Кол-во'] * parseInt(orderItem['Цена']);
            this.formData.order.push(orderItem);
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
              "form-name": "order",
              "name": this.formData.name,
              "email": this.formData.email,
              "phone": this.formData.phone,
              "order": JSON.stringify(this.formData.order),
            }),
            axiosConfig
          )
          .then(() => {
            this.formSubmitted = true;
            this.clearCart();
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          })
          .catch(error => {
            console.log(error);
            // this.$router.push('error');
          });
      }
    },
    mounted() {
      this.loadJSON('orderData');
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
