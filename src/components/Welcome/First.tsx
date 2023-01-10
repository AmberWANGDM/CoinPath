import s from './welcome.module.scss'
import welcome1 from '../../assets/icons/welcome1.svg'
import { FunctionalComponent } from 'vue';

export const First: FunctionalComponent = () => {
  return <div class={s.card}>
    <img src={welcome1} />
    <div class={s.intro}>
      <span>轻量便捷</span><br />
      <span>简单记一笔</span>
    </div>
  </div>
}
First.displayName = 'First'