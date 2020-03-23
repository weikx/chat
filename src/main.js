import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
Vue.config.productionTip = false
import 'papercss/dist/paper.css'

Vue.use(new VueSocketIO({
  debug: true,
  // 服务器端地址
  connection: 'http://localhost:3081',
  vuex: {
  }
}))

new Vue({
  render: h => h(App),
}).$mount('#app')
