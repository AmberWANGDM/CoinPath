import { fetchMe, mePromise } from './shared/me'
import { createApp } from 'vue'
import { App } from './App'

import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'

import '@svgstore'

import 'vant/lib/index.css'

const router = createRouter({ history, routes })
// 全局路由守卫
fetchMe() // 预先获取用户信息
// 白名单
const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/start': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
}
router.beforeEach((to, from) => {
  // 遍历白名单
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) return true
    if (value === 'startsWith' && to.path.startsWith(key)) return true
  }
  // 非白名单
  return mePromise!.then(
    () => true, // 已登录，继续
    () => '/sign_in?return_to=' + to.path // 未登录，跳转到登录页
  )
})

const app = createApp(App)
app.use(router)
app.mount('#app')
