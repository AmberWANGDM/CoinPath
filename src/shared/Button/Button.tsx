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
    },
    // 用户可以指定是否关闭自动沉默，默认开启
    autoSelfDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup: (props, context) => {
    // 自我沉默
    const selfdisabled = ref(false)
    const _disabled = computed(() => {
      // 如果自动沉默关闭，那么就不自动沉默
      if (props.autoSelfDisabled === false) {
        return props.disabled
      }
      if (selfdisabled.value) {
        return true
      }
      return props.disabled
    })
    const onClick = () => {
      props.onClick?.()
      selfdisabled.value = true
      setTimeout(() => {
        selfdisabled.value = false
      }, 5000)
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