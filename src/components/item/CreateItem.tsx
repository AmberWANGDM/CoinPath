import { AxiosError } from 'axios'
import { Toast } from 'vant'
import { defineComponent, PropType, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { http } from '../../shared/Http'
import { Tab, Tabs } from '../../shared/Tabs/Tabs'
import s from './CreateItem.module.scss'
import { InputPad } from './InputPad'
import { Tags } from './Tags'
export const CreateItem = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const router = useRouter()
    const formData = reactive({
      kind: '支出',
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    })
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Toast(Object.values(error.response.data.errors).join('\n'))
      }
      throw error
    }
    const onSubmit = async () => {
      const response = await http
        .post<Resource<Item>>('/items', formData, {
          params: { _mock: 'itemCreate' },
        })
        .catch(onError)
      router.push('/items')
    }
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={formData.kind} class={s.tabs}>
                  <Tab name="支出">
                    <Tags
                      kind="expenses"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>
                  <Tab name="收入">
                    <Tags
                      kind="income"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.happen_at}
                    v-model:amount={formData.amount}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
