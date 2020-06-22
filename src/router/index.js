import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '@/store/index';
import Access from '@/helper/Access';
import LoginPage from '../views/LoginPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      roles: [],
    },
  },
  {
    path: '/AdminHome',
    name: 'AdminHome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminHome.vue'),
    meta: {
      roles: [Access.USER_ROLE_ADMIN],
    },
  },
  {
    path: '/UserHome',
    name: 'UserHome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserHome.vue'),
    meta: {
      roles: [Access.USER_ROLE_ADMIN, Access.USER_ROLE_USER],
    },
  },
  {
    path: '/JobListing',
    name: 'JobListing',
    component: () => import(/* webpackChunkName: "about" */ '../views/JobListing.vue'),
    meta: {
      roles: [Access.USER_ROLE_ADMIN, Access.USER_ROLE_USER],
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "about" */ '../views/errorpages/403.vue'),
    meta: {
      roles: [],
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/' && Access.isLoggedIn()) {
    // When user is logged in, direect to home
    next('/UserHome');
  } else if (to.path === '/' && !Access.isLoggedIn()) {
    // When user is logged off, direct to login
    next();
  } else if (!Access.isLoggedIn()) {
    // When user is logged off, direct to login
    next('/');
  } else if (Access.checkAccess(to.meta.roles)) {
    // When user has access
    next();
  } else {
    // When user has log in, accessing path, but no rights
    next('/403');
  }
});
export default router;
