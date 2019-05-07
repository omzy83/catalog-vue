<template>
  <div class="container mt-4">
    <b-row class="mb-4">
      <b-col>
        <b-card title="Login">
          <form class="login" @submit.prevent="login">
            <b-row>
              <b-col>
                <b-form-group label="Email" label-for="login-email">
                  <b-form-input id="login-email" v-model="model.email" type="text"></b-form-input>
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group label="Password" label-for="login-password">
                  <b-form-input id="login-password" v-model="model.password" type="password"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <button type="submit">Login</button>
              </b-col>
            </b-row>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {}
      }
    },
    methods: {
      login: function () {
        this.$store.dispatch('login', this.model)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
