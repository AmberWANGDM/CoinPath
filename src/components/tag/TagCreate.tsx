import { defineComponent, PropType, reactive, toRaw } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button/Button';
import { EmojiSelect } from '../../shared/EmojiSelect/EmojiSelect';
import { Icon } from '../../shared/Icon/Icon';
import s from './TagCreate.module.scss';
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: ''
    })
    const onSubmit = (e: Event) => {
      e.preventDefault()
      const rules = [
        { key: 'name', required: true, message: '必填' },
        { key: 'name', patten: /^.{0,4}$/, message: '最多4个字符' },
        { key: 'sign', required: true }
      ]
      const errors = validate(formData, rules)
      /* 
      key的子集
      errors = {
        name: ['必填', '最多4个字符'],
        sign: ['必填']
      }
      */
      console.log(toRaw(formData))
    }
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name='back' onClick={() => { }} />,
        default: () => (
          <form class={s.form} onSubmit={onSubmit}>
            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>标签名</span>
                <div class={s.formItem_value}>
                  <input class={[s.formItem, s.input, s.error]} v-model={formData.name}></input>
                </div>
                <div class={s.formItem_errorHint}>
                  <span>{errors['name'][0]}</span>
                </div>
              </label>
            </div>
            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>符号</span><span>{formData.sign}</span>
                <div class={s.formItem_value}>
                  <EmojiSelect class={[s.formItem, s.emojiList, s.error]} v-model={formData.sign} />
                </div>
                <div class={s.formItem_errorHint}>
                  <span>必填</span>
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
      }}</MainLayout>
    )
  }
})