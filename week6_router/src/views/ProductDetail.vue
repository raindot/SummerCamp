<template>
  <div class="container">
    <div class="row justify-content-between mt-4 mb-7">
      <div class="col-md-7">
        <h2 class="mb-0">{{product.title}}</h2>
        <p class="font-weight-bold">NT${{product.price}}</p>
        <div class="my-4">
          <img
            :src="product.imageUrl[0]"
            alt
            class="img-fluid mt-4"
          />
        </div>
        <div
          class="accordion border border-bottom border-top-0 border-left-0 border-right-0 mb-3"
          id="accordionExample"
        >
          <div class="card border-0">
              <div
                class="card-body pb-5"
              >{{product.content}}</div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="input-group mb-3 border mt-3">
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-dark rounded-0 border-0 py-3"
              type="button"
              id="button-addon1"
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
          <input
            type="text"
            class="form-control border-0 text-center my-auto shadow-none"
            placeholder
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            value="1"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-dark rounded-0 border-0 py-3"
              type="button"
              id="button-addon2"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <a href="./checkout.html" class="btn btn-dark btn-block rounded-0 py-3">加入購物車</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        imageUrl: [],
      },
      loading: false,
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.loading = true;
      const apiProduct = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${this.$route.params.id}`;
      this.axios
        .get(apiProduct)
        .then((res) => {
          console.log(res);
          this.product = res.data.data;
          this.loading = false;
        });
    },
  },
};
</script>
