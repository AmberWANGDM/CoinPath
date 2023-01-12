import { defineComponent, PropType } from 'vue';
import s from './CreateItem.module.scss';
export const CreateItem = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>createitem</div>
    )
  }
})