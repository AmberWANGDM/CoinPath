import { defineComponent, PropType } from 'vue';
import { Icon, iconName } from '../Icon/Icon';
import s from './FloatButton.module.scss';

export const FloatButton = defineComponent({
  props: {
    // 透传给Icon组件的name属性
    iconName: {
      type: String as PropType<iconName>,
      required: true
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
        <Icon name={props.iconName} class={s.icon} />
      </div>
    )
  }
})