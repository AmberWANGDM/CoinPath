import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { ComingSoon } from '../shared/ComingSoon/ComingSoon';
import { OverlayIcon } from '../shared/Overlay/Overlay';
const Notify = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => '记账提醒',
          icon: () => <OverlayIcon />,
          default: () => <ComingSoon />
        }}
      </MainLayout>
    )
  }
})

export default Notify