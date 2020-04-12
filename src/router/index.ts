import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about/",
    name: "About",
    children: [
      {
        path: "myphotos",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      },
      {
        path: "settings",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      },
      {
        path: "following",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
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

export default router;
