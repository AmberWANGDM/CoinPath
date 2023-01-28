import { defineComponent, PropType } from 'vue';
import s from './Icon.module.scss';

export type iconName = 'add' | 'logo' | 'welcome1' | 'welcome2' | 'welcome3' | 'startCenter' | 'menu' | 'charts' | 'notify' | 'export' | 'notify' | 'back' | 'notes' | 'date' | 'comingsoon'
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<iconName>,
      required: true
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  setup: (props, context) => {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    )
  }
})