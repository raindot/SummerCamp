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

// router.beforeEach((to, from, next) => {
//   next((vm) => {
//     console.log(vm);
//   });
// });
