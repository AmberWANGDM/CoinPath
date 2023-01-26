import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '../../shared/Button/Button'
import { Form, FormItem } from '../../shared/Form/Form'
import { http } from '../../shared/Http'
import { onFormError } from '../../shared/onFormError'
import { hasError, Rules, validate } from '../../shared/validate'
import s from './Tag.module.scss'
export const TagForm = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    // typescript 的 keyof 语法 https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    if (!route.query.kind) {
      return () => <div>参数错误</div>
    }
    const formData = reactive({
      name: '',
      sign: '',
      kind: route.query.kind.toString(),
    })

    const onSubmit = async (e: Event) => {
      e.preventDefault()
      // ts 会提前自动推断 rules 的类型, 需要导出 Rules 类型
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex: /^.{0,4}$/, message: '最多4个字符', },
        { key: 'sign', type: 'required', message: '请选择符号' },
      ]
      Object.assign(errors, {
        name: [],
        sign: [],
      })
      Object.assign(errors, validate(formData, rules))
      // 前端校验通过，发送请求
      if (!hasError(errors)) {
        const response = await http
          .post('/tags', formData, {
            params: { _mock: 'tagCreate' },
          })
          .catch((error) => onFormError(error, (data) => Object.assign(errors, data.errors)))
        router.back()
      }
    }
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label="标签名"
          type="text"
          v-model={formData.name}
          error={errors['name']?.[0]}
        />
        <FormItem
          label={'符号' + formData.sign}
          type="emojiSelect"
          v-model={formData.sign}
          error={errors['sign']?.[0]}
        />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button type="submit" class={[s.formItem, s.button]}>
            确定
          </Button>
        </FormItem>
      </Form>
    )
  },
})
