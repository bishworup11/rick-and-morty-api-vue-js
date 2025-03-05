import "./assets/main.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

const app = createApp(App);

app.use(router);
app.use(store, key);
app.mount("#app");
