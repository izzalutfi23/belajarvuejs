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

const routes = [{
    name: 'home',
    path: '/',
    component: Home
  }, {
    name: 'profil',
    path: '/profil',
    component: Profil
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