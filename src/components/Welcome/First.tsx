import { defineComponent } from 'vue';
import s from './First.module.scss'
import welcome1 from '../../assets/icons/welcome1.svg'
import { RouterLink } from 'vue-router';
export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={welcome1} />
          <div class={s.intro}>
            <span>轻量便捷</span><br />
            <span>简单记一笔</span>
          </div>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.next} to="/welcome/2">下一页</RouterLink>
          <RouterLink class={s.jump} to="/start">跳过</RouterLink>
        </div>
      </div>
    )
  }
})