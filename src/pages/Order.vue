<template>
  <Layout>
    <div class="container">
      <h1>Оформление заказа</h1>
      <form
        name="order"
        method="post"
        @submit.prevent="handleSubmit"
        action="/success/"
        data-netlify="true"
        data-netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>
        <div class="sender-info">
          <div>
            <label for="name" class="label" >Your name</label>
            <input type="text" name="name" v-model="formData.name" />
          </div>
          <div>
            <label for="email">Your email</label>
            <input type="email" name="email" v-model="formData.email" />
          </div>
        </div>

        <div class="message-wrapper">
          <label for="message">Message</label>
          <textarea name="message" v-model="formData.message"></textarea>
        </div>

        <button type="submit">Submit form</button>
      </form>
    </div>
  </Layout>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        formData: {}
      }
    },
    methods: {
      handleSubmit() {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
