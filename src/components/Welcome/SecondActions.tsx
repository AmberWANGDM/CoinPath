import { FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'
import s from './welcome.module.scss'

export const SecondActions: FunctionalComponent = () => {
  return <div class={s.actions}>
    <RouterLink class={s.next} to="/welcome/3">下一页</RouterLink>
    <RouterLink class={s.jump} to="/start">跳过</RouterLink>
  </div>
}

SecondActions.displayName = 'SecondActions'