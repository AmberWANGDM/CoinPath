import s from './WelcomeLayout.module.scss'
import welcome1 from '../../assets/icons/welcome1.svg'
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

const slots = {
  icon: () => <img src={welcome1} />,
  title: () => <div class={s.intro}>
    <span>轻量便捷</span><br />
    <span>简单记一笔</span>
  </div>,
  buttons: () => <>
    <RouterLink class={s.next} to="/welcome/2">下一页</RouterLink>
    <RouterLink class={s.jump} to="/start">跳过</RouterLink>
  </>
}
export const First = () => <WelcomeLayout v-slots={slots} />
First.displayName = 'First'