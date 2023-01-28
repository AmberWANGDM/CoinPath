import { Dialog } from 'vant';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { Icon } from '../Icon/Icon';
import { mePromise } from '../me';
import s from './Overlay.module.scss';

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const me = ref<User>()
    onMounted(async () => {
      const response = await mePromise
      me.value = response?.data.resource
    })
    const onSignOut = () => {
      Dialog.confirm({
        title: '确定',
        message: '确定要退出登录吗？'
      }).then(() => {
        localStorage.removeItem('jwt')
        router.push('/sign_in')
      })
        .catch(() => { })
    }
    return () =>
      <>
        <div class={s.mask} onClick={props.onClose}>
        </div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ?
              <div>
                <h2 class={s.email}>{me.value.email}</h2>
                <p onClick={onSignOut}>点击这里注销</p>
              </div> :
              <RouterLink to={`'/sign_in?return_to=${route.fullPath}`}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
              </RouterLink>
            }
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="charts" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notify" class={s.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
  }
})

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false)
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value
    }
    return () => <>
      <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
      {refOverlayVisible.value &&
        <Overlay onClose={() => { refOverlayVisible.value = false }} />
      }
    </>
  }
})