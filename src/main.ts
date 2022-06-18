import 'vuetify/styles'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from "./router";
import { Vue3Mq } from "vue3-mq";
import { globalStoreKey, stores } from './store/global'

loadFonts()

const app = createApp(App);
app.use(router);
app.use(Vue3Mq, {
  preset: "bootstrap5",
});
app.use(vuetify);
app.provide(globalStoreKey, stores);
app.mount("#app");
