import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = () => import('../views/Home.vue');
const Detail = () => import('../views/Detail.vue');
const base = process.env.NODE_ENV === 'production' ? '/blog' : '';

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    // base: '/blog', // this parameter does not work in ssr match components
    // base: process.env.NODE_ENV === 'production' ? 'blog' : '',
    routes: [
      { name:'home', path: base + '/', component: Home },
      { name: 'detail', path: base + '/detail/:filePath', component: Detail }
    ]
  });
}
