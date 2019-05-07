import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'http://localhost.test/catalog/public/api'

const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
