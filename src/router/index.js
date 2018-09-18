import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = () => import('../views/Home.vue');
const Detail = () => import('../views/Detail.vue');
const Write = () => import('../views/Write.vue')
const Login = () => import('../views/Login.vue');
const base = (process.env.BASE_ROUTE ? process.env.BASE_ROUTE : '')

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    // base: process.env.BASE_ROUTE ? process.env.BASE_ROUTE : '', // this parameter does not work in ssr match components
    routes: [
      { name: 'home', path: base + '/', component: Home },
      { name: 'detail', path: base + '/detail/:id', component: Detail },
      { name: 'new', path: base + '/write', component: Write },
      { name: 'write', path: base + '/write/:id', component: Write },
      { name: 'login', path: base + '/login', component: Login },
    ]
  });
}
