export default {
  props : ['deleting'],
  data : function () {
    return {}
  },
  template : `<div id="confirm-delete" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">確認刪除</h5>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>確認刪除這個商品嗎？</p>
      </div>
      <div class="modal-footer">
        <button @click="$emit('cancel-delete')" :disabled="deleting" type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button v-if="deleting" type="button" class="btn btn-primary" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          刪除中...
        </button>
        <button v-else @click="$emit('delete-product')" type="button" class="btn btn-primary">確認</button>
      </div>
    </div>
  </div>
</div>`
}