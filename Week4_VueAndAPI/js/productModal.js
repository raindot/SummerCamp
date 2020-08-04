export default {
  props : ['loading'],
  data : function () {
    return {
      tempProduct: {
        title: '',
        category: '',
        unit: '',
        origin_price: '',
        price: '',
        content: '',
        description: '',
        imageUrl: ['']
      },
      isNew: false
    }
  },
  created() {},
  methods : {
    saveProduct() {
      this.$emit('save-product', {
        product: this.tempProduct,
        isNew: this.isNew
      })
    }
  },
  template : `<div class="modal fade" id="product-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題"
            required>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="category">分類</label>
            <input id="category" v-model="tempProduct.category" type="text" class="form-control"
              placeholder="請輸入分類" required>
          </div>
          <div class="form-group col-md-6">
            <label for="price">單位</label>
            <input id="unit" v-model="tempProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="origin_price">原價</label>
            <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
              placeholder="請輸入原價">
          </div>
          <div class="form-group col-md-6">
            <label for="price">售價</label>
            <input id="price" v-model="tempProduct.price" type="number" class="form-control"
              placeholder="請輸入售價">
          </div>
        </div>
        <hr>
        <div class="form-group">
          <label for="description">產品說明</label>
          <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
            placeholder="請輸入產品說明" required>
          </textarea>
        </div>
        <div class="form-group">
          <label for="content">產品描述</label>
          <textarea id="content" v-model="tempProduct.content" type="text" class="form-control"
            placeholder="請輸入產品描述" required>
          </textarea>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input id="enabled" v-model="tempProduct.enabled" class="form-check-input" type="checkbox">
            <label class="form-check-label" for="enabled">是否啟用</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button :disabled="loading" type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button v-if="loading" type="button" class="btn btn-primary">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          儲存中...
        </button>
        <button v-else @click="saveProduct" type="button" class="btn btn-primary">確認</button>
      </div>
    </div>
  </div>
</div>`
}