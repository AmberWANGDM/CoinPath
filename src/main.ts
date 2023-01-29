import { createApp } from 'vue'
import { App } from './App'

import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'

import '@svgstore'

import 'vant/lib/index.css'
import { createPinia } from 'pinia'
import { useMeStore } from './stores/useMeStore'

const router = createRouter({ history, routes })


const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
const meStore = useMeStore()
// 全局路由守卫
meStore.fetchMe() // 预先获取用户信息
// 白名单
const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/items': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
  '/export':'exact',
  '/notify': 'exact',
}
router.beforeEach((to, from) => {
  // 遍历白名单
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) return true
    if (value === 'startsWith' && to.path.startsWith(key)) return true
  }
  // 非白名单
  return meStore.mePromise!.then(
    () => true, // 已登录，继续
    () => '/sign_in?return_to=' + to.path // 未登录，跳转到登录页
  )
})