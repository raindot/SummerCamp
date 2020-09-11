import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

const checkLogin = () => new Promise((resolve, reject) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)AUTH_TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1');
  Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  Vue.axios.post(`${process.env.VUE_APP_APIPATH}/auth/check`, {
    api_token: token,
  }).then((res) => {
    console.log(res);
    if (res.data.success) {
      resolve(res);
    } else {
      reject(res);
    }
  }).catch((err) => {
    console.log(err);
    reject(err);
  });
});

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    checkLogin().then((res) => {
      console.log('beforeEach check passed', res);
      next();
    }).catch((err) => {
      console.log('beforeEach blocked', err);
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
      });
    });
  } else {
    console.log('no need login');
    next();
  }
});
