import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost.test/catalog/public/api',
  json: true
})

export default {
  async execute(method, resource, data) {
    let accessToken = localStorage.getItem('token')

    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getProducts() {
    return this.execute('get', '/products')
  },
  getProduct(id) {
    return this.execute('get', `/products/${id}`)
  },
  createProduct(data) {
    return this.execute('post', '/products', data)
  },
  updateProduct(id, data) {
    return this.execute('put', `/products/${id}`, data)
  },
  deleteProduct(id) {
    return this.execute('delete', `/products/${id}`)
  }
}
