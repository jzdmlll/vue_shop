import axios from 'axios'
import { Message } from 'element-ui'
import getters from '@/store/getters'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: 'http://111.231.244.18/lostfound/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // res就是后端返回来的结果， { status,message,data,timestamp}
    const res = response.data

    // if the custom code is not 20000, it is judged as an error. 
    if ( res.status !== 200) {
      // 消息弹框
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
	  if(res.status === 401){
        logout();
      }
      // 返回承诺失败对象
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
//退出
async function logout() {
  await store.dispatch('user/logout')
  router.push('/login')
}
export default service
