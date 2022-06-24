import { createRouter, createWebHistory } from "vue-router";

// テンプレート
import Top from "./views/main/MainTop.vue";
import Login from "./views/userLogin/UserLogin.vue";
import Regist from "./views/userLogin/UserRegist.vue";
import ItemsList from "./views/item/ItemsList.vue";
import ItemRegist from "./views/item/ItemRegist.vue";
import ItemsSave from "./views/item/ItemsSave.vue";
import Errors from "./views/error/MainError.vue";
import { checkLogInState } from "./logic/Auth";

const routes = [
  {
    path: "/",
    name: 'top',
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
    name: 'itemList',
    component: ItemsList,
  },
  {
    path: "/itemRegist",
    name: 'itemRegist',
    component: ItemRegist,
  },
  {
    path: "/itemsSave",
    name: 'itemSave',
    component: ItemsSave,
  },
  {
    path: "/errors",
    name: 'errors',
    component: Errors,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.name !== 'top' && to.name !== 'errors') {
    if (await checkLogInState() === false) {
      console.log("check")
      return { name: 'top' }
    }
  }
})

export default router;
