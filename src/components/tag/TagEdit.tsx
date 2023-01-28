import { defineComponent } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../shared/Button/Button'
import { TagForm } from './TagForm'
import s from './Tag.module.scss'
import { BackIcon } from '../../shared/BackIcon'
import { routerKey, useRoute, useRouter } from 'vue-router'
import { http } from '../../shared/Http'
import { Dialog, Toast } from 'vant'
import { AxiosError } from 'axios'

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>不存在</div>
    }
    const onError = (error: AxiosError) => {
      Toast('抱歉，删除失败')
      throw error
    }
    const onDelete = async (options?: { withItems: boolean }) => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要删除吗？'
      })
      await http.delete(`/tags/${numberId}`, {
        withItems: options?.withItems ? 'true' : 'false'
      }, { _autoLoading: true }).catch(onError)
      router.back()
    }
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm id={numberId} />
              <div class={s.actions}>
                <Button class={s.removeTags} level="danger"
                  onClick={() => onDelete()}>
                  删除标签
                </Button>
                <Button class={s.removeTagsAndItems} level="danger"
                  onClick={() => onDelete({ withItems: true })}>
                  删除标签和记账
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
