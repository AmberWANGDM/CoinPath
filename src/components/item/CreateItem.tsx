import { AxiosError } from 'axios'
import { Toast } from 'vant'
import { defineComponent, PropType, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { http } from '../../shared/Http'
import { Tab, Tabs } from '../../shared/Tabs/Tabs'
import { hasError, validate } from '../../shared/validate'
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
    const formData = reactive<Partial<Item>>({
      kind: 'expenses',
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    })
    const errors = reactive<FormErrors<typeof formData>>({
      kind: [],
      tag_ids: [],
      amount: [],
      happen_at: []
    })
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Toast(Object.values(error.response.data.errors).join('\n'))
      }
      throw error
    }
    const onSubmit = async () => {
      Object.assign(errors, { kind: [], tag_ids: [], amount: [], happen_at: [] })
      Object.assign(errors, validate(formData, [
        { key: 'kind', type: 'required', message: '请选择类型' },
        { key: 'tag_ids', type: 'required', message: '请选择标签' },
        { key: 'amount', type: 'required', message: '请输入金额' },
        { key: 'amount', type: 'notequal', value: 0, message: '金额不能为零' },
        { key: 'happen_at', type: 'required', message: '请选择日期' },
      ])
      )
      if (hasError(errors)) {
        Toast(Object.values(errors).filter(i => i.length > 0).join(';'))
        return
      }
      await http
        .post<Resource<Item>>('/items', formData, { _mock: 'itemCreate', _autoLoading: true })
        .catch(onError)
      router.push('/items')
    }
    watch(() => formData.kind, (kind) => {
      formData.tag_ids = []
    })
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={formData.kind} class={s.tabs}>
                  <Tab value='expenses' name="支出">
                    <Tags
                      kind="expenses"
                      v-model:selected={formData.tag_ids![0]}
                    />
                  </Tab>
                  <Tab value='income' name="收入">
                    <Tags
                      kind="income"
                      v-model:selected={formData.tag_ids![0]}
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