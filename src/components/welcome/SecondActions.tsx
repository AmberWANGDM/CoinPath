import { FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { SkipFeatures } from '../../shared/SkipFeatures'
import s from './welcome.module.scss'

export const SecondActions: FunctionalComponent = () => {
  return <div class={s.actions}>
    <RouterLink class={s.next} to="/welcome/3">下一页</RouterLink>
    <SkipFeatures class={s.jump} />
  </div>
}

SecondActions.displayName = 'SecondActions'