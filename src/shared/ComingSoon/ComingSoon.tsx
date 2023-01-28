import { defineComponent, PropType } from 'vue';
import s from './ComingSoon.module.scss';
import comingsoon from '../../assets/img/coming-soon.gif';
import { MainLayout } from '../../layouts/MainLayout';
import { OverlayIcon } from '../Overlay/Overlay';
import { Center } from '../Center/Center';
export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => '敬请期待',
          icon: () => <OverlayIcon />,
          default: () => (
            <div class={s.wrapper}>
              <p class={s.text}>Coming soon...</p>
              <img src={comingsoon} alt="coming soon" />
            </div>
          )
        }}
      </MainLayout>
    )
  }
})