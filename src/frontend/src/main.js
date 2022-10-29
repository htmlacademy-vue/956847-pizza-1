import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const eventBus = new Vue();

export default eventBus;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
