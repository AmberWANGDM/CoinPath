import { FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'
import s from './welcome.module.scss'
const onClick = () => {
  localStorage.setItem('skipFeatures', 'yes')
}
export const ThirdActions: FunctionalComponent = () => {
  return <div class={s.actions}>
    <span onClick={onClick}><RouterLink class={s.next} to="/start">进入首页</RouterLink></span>
  </div>
}

ThirdActions.displayName = 'ThirdActions'