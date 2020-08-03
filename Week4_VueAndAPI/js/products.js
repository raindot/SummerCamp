export default {
  props : ['products'],
  data : function () {
    return {}
  },
  template : `<table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col">原價</th>
        <th scope="col">售價</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td scope="row">{{product.category}}</td>
        <td scope="row">{{product.title}}</td>
        <td scope="row">{{product.origin_price}}</td>
        <td scope="row">{{product.price}}</td>
        <td scope="row" :class="product.enabled ? 'enabled':'disabled'">{{product.enabled ? '啟用':'停用'}}</td>
        <td scope="row">
          <button type="button" class="btn btn-outline-primary btn-sm">編輯</button>
          <button type="button" class="btn btn-outline-danger btn-sm">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>`
}