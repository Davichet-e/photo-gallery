import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Search from "../views/Search.vue";
import store from "@/store/index";
import "firebase/auth";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    props: (route: Route) => ({
      sortingBy: route.query.order
    }),
    component: Search
  },
  {
    path: "/about",
    name: "About",
    props: (route: Route) => ({
      route: route.name === "About" ? undefined : route.name?.toLowerCase()
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
    path: "/profile/:userId",
    props: true,
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/images/search",
    name: "Search",
    props: (route: Route) => ({
      sortingBy: route.query.order,
      route: "search",
      searchTag: route.query.searchTag
    }),
    component: Search
  },
  {
    path: "/images/:photoId",
    props: true,
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
  if (to.matched.some(({ meta }) => meta.requiresAuth)) {
    store.dispatch("auth/authUser").then((userIsLogged: boolean) => {
      if (userIsLogged) next();
      else next("/login");
    });
  } else {
    next();
  }
});

export default router;
