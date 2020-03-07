import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入axios
import axios from 'axios'
// 配置请求根路径
// axios.defaults.baseURL = 'http://127.0.0.1/lostfound/'
axios.defaults.baseURL = 'http://111.231.244.18/lostfound/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
