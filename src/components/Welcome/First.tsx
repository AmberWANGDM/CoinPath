import s from './welcome.module.scss'
import { defineComponent, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useSwipe } from '../../hooks/useSwipe';

export const First = defineComponent({
  setup(props, context) {
    const router = useRouter()
    const div = ref<HTMLDivElement>()
    // 间接用到了onmounted等需要在setup中使用的生命周期钩子
    const { swiping, direction } = useSwipe(div, {
      beforeStart(e) {
        e.preventDefault()
      },
    })
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        router.push('/welcome/2')
      }

    })
    return () => (
      <div class={s.card} ref={div}>
        <svg>
          <use xlinkHref='#welcome1'></use>
        </svg>
        <div class={s.intro}>
          <span>轻量便捷</span><br />
          <span>简单记一笔</span>
        </div>
      </div>
    )
  }
})
First.displayName = 'First'