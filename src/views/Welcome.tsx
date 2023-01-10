import { defineComponent, Transition, VNode } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import s from './Welcome.module.scss'
export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (<div class={s.wrapper}>
      <header >
        <svg>
          <use xlinkHref='#logo'></use>
        </svg>
      </header>
      <main>
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