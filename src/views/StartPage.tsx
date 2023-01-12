import { defineComponent } from 'vue';
import { Button } from '../shared/Button/Button';
import { Center } from '../shared/Center/Center';
import { FloatButton } from '../shared/FloatButton/FloatButton';
import { Icon } from '../shared/Icon/Icon';
import { Navbar } from '../shared/Navbar/Navbar';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('click');
    };
    return () => (
      <div>
        <nav>
          <Navbar>
            {
              { title: () => 'CoinPath', icon: () => <Icon name="menu" class={s.navIcon} /> }
            }
          </Navbar>
        </nav>
        <Center class={s.start_center_wrapper}>
          <Icon name="startCenter" class={s.start_center} />
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>开始记账</Button>
        </div>
        <FloatButton iconName='add' />
      </div>
    )
  }
})