import { DatetimePicker, Popup } from 'vant';
import { computed, defineComponent, PropType, ref } from 'vue';
import { Button } from '../Button/Button';
import { EmojiSelect } from '../EmojiSelect/EmojiSelect';
import { getFriendlyError } from '../getFriendlyError';
import { Time } from '../time';
import s from './Form.module.scss';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})
export const FormItem = defineComponent({
  props: {
    label: {
      type: String as PropType<string>
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode' | 'select'>
    },
    error: {
      type: String
    },
    modelValue: {
      type: [String, Number]
    },
    placeholder: String,
    options: {
      type: Array as PropType<{ value: string, text: string }[]>
    },
    onClick: {
      type: Function as PropType<() => void>
    },
    countFrom: {
      type: Number as PropType<number>,
      default: 60
    },
    disabled: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const refDatePickerVisible = ref(false)
    const refDatePickerValue = ref(new Date(props.modelValue as string))
    // 倒计时
    const timer = ref<number>()
    const count = ref<number>(props.countFrom)
    const isCounting = computed(() => !!timer.value)
    const startCount = () => {
      timer.value = setInterval(() => {
        count.value--
        if (count.value === 0) {
          timer.value = undefined
          count.value = props.countFrom
        }
      }, 1000)
    }
    // 父组件调用子组件的方法
    context.expose({ startCount })

    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input class={[s.formItem, s.input]} value={props.modelValue}
            placeholder={props.placeholder}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)} />
        case 'emojiSelect':
          return <EmojiSelect modelValue={props.modelValue?.toString()} class={[s.formItem, s.emojiList]} onUpdateModelValue={(emoji) => context.emit('update:modelValue', emoji)} />
        case 'date':
          return <>
            <input
              readonly={true}
              value={props.modelValue}
              class={[s.formItem, s.input]}
              placeholder={props.placeholder}
              onClick={() => { refDatePickerVisible.value = true }} />
            <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
              <DatetimePicker
                title='请选择日期'
                type='date'
                modelValue={props.modelValue ? new Date(props.modelValue) : new Date()}
                onConfirm={(date: Date) => { context.emit('update:modelValue', new Time(date).format()); refDatePickerVisible.value = false }}
                onCancel={() => { refDatePickerVisible.value = false }}
              />
            </Popup>
          </>
        case 'validationCode':
          return <>
            <input class={[s.formItem, s.input, s.validationCodeInput]}
              placeholder={props.placeholder}
              value={props.modelValue}
              onInput={(e: any) => context.emit('update:modelValue', e.target.value)} />
            <Button
              class={[s.formItem, s.button, s.validationCodeButton]}
              disabled={isCounting.value || props.disabled}
              onClick={props.onClick}
            >
              {isCounting.value ? `${count.value}秒后重新发送` : '发送验证码'}
            </Button>
          </>
        case 'select':
          return <select class={[s.formItem, s.select]} value={props.modelValue} onChange={(e: any) => { context.emit('update:modelValue', e.target.value) }}>
            {
              props.options?.map(option =>
                <option value={option.value}>{option.text}</option>
              )
            }
          </select>
        case undefined:
          return context.slots.default?.()
      }
    })
    return () => {
      return <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label && <span class={s.formItem_name}>{props.label}</span>}
          <div class={s.formItem_value}>
            {content.value}
          </div>
          {
            <div class={s.formItem_errorHint}>
              <span>{props.error ? getFriendlyError(props.error) : ' '}</span>
            </div>
          }
        </label>
      </div>
    }
  }
})

