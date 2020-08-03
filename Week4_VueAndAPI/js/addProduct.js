export default {
  props : ['creatingProduct'],
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
  template : `<div class="modal fade" id="add-product-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">新增產品</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="title">標題</label>
          <input id="title" v-model="newProduct.title" type="text" class="form-control" placeholder="請輸入標題"
            required>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="category">分類</label>
            <input id="category" v-model="newProduct.category" type="text" class="form-control"
              placeholder="請輸入分類" required>
          </div>
          <div class="form-group col-md-6">
            <label for="price">單位</label>
            <input id="unit" v-model="newProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="origin_price">原價</label>
            <input id="origin_price" v-model="newProduct.origin_price" type="number" class="form-control"
              placeholder="請輸入原價">
          </div>
          <div class="form-group col-md-6">
            <label for="price">售價</label>
            <input id="price" v-model="newProduct.price" type="number" class="form-control"
              placeholder="請輸入售價">
          </div>
        </div>
        <hr>
        <div class="form-group">
          <label for="description">產品說明</label>
          <textarea id="description" v-model="newProduct.description" type="text" class="form-control"
            placeholder="請輸入產品說明" required>
          </textarea>
        </div>
        <div class="form-group">
          <label for="content">產品描述</label>
          <textarea id="content" v-model="newProduct.content" type="text" class="form-control"
            placeholder="請輸入產品描述" required>
          </textarea>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input id="enabled" v-model="newProduct.enabled" class="form-check-input" type="checkbox">
            <label class="form-check-label" for="enabled">是否啟用</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button :disabled="creatingProduct" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button v-if="creatingProduct" type="button" class="btn btn-primary">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          新增中...
        </button>
        <button v-else @click="addProduct" type="button" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>`
}