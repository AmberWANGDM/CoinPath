import { defineComponent, PropType } from 'vue';
import { Navbar } from '../shared/Navbar/Navbar';
export const MainLayout = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>
        <Navbar>
          {
            {
              title: () => context.slots.title?.(),
              icon: () => context.slots.icon?.()
            }
          }
        </Navbar>
        {context.slots.default?.()}
      </div>
    )
  }
})