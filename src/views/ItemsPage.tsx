import { defineComponent, PropType } from 'vue';
import s from './ItemsPage.module.scss';
export const ItemsPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>Items</div>
    )
  }
})