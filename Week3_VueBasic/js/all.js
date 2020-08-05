import products from './products.js'
import pagination from './pagination.js'
import productModal from './productModal.js'
import confirmDelete from './confirmDelete.js'
var app = new Vue({
  el: '#app',
  data: {
    products: [{
      "id": "gj21nl8bL54hGHIXfDD6wylaBtIK0p4yrX6RgKMS7XTtQnMrRX1ibmhBL7X0SocU",
      "title": "Abysswalker",
      "category": "T-Shirts",
      "content": "Its wearer, like Artorias himself, can traverse the Abyss.",
      "imageUrl": ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"],
      "enabled": true,
      "origin_price": 300,
      "price": 200,
      "unit": "單位"
    }, {
      "id": "KZl62iCWFUmTG6dSHPnkdI6NmzMRgIDvbleU19Uyibgku9cSYiuS16PmC4YD6xMK",
      "title": "test",
      "category": "test",
      "content": "test",
      "imageUrl": [null],
      "enabled": false,
      "origin_price": 122,
      "price": 100,
      "unit": "test"
    }, {
      "id": "GFI23Fbe4cSVWFdn7WUquLwrjjAVwxYQ7Zu8BavUPQefX03XVkF8vaFNWGAbgocJ",
      "title": "6",
      "category": "3",
      "content": "3",
      "imageUrl": [null],
      "enabled": false,
      "origin_price": 3,
      "price": 3,
      "unit": "3"
    }, {
      "id": "dwUxJ6EclgGeiZJ3oYyJH79ORT6tjF4AZdjER4G4WbSEoyn3o4qCUEG0NGe47sMM",
      "title": "Abysswalker",
      "category": "T-Shirts",
      "content": "Its wearer, like Artorias himself, can traverse the Abyss.",
      "imageUrl": ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"],
      "enabled": true,
      "origin_price": 300,
      "price": 200,
      "unit": "單位"
    }, {
      "id": "cc0teNNRuKx0KnP9WSf7jpLqzm89ONa0z2VfFg0qMfUBI14WxBocmW5jdDoalVIE",
      "title": "Abysswalkers",
      "category": "T-Shirts",
      "content": "Its wearer, like Artorias himself, can traverse the Abyss.",
      "imageUrl": ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"],
      "enabled": true,
      "origin_price": 300,
      "price": 200,
      "unit": "單位"
    }],
    pagination: {
      "total": 0,
      "count": 1,
      "per_page": 25,
      "current_page": 1,
      "total_pages": 1,
      "links": []
    },
    getingData: false,
    productIdToBeDelete: '',
    deleting: false,
    loading: false
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
        .catch(err => {
          console.dir(err);
          if (err.request.status === 401) {
            alert('請先登入')
            window.location.href = 'Login.html';
          }
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
        this.$refs.productModal.isNew = false
        this.$refs.productModal.tempProduct = product
      }
    },
    saveProduct({
      product,
      isNew
    }) {
      if (isNew) {
        this.products.push(product)
      } else {
        let idx = this.products.findIndex(item => item.id === product.id)
        this.$set(this.products, idx, product)
      }
      $('#product-modal').modal('hide')
      
    },
    deleteProduct() {
      let idx = this.products.findIndex(item => item.id === this.productIdToBeDelete)
      this.products.splice(idx, 1)
      $('#confirm-delete').modal('hide')

    }
  }
});