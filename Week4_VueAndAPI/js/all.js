import products from './products.js'
import pagination from './pagination.js'
import addProduct from './addProduct.js'
var app = new Vue({
  el: '#app',
  data: {
    UUID: '354b1b67-8c78-4eab-a8f1-148bbb2f3ec1',
    api: 'https://course-ec-api.hexschool.io/api/',
    token: '',
    products: null
  },
  created() {
    this.token = document
      .cookie
      .replace(/(?:(?:^|.*;\s*)AUTH_TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

    const productsPath = `${this.api}${this.UUID}/ec/products`
    axios
      .get(productsPath)
      .then((res) => {
        this.products = res.data.data
      })
  },
  components: {
    'products': products,
    'pagination': pagination,
    'addProduct': addProduct
  },
  methods: {
    createProduct(newProduct) {
      console.log('newProduct', newProduct);
      const createProductPath = `${this.api}${this.UUID}/admin/ec/product`
      axios
        .post(createProductPath, newProduct)
        .then(res => {
          alert('新增完成')
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
});