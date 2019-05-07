<template>
  <div class="container" id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Catalog Vue</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/products">Products</b-nav-item>
          <b-nav-item to="/login" v-if="!isLoggedIn">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
  export default {
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
