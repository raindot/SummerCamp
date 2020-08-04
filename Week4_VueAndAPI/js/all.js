import products from './products.js'
import pagination from './pagination.js'
import productModal from './productModal.js'
import confirmDelete from './confirmDelete.js'
var app = new Vue({
  el: '#app',
  data: {
    UUID: '354b1b67-8c78-4eab-a8f1-148bbb2f3ec1',
    api: 'https://course-ec-api.hexschool.io/api/',
    token: '',
    products: {},
    pagination: {
      "total": 0,
      "count": 1,
      "per_page": 25,
      "current_page": 1,
      "total_pages": 1,
      "links": []
    },
    getingData: false,
    productToBeDelete: '',
    deleting: false,
    loading: false
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
    'productModal': productModal,
    'confirmDelete': confirmDelete
  },
  methods: {
    getProducts(page = 1) {
      this.getingData = true
      const productsPath = `${this.api}${this.UUID}/admin/ec/products`
      axios
        .get(productsPath, {
        params: {
          page: page,
          paged: 5
        }
      })
        .then((res) => {
          console.log(res.data.meta.pagination);
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          this.getingData = false
        })
    },
    openModal(product, isNew) {
      if (isNew === 'isNew') {
        this.$refs.productModal.tempProduct = {
          title: '',
          category: '',
          unit: '',
          origin_price: '',
          price: '',
          content: '',
          description: '',
          imageUrl: ['']
        }
        this.$refs.productModal.isNew = true
      } else {
        this.$refs.productModal.tempProduct = product
      }
    },
    saveProduct({product, isNew}) {
      this.loading = true
      let apiPath = ''
      let httpMethod = ''
      if (isNew) {
        httpMethod = 'post'
        apiPath = `${this.api}${this.UUID}/admin/ec/product`
      } else {
        httpMethod = 'patch'
        apiPath = `${this.api}${this.UUID}/admin/ec/product/${product.id}`
      }
      axios({method: httpMethod, url: apiPath, data: product}).then(res => {
        $('#product-modal').modal('hide')
        this.loading = false
        this.getProducts();
      }).catch(err => {
        console.log(err);
        alert('儲存失敗，請洽管理員')
      });
    },
    deleteProduct() {
      this.deleting = true
      const deleteProductPath = `${this.api}${this.UUID}/admin/ec/product/${this.productToBeDelete}`
      axios
        .delete(deleteProductPath)
        .then(res => {
          $('#confirm-delete').modal('hide')
          this.deleting = false
          this.getProducts();
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
});