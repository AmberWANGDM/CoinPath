import { defineComponent, PropType } from 'vue';
import s from './ComingSoon.module.scss';
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
      <div class={s.wrapper}>
        <p class={s.text}>敬请期待</p>
        <Icon class={s.icon} name='comingsoon' />
        <Button class={s.button} onClick={onClick} >返回首页</Button>
      </div>
    )
  },
})