import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import { useSwipe } from '../hooks/useSwipe';
import s from './Welcome.module.scss'
export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement | null>(null)
    const { direction, swiping } = useSwipe(main)
    watchEffect(() => {
      console.log(swiping.value, direction.value)
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