import { defineComponent } from 'vue';
import { Button } from '../shared/Button/Button';
import { Center } from '../shared/Center/Center';
import { FloatButton } from '../shared/FloatButton/FloatButton';
import { Icon } from '../shared/Icon/Icon';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('click');
    };
    return () => (
      <div>
        <nav>menu</nav>
        <Center class={s.start_center_wrapper}>
          <Icon name="startCenter" class={s.start_center} />
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>测试</Button>
        </div>
        <FloatButton iconName='add' />
      </div>
    )
  }
})