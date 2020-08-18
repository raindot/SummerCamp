<template>
  <div class="row justify-content-center">
    <div v-show="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div
      v-show="!loading"
      v-for="product in products"
      :key="product.id"
      class="col-sm-6 col-md-4 pb-4"
    >
      <div class="card">
        <img :src="product.imageUrl[0]" class="card-img-top" :alt="product.title" />
        <div class="card-body">
          <h5 class="card-title text-truncate">{{ product.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ product.category }}</h6>
          <p class="card-text">{{ product.content }}</p>
          <span
            class="text-success font-weight-bolder"
            style="font-size: 1.2rem;"
          >$ {{ product.price }}</span>
          <span class="text-black-50" style="text-decoration:line-through; font-size: 0.8rem;">
            $
            {{ product.origin_price }}
          </span>
        </div>
        <div class="card-footer text-muted">
          <button
            type="button"
            class="btn btn-outline-primary">加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: {},
      loading: false,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.loading = true;
      const apiProducts = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      this.axios
        .get(apiProducts)
        .then((res) => {
          this.products = res.data.data;
          this.loading = false;
        });
    },
  },
};
</script>
