import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { MainLayout } from '../layouts/MainLayout';
import { ComingSoon } from '../shared/ComingSoon/ComingSoon';
import { OverlayIcon } from '../shared/Overlay/Overlay';
const Export = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const router = useRouter()
    const onClick = () => {
      router.push('/items');
    };
    return () => (
      <MainLayout>
        {{
          title: () => '导出数据',
          icon: () => <OverlayIcon />,
          default: () => <ComingSoon />
        }}
      </MainLayout>
    )
  }
})

export default Export