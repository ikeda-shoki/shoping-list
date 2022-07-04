import { createRouter, createWebHistory, useRoute } from "vue-router";

// テンプレート
import Top from "./views/main/MainTop.vue";
import ItemsList from "./views/item/ItemsList.vue";
import CommonRegist from "./views/item/CommonRegist.vue";
import RegistCategory from "./views/item/RegistCategory.vue";
import RegistItem from "./views/item/RegistItem.vue";
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
    path: "/itemsList",
    name: 'itemList',
    component: ItemsList,
  },
  {
    path: "/regist",
    name: 'commonRegist',
    component: CommonRegist,
    redirect: '/category/new',
    children: [
      {
        path: "/category/:categoryId",
        name: 'registCategory',
        component: RegistCategory,
        props: true
      },
      {
        path: "/category/:categoryId/item",
        name: 'registItem',
        component: RegistItem,
        props: true,
      }
    ]
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

export function getCategoryUrlId() {
  const categoryUrlId = useRoute().params['categoryId'];
  if (typeof categoryUrlId === "string" && categoryUrlId !== "new") {
    return categoryUrlId
  }
  return "new"
}

export default router;
