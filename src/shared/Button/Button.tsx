import { defineComponent, PropType } from "vue";
import s from './Button.module.scss'

// 定义组件的 Props 类型
interface Props {
  onClick?: (e: MouseEvent) => void;
}

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    },
    level: {
      type: String as PropType<'primary' | 'secondary' | 'danger'>,
      default: 'primary'
    }
  },
  setup: (props, context) => {
    return () => (
      <button class={[s.button, s[props.level]]} onClick={props.onClick}>
        {context.slots.default?.()}
      </button>
    )
  }
})