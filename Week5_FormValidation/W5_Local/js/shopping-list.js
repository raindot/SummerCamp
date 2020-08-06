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
    setLocalStorage() {
      localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart))
    },
    emptyCart() {
      this.shoppingCart = []
      localStorage.removeItem('shoppingCart')
    },
    deleteItem(idx) {
      this.shoppingCart.splice(idx, 1)
      this.setLocalStorage()
    },
    modifyCount(idx, count) {
      let subtotal = this.shoppingCart[idx].count + count
      if (subtotal > 0) {
        this.$set(this.shoppingCart[idx], 'count', subtotal)
      } else {
        this.deleteItem(idx)
      }
      this.setLocalStorage()
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