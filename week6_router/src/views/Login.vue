<template>
  <div class="row">
    <div class="col-5 mx-auto">
      <h3 class="text-center">登入</h3>
      <form @submit.prevent="signin">
        <div class="form-group">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            id="inputEmail"
            v-model="user.email"
            type="email"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            id="inputPassword"
            v-model="user.password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="row justify-content-around">
          <button
            v-show="!signingIn"
            @click.prevent="signout"
            class="btn btn-outline-primary">
            Sign out
          </button>
          <button v-if="signingIn" class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          <button v-else type="submit" class="btn btn-primary">Sign In</button>
        </div>
      </form>
      <!-- <button @click="getData" class="btn btn-primary">GetData</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
      signingIn: false,
    };
  },
  methods: {
    signin() {
      this.signingIn = true;
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`;
      this.axios
        .post(api, this.user)
        .then((response) => {
          console.log(response);
          const { token } = response.data;
          const { expired } = response.data;
          // 把得到的token寫進瀏覽器的cookie裡，並命名為AUTH_TOKEN
          document.cookie = `AUTH_TOKEN=${token}; expires=${new Date(expired * 1000)}; path=/`;
          console.log(this.$route.query.redirect);
          const { redirect } = this.$route.query;
          if (redirect) {
            this.$router.push({
              path: this.$route.query.redirect,
            });
          } else {
            this.$router.push({ path: '/' });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signout() {
      // 把cookie清除
      document.cookie = 'AUTH_TOKEN=; expires=; path=/';
    },
    getData() {
      // 取得瀏覽器的 AUTH_TOKEN cookies（注意取得的時間點）
      // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      // 將 Token 加入到 Headers 內
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      // 取得需auth的資料
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products`;
      this.axios
        .get(api)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
