import { RouterLink } from 'vue-router';
import welcome2 from '../../assets/icons/welcome2.svg'
import s from './WelcomeLayout.module.scss'
import { WelcomeLayout } from './WelcomeLayout';
export const Second = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={welcome2} />,
      title: () => <div class={s.intro}>
        <span>超多图标</span><br />
        <span>平铺选分类更好用</span>
      </div>,
      buttons: () => <><RouterLink class={s.next} to="/welcome/3">下一页</RouterLink>
        <RouterLink class={s.jump} to="/start">跳过</RouterLink></>
    }}
  </WelcomeLayout>
)
Second.displayName = 'Second'

