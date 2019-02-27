import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: true
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import("./pages/User/Login.vue"),
      meta: {
        requiresVisitor: true,
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: () =>
        import("./pages/User/Logout.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/camera",
      name: "camera",
      component: () =>
        import("./pages/Rpi/Camera.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/logfiles",
      name: "logfiles",
      component: () =>
        import("./pages/Rpi/Logfiles.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/temperature",
      name: "temperature",
      component: () =>
        import("./pages/Rpi/Temperature.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/functions",
      name: "functions",
      component: () =>
        import("./pages/Rpi/Functions.vue"),
      meta: {
        requiresAuth: true,
      }
    }
  ]
});
