import { reactive } from "vue";

export type User = {
  userName: string | null;
  userId: string;
  userLogInState: boolean;
};

export function userStore() {
  const user: User = reactive({
    userName: "",
    userId: "",
    userLogInState: false,
  });
  return user;
}
