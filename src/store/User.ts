import { reactive } from "vue";
import { stores } from "./global";

export type User = {
  userId: string;
  userName: string | null;
  loginState: boolean;
};

export function userStore() {
  const user: User = reactive({
    userId: "",
    userName: "",
    loginState: false,
  });
  return user;
}

export function setUser(user: User) {
  stores.loginUser.userId = user.userId;
  stores.loginUser.userName = user.userName;
  stores.loginUser.loginState = user.loginState;
  return stores;
}
