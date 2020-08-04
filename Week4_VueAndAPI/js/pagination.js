export default {
  props : ['pagination'],
  data : function () {
    return {}
  },
  methods : {
    emitPage(page) {
      if (0 < page && page <= this.pagination.total_pages) {
        this.$emit('emit-page', page)
      }
    }
  },
  template : `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li 
        @click="emitPage(pagination.current_page - 1)" 
        :class="pagination.current_page - 1 === 0? 'disabled':''" 
        class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li 
        v-for="page in pagination.total_pages" 
        @click="emitPage(page)" 
        :class="pagination.current_page === page ? 'active':''" 
        class="page-item">
          <a class="page-link" href="#">{{page}}</a>
      </li>
      <li 
        @click="emitPage(pagination.current_page + 1)" 
        :class="pagination.current_page + 1 > pagination.total_pages ? 'disabled':''" 
        class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
}