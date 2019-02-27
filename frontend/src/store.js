import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueCookies from "vue-cookies";

// Cookies
Vue.use(VueCookies);

// Vuex
Vue.use(Vuex);

// Make Axios play nice with Django CSRF
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/api/';
// axios.defaults.baseURL = 'https://rpi.espacio.website:8000/api/';

export default new Vuex.Store({
  state: {
    sessionid: window.$cookies.get('sessionid') || null,
    username: window.$cookies.get('username') || null,
    auth_endpoints: {
      login: 'login/',
      logout: 'logout/',
    }
  },
  getters: {
    loggedIn: (state) => {
      return state.sessionid !== null;
    }
  },
  mutations: {
    UPDATE_LOGIN: (state, username) => {
      window.$cookies.set('username', username);
      state.username = username;
      state.sessionid = window.$cookies.get('sessionid');
    },
    UPDATE_LOGOUT: (state) => {
      window.$cookies.remove('sessionid');
      window.$cookies.remove('username');
      window.$cookies.remove('csrftoken');
      state.username = null;
      state.sessionid = null;
    }
  },
  actions: {
    login: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(context.state.auth_endpoints.login, payload)
          .then( () => {
            context.commit('UPDATE_LOGIN',payload.username);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    logout: context => {
      // context.commit('UPDATE_LOGOUT');
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post(context.state.auth_endpoints.logout, {withCredentials: true})
            .then( () => {
              // delete axios.defaults.headers.common['Authorization'];
              context.commit('UPDATE_LOGOUT');
              resolve();
            })
            .catch(error => {
              // delete axios.defaults.headers.common['Authorization'];
              context.commit('UPDATE_LOGOUT');
              reject(error);
            });
        });
      }
    }
  }
});
