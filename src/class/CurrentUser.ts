import { ref } from "vue";

type CurrentUser = {
  userId: string;
  userName: string | null;
  logInState: boolean;
};

const defaultUser: CurrentUser = {
  userId: "",
  userName: "",
  logInState: false,
};

export const currentUser = ref<CurrentUser>(defaultUser);
