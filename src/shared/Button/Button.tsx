import { defineComponent } from "vue";
import s from './Button.module.scss'

// 定义组件的 Props 类型
interface Props {
  onClick?: (e: MouseEvent) => void;
}

export const Button = defineComponent<Props>({
  setup: (props, context) => {
    return () => (
      <button class={s.button}>
        {context.slots.default?.()}
      </button>
    )
  }
})