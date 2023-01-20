import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button/Button';
import { Center } from '../shared/Center/Center';
import { FloatButton } from '../shared/FloatButton/FloatButton';
import { Icon } from '../shared/Icon/Icon';
import { OverlayIcon } from '../shared/Overlay/Overlay';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{
        {
          title: () => 'CoinPath',
          icon: () => <OverlayIcon />,
          default: () => <>
            <Center class={s.start_center_wrapper}>
              <Icon name="startCenter" class={s.start_center} />
            </Center>
            <div class={s.button_wrapper}>
              <RouterLink to="/items/create">
                <Button class={s.button}>开始记账</Button>
              </RouterLink>
            </div>
            <RouterLink to="/items/create">
              <FloatButton iconName='add' />
            </RouterLink>

          </>
        }
      }</MainLayout>
    )
  }
})