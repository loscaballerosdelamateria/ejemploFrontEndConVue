import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import styles from '@/assets/css/fonts.css';
import axios from "axios";

Vue.config.productionTip = false;
Vue.config.silent = true;

// Auto authentication with token
// const apitoken = localStorage.getItem('apitoken');
// if (apitoken) {
//   axios.defaults.headers.common['Authorization'] = apitoken;
// }

// Restrict routes for Auth Users vs Visitors
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'home',
      })
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
