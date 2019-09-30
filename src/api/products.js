import axios from 'axios'

export default {
  async execute(method, resource, data) {
    return axios({
      url: resource,
      data,
      method
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
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
