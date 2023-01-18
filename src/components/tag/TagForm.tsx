import { defineComponent, PropType, reactive } from 'vue';
import { Button } from '../../shared/Button/Button';
import { EmojiSelect } from '../../shared/EmojiSelect/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
export const TagForm = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: ''
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})

    const onSubmit = (e: Event) => {
      e.preventDefault()
      // ts 会提前自动推断 rules 的类型, 需要导出 Rules 类型
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex: /^.{0,4}$/, message: '最多4个字符' },
        { key: 'sign', type: 'required', message: '请选择符号' }
      ]
      // typescript 的 keyof 语法 https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
    }
    return () => (
      <form class={s.form} onSubmit={onSubmit}>
        <div class={s.formRow}>
          <label class={s.formLabel}>
            <span class={s.formItem_name}>标签名</span>
            <div class={s.formItem_value}>
              <input class={[s.formItem, s.input]} v-model={formData.name}></input>
            </div>
            <div class={s.formItem_errorHint}>
              <span>{errors['name'] ? errors['name'][0] : ' '}</span>
            </div>
          </label>
        </div>
        <div class={s.formRow}>
          <label class={s.formLabel}>
            <span class={s.formItem_name}>符号</span><span>{formData.sign}</span>
            <div class={s.formItem_value}>
              <EmojiSelect class={[s.formItem, s.emojiList]} v-model={formData.sign} />
            </div>
            <div class={s.formItem_errorHint}>
              <span>{errors['sign'] ? errors['sign'][0] : ' '}</span>
            </div>
          </label>
        </div>
        <p class={s.tips}>记账时长按标签即可进行编辑</p>
        <div class={s.formRow}>
          <div class={s.formItem_value}>
            <Button class={[s.formItem, s.button]}>确定</Button>
          </div>
        </div>
      </form>
    )
  }
})