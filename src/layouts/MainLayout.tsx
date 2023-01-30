import { defineComponent, PropType } from 'vue'
import { Navbar } from '../shared/Navbar/Navbar'
import s from './MainLayout.module.scss'
export const MainLayout = defineComponent({
  name: 'MainLayout',
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <Navbar class={s.navbar}>
          {{
            title: () => context.slots.title?.(),
            icon: () => context.slots.icon?.(),
          }}
        </Navbar>
        {context.slots.default?.()}
      </div>
    )
  },
})
