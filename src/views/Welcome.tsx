import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router';
import { useSwipe } from '../hooks/useSwipe';
import { throttle } from '../shared/throttle';
import s from './Welcome.module.scss'

// Record 是 TypeScript 中的一个内置类型，它可以用来描述一个对象的类型
// 例如，我们可以用 Record 来描述一个对象，它的键是字符串，值是字符串
// const obj: Record<string, string> = {
//   name: 'jack',
//   age: '18'
// }
// 用来描述路由跳转的映射
const pushMap: Record<string, string> = {
  'Welcome1': '/welcome/2',
  'Welcome2': '/welcome/3',
  'Welcome3': '/items'
}

export const Welcome = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const main = ref<HTMLElement>()
    // 使用自定义hook
    const { direction, swiping } = useSwipe(main, {
      beforeStart: (e) => { e.preventDefault() }
    })
    // 用节流函数包装push方法，防止滑动过快
    const push = throttle(() => {
      // 获取路由名称，如果没有名称，就默认为Welcome1
      const name = (route.name || 'Welcome1').toString()
      // 跳转到下一个路由。例如，如果当前路由是Welcome1，那么就跳转到Welcome2
      router.push(pushMap[name])
    }, 500)

    // 监听swiping和direction的变化，如果滑动中且方向是向左，就跳转到下一个路由
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        push()
      }
    })

    return () => (<div class={s.wrapper}>
      <header >
        <svg>
          <use xlinkHref='#logo'></use>
        </svg>
      </header>
      <main ref={main}>
        <RouterView name="main" >
          {
            ({ Component: Content, route }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
              <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveFromClass={s.slide_fade_leave_from}
              >
                {Content}
              </Transition>
          }
        </RouterView>
      </main>
      <footer><RouterView name="footer" /></footer>
    </div>
    )
  }
})