import { Dialog } from 'vant';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { RouterLink, useRoute, } from 'vue-router';
import { useMeStore } from '../../stores/useMeStore';
import { Icon } from '../Icon/Icon';
import s from './Overlay.module.scss';

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  setup: (props, context) => {
    const route = useRoute()
    const meStore = useMeStore()
    const me = ref<User>()
    onMounted(async () => {
      const active = document.querySelector('.router-link-active')
      active?.classList.add(s.active)
      const response = await meStore.mePromise
      me.value = response?.data.resource
    })
    const onSignOut = () => {
      Dialog.confirm({
        title: '退出登录',
        message: '确定要退出登录吗？'
      }).then(() => {
        localStorage.removeItem('jwt')
        window.location.reload()
      }).catch((e: MouseEvent) => {
        props.onClose?.(e)
      })
    }
    return () =>
      <>
        <div class={s.mask} onClick={props.onClose}>
        </div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ?
              <>
                <h2 class={s.email}>{me.value.email}</h2>
                <p onClick={onSignOut}>点击这里注销</p>
              </>
              :
              <RouterLink to={`'/sign_in?return_to=${route.fullPath}&preview=yes`}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
              </RouterLink>
            }
          </section>
          <nav>
            <ul class={s.action_list}>
              <li onClick={props.onClose}>
                <RouterLink to="/items" class={s.action}>
                  <Icon name="home" class={s.icon} />
                  <span >记账页面</span>
                </RouterLink>
              </li>
              <li onClick={props.onClose}>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="charts" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li onClick={props.onClose}>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li onClick={props.onClose}>
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
        <Overlay onClose={(e) => { refOverlayVisible.value = false }} />
      }
    </>
  }
})