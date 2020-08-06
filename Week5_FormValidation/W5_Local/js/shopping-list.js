new Vue({
  el: '#app',
  data: {
    shoppingCart: [],
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
    emptyCart() {
      this.shoppingCart = []
      localStorage.removeItem('shoppingCart')
    }
  },
  computed: {
    itemsInCart() {
      let total = this.shoppingCart.reduce(function(acc, cur) { return acc + cur.count }, 0)
      return total
    },
    totalPrice() {
      let totalPrice = this.shoppingCart.reduce(function(acc, cur) {
        return acc + cur.price * cur.count
      }, 0)
      return totalPrice
    }
  },
})