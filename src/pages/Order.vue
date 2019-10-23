<template>
  <Layout>
    <div class="container">
      <template v-if="!formSubmitted">
        <h1>Оформление заказа</h1>
        <form
          class="order-form"
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
            <h4>Контактные данные:</h4>
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
            <div>
              <label for="order-description" class="label">Примечание к заказу</label>
              <textarea name="description" id="order-description" rows="6" placeholder="Особые пожелания, способ доставки, другая дополнительная информация" v-model="formData.description"></textarea>
            </div>
          </div>
          <div class="order-preview">
            <h4>Ваш заказ:</h4>
            <table>
              <thead>
              <tr>
                <th>Товар</th>
                <th></th>
                <th>Всего</th>
              </tr>
              </thead>
              <tbody>
                <tr class="order__item" v-for="item in orderData">
                  <td class="image">
                    <ResponsiveImage
                      :url="item.imageGallery && item.imageGallery.length > 0 ?
                        item.imageGallery[0] : item.image"
                      :alt="item.title"
                      :settings-mobile="'w_400,h_800,c_fit'"
                      :settings-tablet="'w_300,h_600,c_fit'"
                      :settings-desktop="'w_300,h_600,c_fit'"/>
                  </td>
                  <td class="info">{{item.title}} x {{item.quantity || 1}} шт</td>
                  <td class="total">{{ parseInt(item.price * (item.quantity || 1)) }} грн</td>
                </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="4">Сумма к оплате: {{totalAmount}}, 00 грн</td>
              </tr>
              </tfoot>
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
    metaInfo () {
      return {
        title: 'Оформление заказа'
      }
    },
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
              "description": this.formData.description,
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
  .order-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @include screenBreakpoint2(phone) {
      flex-direction: column;
    }
    h4 {
      margin-bottom: 0.4rem;
    }
    .sender-info {
      flex: 0 0 50%;
      @include screenBreakpoint2(phone) {
        flex-basis: 100%;
      }
      input,
      textarea{
        width: 100%;
        max-width: 350px;
        margin-bottom: 1rem;
        @include screenBreakpoint2(phone) {
          max-width: 100%;
        }
      }
    }
    .order-preview {
      flex: 0 0 50%;
      table, th, td {
        padding: 0.4rem;
        border: 1px solid rgba($gray, 0.3);
      }
      table {
        border-spacing: 0;
        border-collapse: collapse;
        thead {
          text-align: left;
          font-size: 1rem;
          font-weight: bold;
          tr {
            height: 45px;
          }
        }
        .order__item {
          .image {
            picture {
              position: relative;
              width: 60px;
              height: 80px;
              overflow: hidden;
              display: block;
            }
          }
          .total {
            white-space: nowrap;
          }
          td {
            padding: 0.4rem;
            font-size: 1rem;
          }
        }
        tfoot {
          tr {
            height: 45px;
            font-size: 1rem;
            font-weight: bold;
          }
        }
      }
    }
    .cta {
      width: 100%;
      margin-top: 1rem;
      @include screenBreakpoint2(desktop) {
        width: 200px;
      }
    }
  }
</style>
