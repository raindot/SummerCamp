import zh_TW from './zh_TW.js';
VeeValidate.localize('tw', zh_TW);

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
    shoppingCart: [],
    loading: false,
    username: '',
    email: '',
    phone: '',
    address: '',
    payment: '',
    message: '',
  },
  created() {
    this.getShoppingList()
  },
  methods: {
    getShoppingList() {
      let localShoppingCart = localStorage.getItem('shoppingCart')
      if (localShoppingCart) this.shoppingCart = JSON.parse(localShoppingCart)
    },
    placeOrder() {
      this.loading = true
      this.shoppingCart.forEach((item, idx)=> {
        let done = false
        if (idx + 1 === this.shoppingCart.length) done = true
        this.addCart(item, done)
      })
    },
    addCart(item, done) {
      let createCartPath = `${this.api}${this.UUID}/ec/shopping`
      axios.post(createCartPath, {
        product: item.id,
        quantity: item.count
      }).then(res => {
        if (done) this.createOrder()
        console.log('addedCart', res);
      })
    },
    createOrder() {
      let createOrderPath = `${this.api}${this.UUID}/ec/orders`
      axios.post(createOrderPath, {
        name: this.username,
        email: this.email,
        tel: this.phone,
        address: this.address,
        payment: this.payment,
        message: this.message
      }).then(res => {
        console.log(res, 'order created')
        this.clearLocalCart()
        this.loading = false
        window.location.href = 'complete-order.html'
      }).catch(err => console.dir(err) )
    },
    clearLocalCart() {
      this.shoppingCart = []
      localStorage.removeItem('shoppingCart')
    },
    clearCart() {
      axios.delete(`${this.api}${this.UUID}/ec/shopping/all/product`).then(res => console.log(res))
    }
  },
})