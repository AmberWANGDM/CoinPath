import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import welcome3 from '../../assets/icons/welcome3.svg'
import s from './First.module.scss'

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={welcome3} />
          <div class={s.intro}>
            <span>清晰图表</span><br />
            <span>收支一目了然</span>
          </div>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.next} to="/welcome/3">进入首页</RouterLink>
          {/* <RouterLink class={s.jump} to="/start">跳过</RouterLink> */}
        </div>
      </div>
    )
  }
})