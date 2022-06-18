import { reactive } from "vue";

export default function userStore() {
  const state = reactive({
    users: [],
  });

  return {
    get users() {
      return state.users;
    },

    set users(values) {
      state.users = values;
    },
  };
}
