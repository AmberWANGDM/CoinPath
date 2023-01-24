import { computed, defineComponent, PropType, ref } from "vue";
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
    // 自我沉默
    const selfdisabled = ref(false)
    const _disabled = computed(() => {
      if (selfdisabled.value) return true
      return props.disabled
    })
    const onClick = () => {
      props.onClick?.()
      selfdisabled.value = true
      setTimeout(() => {
        selfdisabled.value = false
      }, 500)
    }
    return () => (
      <button disabled={_disabled.value}
        type={props.type}
        class={[s.button, s[props.level]]}
        onClick={onClick}>
        {context.slots.default?.()}
      </button>
    )
  }
})