import { userStore } from "./User";
import { inject, InjectionKey } from "vue";
import { categorysStore } from "./Category";
import { saveItemsStore } from "./SaveItem";

export const stores = {
  loginUser: userStore(),
  categorys: categorysStore(),
  saveItems: saveItemsStore(),
};

type States = typeof stores;

export const globalStoreKey: InjectionKey<States> = Symbol("globalStore");

export function useGlogalStore() {
  const stores = inject(globalStoreKey);
  if (!stores) {
    throw new Error("${globalStoreKey} is not provided");
  }
  return stores;
}
