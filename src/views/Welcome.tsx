import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router';
import { useSwipe } from '../hooks/useSwipe';
import { throttle } from '../shared/throttle';
import s from './Welcome.module.scss'
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
      if (route.name === 'Welcome1') {
        router.push('/welcome/2')
      } else if (route.name === 'Welcome2') {
        router.push('/welcome/3')
      } else if (route.name === 'Welcome3') {
        router.push('/start')
      }
    }, 500)
    watchEffect(() => {
      // console.log(swiping.value, direction.value)
      if (swiping.value && direction.value === 'left') { // 向左滑动切换
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