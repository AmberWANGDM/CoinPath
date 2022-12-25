import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import welcome2 from '../../assets/icons/welcome2.svg'
import s from './First.module.scss'
export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={welcome2} />
          <div class={s.intro}>
            <span>超多图标</span><br />
            <span>平铺选分类更好用</span>
          </div>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.next} to="/welcome/3">下一页</RouterLink>
          <RouterLink class={s.jump} to="/start">跳过</RouterLink>
        </div>
      </div>
    )
  }
})