import { RouterLink } from 'vue-router';
import welcome3 from '../../assets/icons/welcome3.svg'
import s from './WelcomeLayout.module.scss'
import { WelcomeLayout } from './WelcomeLayout';

export const Third = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={welcome3} />,
      title: () => <div class={s.intro}>
        <span>清晰图表</span><br />
        <span>收支一目了然</span>
      </div>,
      buttons: () => <RouterLink class={s.next} to="/start">进入首页</RouterLink>
    }}
  </WelcomeLayout>
)
Third.displayName = 'Third'