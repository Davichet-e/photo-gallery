import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index";
import { user } from "@/store/modules/users";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    props: (route: Route) => ({
      routes: route.name === "About" ? undefined : route.name?.toLowerCase()
    }),
    meta: { requiresAuth: true },
    children: [
      {
        path: "myphotos",
        name: "MyPhotos",
        component: () =>
          import(/* webpackChunkName: "myphotos" */ "../views/About.vue")
      },
      {
        path: "following",
        name: "Following",
        component: () =>
          import(/* webpackChunkName: "following" */ "../views/About.vue")
      },
      {
        path: "settings",
        name: "Settings",
        component: () =>
          import(/* webpackChunkName: "settings" */ "../views/About.vue")
      }
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "LogIn",
    props: { route: "login" },
    component: () => import(/* webpackChunkName: "login" */ "../views/Auth.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    props: { route: "sign up" },
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Auth.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/images/search",
    name: "Search",
    props: (route: Route) => ({ sortingBy: route.query.order }),
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue")
  },
  {
    path: "/images/:id",
    name: "Image",
    component: () =>
      import(/* webpackChunkName: "image" */ "../views/Image.vue")
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _from, next) => {
  if (
    to.matched.some(({ meta }) => meta.requiresAuth) &&
    !store.getters["auth/userIsLogged"]
  ) {
    next("login");
  } else {
    next();
  }
});

export default router;
