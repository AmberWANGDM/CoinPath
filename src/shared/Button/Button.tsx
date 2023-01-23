import { defineComponent, PropType } from "vue";
import s from './Button.module.scss'

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    },
    level: {
      type: String as PropType<'primary' | 'secondary' | 'danger'>,
      default: 'primary'
    },
    type: {
      type: String as PropType<'button' | 'submit'>,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup: (props, context) => {
    return () => (
      <button disabled={props.disabled} type={props.type} class={[s.button, s[props.level]]} onClick={props.onClick}>
        {context.slots.default?.()}
      </button>
    )
  }
})