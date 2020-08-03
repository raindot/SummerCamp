export default {
  // props : ['productId'],
  data : function () {
    return {}
  },
  template : `<div id="confirm-delete" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">確認刪除</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>確認刪除這個商品嗎？</p>
      </div>
      <div class="modal-footer">
        <button @click="$emit('cancel-delete')" type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button @click="$emit('delete-product')" type="button" class="btn btn-primary">確認</button>
      </div>
    </div>
  </div>
</div>`
}