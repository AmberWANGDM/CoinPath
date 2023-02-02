import { defineComponent, PropType } from 'vue';
import { ComingSoon } from '../shared/ComingSoon/ComingSoon';
const Export = defineComponent({
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

export default Export