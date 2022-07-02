import { userStore } from "./User";
import { inject, InjectionKey } from "vue";
import { categorysStore } from "./Category";
import { itemsStore } from "./Item";
import { colorStore } from "./Color";

export const stores = {
  loginUser: userStore(),
  categorys: categorysStore(),
  items: itemsStore(),
  colors: colorStore(),
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
