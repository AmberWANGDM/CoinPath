import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue';

export const First: FunctionalComponent = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#welcome1'></use>
    </svg>
    <div class={s.intro}>
      <span>轻量便捷</span><br />
      <span>简单记一笔</span>
    </div>
  </div>
}
First.displayName = 'First'