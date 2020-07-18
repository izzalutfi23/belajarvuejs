window.Vue = require('vue');

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);



Vue.config.productionTip = false

import Home from './components/Home.vue';
import Profil from './components/Profil.vue';
import Covid19 from './components/Covid19.vue';

const routes = [{
    name: 'home',
    path: '/',
    component: Home
  }, {
    name: 'profil',
    path: '/profil',
    component: Profil
  }, {
    name: 'covid19',
    path: '/covid19',
    component: Covid19
  }

];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});