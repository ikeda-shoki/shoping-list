import { createRouter, createWebHistory } from "vue-router";

// テンプレート
import Top from "./views/main/MainTop.vue";
import Login from "./views/userLogin/UserLogin.vue";
import Regist from "./views/userLogin/UserRegist.vue";
import ItemsList from "./views/item/ItemsList.vue";
import ItemRegist from "./views/item/ItemRegist.vue";
import ItemsSave from "./views/item/ItemsSave.vue";
import Errors from "./views/error/MainError.vue";

const routes = [
  {
    path: "/",
    component: Top,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/regist",
    component: Regist,
  },
  {
    path: "/itemsList",
    component: ItemsList,
  },
  {
    path: "/itemRegist",
    component: ItemRegist,
  },
  {
    path: "/itemsSave",
    component: ItemsSave,
  },
  {
    path: "/errors",
    component: Errors,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
