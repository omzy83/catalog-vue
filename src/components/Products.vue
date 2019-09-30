<template>
  <div class="container mt-4">
    <div class="row mb-3">
      <div class="col">
        <h1 class="h1 d-inline mr-2">Products</h1>
        <b-spinner v-if="loading"></b-spinner>
      </div>
    </div>

    <b-row class="mb-4">
      <b-col>
        <b-card :title="(model.id ? 'Edit Product #' + model.id : 'Add Product')">
          <div class="alert alert-danger" v-if="validationErrors">
            <ul class="pl-3 mb-0">
              <li v-for="(value, index) in validationErrors" :key="index">{{ value }}</li>
            </ul>
          </div>
          <form @submit.prevent="saveProduct">
            <b-row>
              <b-col>
                <b-form-group label="Name" label-for="product-name">
                  <b-form-input id="product-name" type="text" v-model="model.name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Price" label-for="product-price">
                  <b-form-input id="product-price" type="text" v-model="model.price"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group label="Description" label-for="product-description">
              <b-form-textarea id="product-description" rows="3" v-model="model.description"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Product</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card>
          <table class="table table-striped table-borderless mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Created At</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products.data" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>£{{ product.price }}</td>
                <td>{{ product.created_at }}</td>
                <td class="text-right">
                  <a href="#" @click.prevent="populateProductToEdit(product)">Edit</a> |
                  <a href="#" @click.prevent="deleteProduct(product.id)">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style>
@media (min-width: 1200px) {
  .container{
    max-width: 920px;
  }
}
</style>

<script>
import api from '@/api/products'
export default {
  data() {
    return {
      loading: false,
      products: [],
      model: {},
      result: '',
      validationErrors: ''
    }
  },
  async created() {
    this.refreshProducts()
  },
  methods: {
    async processSubmit() {
      let hasResponse = this.result.response !== undefined

      if (hasResponse && this.result.response.status == 422) {
        let errors = Object.values(this.result.response.data.errors)
        errors = errors.flat()
        this.validationErrors = errors
      }
      else {
        this.model = {} // reset form
        await this.refreshProducts()
      }
    },
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
        this.result = await api.updateProduct(this.model.id, this.model)
      } else {
        this.result = await api.createProduct(this.model)
      }
      this.processSubmit()
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
