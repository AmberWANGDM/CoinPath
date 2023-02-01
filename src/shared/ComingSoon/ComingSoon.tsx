import { defineComponent, PropType } from 'vue';
import s from './ComingSoon.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { OverlayIcon } from '../Overlay/Overlay';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { useRouter } from 'vue-router';
export const ComingSoon = defineComponent({
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
          title: () => '敬请期待',
          icon: () => <OverlayIcon />,
          default: () => (
            <div class={s.wrapper}>
              <Icon class={s.icon} name='comingsoon' />
              <p class={s.text}>Coming soon</p>
              <Button class={s.button} onClick={onClick} >返回首页</Button>
            </div>
          )
        }}
      </MainLayout>
    );
  },
})