import { DatetimePicker, Popover, Popup } from 'vant';
import { computed, defineComponent, PropType, ref } from 'vue';
import { EmojiSelect } from '../EmojiSelect/EmojiSelect';
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
      type: String as PropType<'text' | 'emojiSelect' | 'date'>
    },
    error: {
      type: String
    },
    modelValue: {
      type: [String, Number]
    }
  },
  setup: (props, context) => {
    const refDatePickerVisible = ref(false)
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input class={[s.formItem, s.input]} value={props.modelValue}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)} />
        case 'emojiSelect':
          return <EmojiSelect modelValue={props.modelValue?.toString()} class={[s.formItem, s.emojiList]} onUpdateModelValue={(emoji) => context.emit('update:modelValue', emoji)} />
        case 'date':
          return <>
            <input readonly={true} value={props.modelValue} class={[s.formItem, s.input]}
              onClick={() => { refDatePickerVisible.value = true }} />
            <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
              <DatetimePicker title='请选择日期' type='date' modelValue={new Date(props.modelValue)}
                onConfirm={(value: Date) => { console.log(value); context.emit('update:modelValue', new Time(value).format()); refDatePickerVisible.value = false }}
                onCancel={() => { refDatePickerVisible.value = false }}
              />
            </Popup>
          </>

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
          {props.error &&
            <div class={s.formItem_errorHint}>
              <span>{props.error}</span>
            </div>
          }
        </label>
      </div>
    }
  }
})

