import { createApp } from "vue";
import router from "./router";
import { Vue3Mq } from "vue3-mq";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(Vue3Mq, {
  preset: "bootstrap5",
});
app.mount("#app");
