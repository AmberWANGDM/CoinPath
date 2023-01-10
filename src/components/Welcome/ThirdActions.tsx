import { FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'
import s from './welcome.module.scss'

export const ThirdActions: FunctionalComponent = () => {
  return <div class={s.actions}>
    <RouterLink class={s.next} to="/start">进入首页</RouterLink>
  </div>
}

ThirdActions.displayName = 'ThirdActions'