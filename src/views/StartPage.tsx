import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Button } from '../shared/Button/Button';
import { Center } from '../shared/Center/Center';
import { FloatButton } from '../shared/FloatButton/FloatButton';
import { Icon } from '../shared/Icon/Icon';
import { Navbar } from '../shared/Navbar/Navbar';
import { Overlay } from '../shared/Overlay/Overlay';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false)
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value
    }
    const onClick = () => {
      console.log('click');
    };
    return () => (
      <div>
        <nav>
          <Navbar>
            {
              { title: () => 'CoinPath', icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickMenu} /> }
            }
          </Navbar>
        </nav>
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
        {refOverlayVisible.value && <Overlay onClose={() => { refOverlayVisible.value = false }} />}
      </div>
    )
  }
})