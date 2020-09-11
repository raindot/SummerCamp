import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

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
        meta: {
          needLogin: false,
        },
      },
      {
        path: 'about',
        component: () => import('../views/About.vue'),
        meta: {
          needLogin: false,
        },
      },
      {
        path: 'cart',
        component: () => import('../views/Cart.vue'),
        meta: {
          needLogin: false,
        },
      },
      {
        path: 'product-detail/:id',
        component: () => import('../views/ProductDetail.vue'),
        meta: {
          needLogin: false,
        },
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      needLogin: true,
    },
    // beforeEnter(to, from, next) {
    //   checkLogin().then((res) => {
    //     console.log('beforeEnter', res);
    //     next();
    //   }).catch((err) => {
    //     console.log(err);
    //     next({
    //       name: 'Login',
    //       query: { redirect: to.fullPath },
    //     });
    //   });
    // },
    children: [
      {
        path: 'orders',
        component: () => import(/* webpackChunkName: "about" */ '../views/Orders.vue'),
        meta: {
          needLogin: true,
        },
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
