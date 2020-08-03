export default {
  data : function () {
    return {
      newProduct: {
        title: '1',
        category: '1',
        unit: '1',
        origin_price: '1',
        price: '1',
        content: '1',
        description: '1',
        imageUrl: ['1']
      }
    }
  },
  methods : {
    addProduct() {
      this.$emit('create-product', this.newProduct)
    }
  },
  template : '#add-product'
}