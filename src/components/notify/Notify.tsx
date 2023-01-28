import { defineComponent, PropType } from 'vue';
import { ComingSoon } from '../../shared/ComingSoon/ComingSoon';
export const Notify = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <ComingSoon />
    )
  }
})