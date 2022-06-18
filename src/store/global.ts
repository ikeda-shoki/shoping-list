import { userStore } from "./User";
import { inject, InjectionKey } from "vue";

export const stores = {
  currentUser: userStore(),
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
