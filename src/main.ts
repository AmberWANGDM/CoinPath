import { fetchMe, mePromise } from './shared/me';
import { createApp } from 'vue'
import { App } from './App'

import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'

import '@svgstore'

import 'vant/lib/index.css';

const router = createRouter({ history, routes })
// 全局路由守卫
fetchMe() // 预先获取用户信息
router.beforeEach(async (to, from) => {
  // 白名单
  if(to.path==='/' || to.path.startsWith('/welcome')||to.path.startsWith('/sign_in')||to.path==='/start'){
    return true
  }else{
    const path = await mePromise!.then( 
      ()=>true,
      ()=>'/sign_in?return_to=' + to.path
    )
    return path
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
