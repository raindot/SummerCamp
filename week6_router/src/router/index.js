import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

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
    reject();
  });
});

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/products',
    children: [
      {
        path: 'products',
        name: 'products',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/About.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/Cart.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      needLogin: true,
    },
    beforeEnter(to, from, next) {
      checkLogin().then((res) => {
        console.log('beforeEnter', res);
        next();
      }).catch((err) => {
        console.log(err);
        next({
          name: 'Login',
          query: { redirect: to.fullPath },
        });
      });
    },
    children: [
      {
        path: 'orders',
        component: () => import(/* webpackChunkName: "about" */ '../views/Orders.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
