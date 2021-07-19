import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import installElementPlus from './plugins/element'

// 配置请求的根路径
axios.defaults.baseURL = 'http://47.98.192.167:8800'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
const app = createApp(App)
app.use(VueAxios, axios)
installElementPlus(app)
app.use(router).mount('#app')
