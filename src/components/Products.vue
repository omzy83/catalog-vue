<template>
  <div class="col mt-4">
    <div class="mb-3">
      <h1 class="h1 d-inline mr-2">Products</h1>
      <b-spinner v-if="loading"></b-spinner>
    </div>
    <b-row>
      <b-col>
        <table class="table table-striped">
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
              <td>{{ product.price }}</td>
              <td>{{ product.created_at }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateProductToEdit(product)">Edit</a> |
                <a href="#" @click.prevent="deleteProduct(product.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Product #' + model.id : 'Add Product')">
          <div class="alert alert-danger" v-if="validationErrors">
            <ul class="pl-3 mb-0">
              <li v-for="(value, key, index) in validationErrors">{{value}}</li>
            </ul>
          </div>
          <form @submit.prevent="saveProduct">
            <b-form-group label="Name" label-for="product-name">
              <b-form-input id="product-name" type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Price" label-for="product-price">
              <b-form-input id="product-price" type="text" v-model="model.price"></b-form-input>
            </b-form-group>
            <b-form-group label="Description" label-for="product-description">
              <b-form-textarea id="product-description" rows="4" v-model="model.description"></b-form-textarea>
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
import api from '@/api/products'
export default {
  data () {
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
      if (this.result.response.status == 422) {
        let errors = Object.values(this.result.response.data.errors);
        errors = errors.flat();
        this.validationErrors = errors;
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
