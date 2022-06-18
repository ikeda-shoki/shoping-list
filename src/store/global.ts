import userStore from "./User";
import { inject } from "vue";

export function globalStore() {
  return {
    user: userStore(),
  };
}

export const globalStoreKey = Symbol("globalStore");

export function useGlogalStore() {
  const store = inject(globalStoreKey);
  if (!store) {
    throw new Error("${globalStoreKey} is not provided");
  }
  return store;
}
