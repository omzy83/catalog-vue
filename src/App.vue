<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <div class="container">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/" exact>Catalog Vue</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse" class="justify-content-end">
          <b-navbar-nav>
            <b-nav-item to="/" exact>Home</b-nav-item>
            <b-nav-item to="/products" v-if="isLoggedIn">Products</b-nav-item>
            <b-nav-item to="/login" v-if="!isLoggedIn">Login</b-nav-item>
            <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <router-view />
  </div>
</template>

<style>
  .navbar .navbar-nav .nav-link:focus,
  .navbar .navbar-nav .nav-link.router-link-active {
    color: #fff;
  }
</style>

<script>
import Vue from 'vue'

export default {
  created: function() {
    Vue.prototype.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
