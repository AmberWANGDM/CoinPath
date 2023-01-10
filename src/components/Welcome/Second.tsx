import { RouterLink } from 'vue-router';
import welcome2 from '../../assets/icons/welcome2.svg'
import s from './welcome.module.scss'

export const Second = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#welcome2'></use>
    </svg>
    <div class={s.intro}>
      <span>超多图标</span><br />
      <span>平铺选分类更好用</span>
    </div>
  </div>
}

Second.displayName = 'Second'

