<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Products</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Created At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.data" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.created_at }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateProductToEdit(product)">Edit</a> -
                <a href="#" @click.prevent="deleteProduct(product.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Product #' + model.id : 'New Product')">
          <form @submit.prevent="saveProduct">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Price">
              <b-form-input type="text" v-model="model.price"></b-form-input>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-textarea rows="4" v-model="model.description"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Product</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      products: [],
      model: {}
    }
  },
  async created() {
    this.refreshProducts()
  },
  methods: {
    async refreshProducts() {
      this.loading = true
      this.products = await api.getProducts()
      this.loading = false
    },
    async populateProductToEdit(product) {
      this.model = Object.assign({}, product)
    },
    async saveProduct() {
      if (this.model.id) {
        await api.updateProduct(this.model.id, this.model)
      } else {
        await api.createProduct(this.model)
      }
      this.model = {} // reset form
      await this.refreshProducts()
    },
    async deleteProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        // if we are editing a product we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteProduct(id)
        await this.refreshProducts()
      }
    }
  }
}
</script>
