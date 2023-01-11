import { defineComponent, PropType } from 'vue';
import s from './icon.module.scss';

export type iconName = 'add' | 'logo' | 'welcome1' | 'welcome2' | 'welcome3'
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<iconName>,
      required: true
    }
  },
  setup: (props, context) => {
    return () => (
      <svg class={s.icon}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    )
  }
})