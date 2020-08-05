VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

new Vue({
  el: '#app',
  data: {
    api: 'https://course-ec-api.hexschool.io/api/',
    UUID: '354b1b67-8c78-4eab-a8f1-148bbb2f3ec1',
    products: {},
    shoppingCart: [],
    username: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  },
  components: {
  },
  created() {
    this.getProducts()
    this.getShoppingList()
  },
  methods: {
    getProducts() {
      const apiProducts = `${this.api}${this.UUID}/ec/products`
      axios
        .get(apiProducts)
        .then(res => {
          this.products = res.data.data
        })
    },
    getShoppingList() {
      let localShoppingCart = localStorage.getItem('shoppingCart')
      if (localShoppingCart) this.shoppingCart = JSON.parse(localShoppingCart)
    },
    addProduct(product) {
      this.getShoppingList()
      let productInCart = this.shoppingCart.findIndex(item => item.id === product.id)
      if (productInCart === -1) {
        product.count = 1
        this.shoppingCart.push(product)
      } else {
        let count = this.shoppingCart[productInCart].count + 1
        product.count = count
        this.$set(this.shoppingCart, productInCart, product)
      }
      localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart))
    },
  },
  computed: {
    itemsInCart() {
      let total = this.shoppingCart.reduce(function(acc, cur) { return acc + cur.count }, 0)
      return total
    }
  },
})