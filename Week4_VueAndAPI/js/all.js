import products from './products.js'
import pagination from './pagination.js'
import addProduct from './addProduct.js'
var app = new Vue({
  el: '#app',
  data: {
    UUID: '354b1b67-8c78-4eab-a8f1-148bbb2f3ec1',
    products: null
  },
  created() {
    const vm = this;
    axios
      .get(`https://course-ec-api.hexschool.io/api/${this.UUID}/ec/products`)
      .then(function (res) {
        vm.products = res.data.data
      })
  },
  components: {
    'products': products,
    'pagination': pagination,
    'addProduct': addProduct
  }
});