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
    this.getShoppingList()
  },
  methods: {
    getShoppingList() {
      let localShoppingCart = localStorage.getItem('shoppingCart')
      if (localShoppingCart) this.shoppingCart = JSON.parse(localShoppingCart)
    },
  },
})