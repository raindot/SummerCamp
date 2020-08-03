import products from './products.js'
import pagination from './pagination.js'
import addProduct from './addProduct.js'
import confirmDelete from './confirmDelete.js'
var app = new Vue({
  el: '#app',
  data: {
    UUID: '354b1b67-8c78-4eab-a8f1-148bbb2f3ec1',
    api: 'https://course-ec-api.hexschool.io/api/',
    token: '',
    products: null,
    productToBeDelete: ''
  },
  created() {
    this.token = document
      .cookie
      .replace(/(?:(?:^|.*;\s*)AUTH_TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    this.getProducts();
  },
  components: {
    'products': products,
    'pagination': pagination,
    'addProduct': addProduct,
    'confirmDelete': confirmDelete
  },
  methods: {
    getProducts() {
      const productsPath = `${this.api}${this.UUID}/admin/ec/products`
      axios
        .get(productsPath)
        .then((res) => {
          this.products = res.data.data
          console.log(res.data.data);
        })
    },
    createProduct(newProduct) {
      console.log('newProduct', newProduct);
      const createProductPath = `${this.api}${this.UUID}/admin/ec/product`
      axios
        .post(createProductPath, newProduct)
        .then(res => {
          alert('新增完成')
          this.getProducts();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteProduct() {
      const deleteProductPath = `${this.api}${this.UUID}/admin/ec/product/${this.productToBeDelete}`
      axios
        .delete(deleteProductPath)
        .then(res => {
          $('#confirm-delete').modal('hide')
          this.getProducts();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
});