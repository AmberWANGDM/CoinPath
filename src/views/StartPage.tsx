import { defineComponent } from 'vue';
import { Button } from '../shared/Button/Button';
import { FloatButton } from '../shared/FloatButton/FloatButton';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('click');
    };
    return () => (
      <div>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>测试</Button>
        </div>
        <FloatButton />
      </div>
    )
  }
})