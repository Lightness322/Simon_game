import Vue from "vue"
import App from "./App.vue"

import "./assets/main.css"

Vue.config.devtools = true
Vue.config.publicPath = /Simon_game/

new Vue({
  render: (h) => h(App),
}).$mount("#app")
