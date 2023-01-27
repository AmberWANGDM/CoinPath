import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../shared/Icon/Icon';
import s from './InputPad.module.scss';
import { Time } from '../../shared/time';
import { DatetimePicker, Popup } from 'vant';
export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    onSubmit: {
      type: Function as PropType<() => void>
    }
  },
  emit: ['update:happenAt', 'update:amount'],
  setup: (props, context) => {
    // 数字键盘
    const buttons = [
      { text: '1', onClick: () => { appendText(1) } },
      { text: '2', onClick: () => { appendText(2) } },
      { text: '3', onClick: () => { appendText(3) } },
      { text: '4', onClick: () => { appendText(4) } },
      { text: '5', onClick: () => { appendText(5) } },
      { text: '6', onClick: () => { appendText(6) } },
      { text: '7', onClick: () => { appendText(7) } },
      { text: '8', onClick: () => { appendText(8) } },
      { text: '9', onClick: () => { appendText(9) } },
      { text: '0', onClick: () => { appendText(0) } },
      { text: '.', onClick: () => { appendText('.') } },
      { text: 'Del', onClick: () => { delText() } },
      { text: '清空', onClick: () => { clearText() } },
      {
        text: '提交', onClick: () => {
          context.emit('update:amount', parseFloat(refAmount.value) * 100)
          props.onSubmit?.()
        }
      }
    ]

    const refAmount = ref(props.amount ? (props.amount / 100).toString() : '0')

    // 输入数字
    const appendText = (n: string | number) => {
      const nString = n.toString()
      const dotIndex = refAmount.value.indexOf('.')
      // 验证用户输入
      if (refAmount.value.length >= 16) { return }// 不能超过16位
      if (dotIndex >= 0 && refAmount.value.length - dotIndex >= 3) { return }// 小数点后只允许两位
      // case1: 输入小数点
      if (nString === '.') {
        if (dotIndex >= 0) { // 如果已经有小数点就不能再输入小数点
          return
        }
      }
      // case2: 输入零
      else if (nString === '0') {
        if (refAmount.value === '0') { return } // 值为零则不能再输入零
        // 小数点后一位为零则不能再输入零
        if (dotIndex >= 0 && refAmount.value.length - dotIndex === 2 && refAmount.value[refAmount.value.length - 1] === '0') { return }
      }
      // case3: 输入1~9，当值为0时先清空
      else {
        if (refAmount.value === '0') { refAmount.value = '' }
      }
      // append
      refAmount.value += n.toString()
    }

    // 删除数字
    const delText = () => {
      // 当值只剩一位，置为0
      if (refAmount.value.length === 1) {
        clearText()
        return
      }
      // 当值不为0且长度大于1时，删除最后一位
      if (refAmount.value.length > 1 && refAmount.value !== '0') {
        refAmount.value = refAmount.value.slice(0, -1)
      }
      // 对于小数，如果小数点后只剩一位，同时删除小数点
      const dotIndex = refAmount.value.indexOf('.')
      if (dotIndex >= 0 && refAmount.value.length - dotIndex === 1) {
        refAmount.value = refAmount.value.slice(0, -1)
      }
    }

    // 清空数字
    const clearText = () => { refAmount.value = '0' }


    // 日期
    const now = new Date()
    const refDatePickerVisible = ref(false)
    const showDatePicker = () => { refDatePickerVisible.value = true }
    const hideDatePicker = () => { refDatePickerVisible.value = false }
    const setDate = (date: Date) => {
      context.emit('update:happenAt', date.toISOString())
      hideDatePicker()
    }
    return () => (
      <>
        <div class={s.dateAndAmount_wrapper}>
          <div class={s.dateAndAmount}>
            <span class={s.date}>
              <Icon name="date" class={s.icon} />
              <span>
                <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
                <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
                  <DatetimePicker title='选择日期' type="date"
                    modelValue={new Date(props.happenAt as string)}
                    onConfirm={(date: Date) => setDate(date)}
                    onCancel={hideDatePicker}
                  />
                </Popup>
              </span>
            </span>
            <span class={s.amount}>{refAmount.value}</span>
          </div>
        </div>
        <div class={s.buttons}>
          {
            buttons.map(button =>
              <button onClick={button.onClick}>{button.text}</button>
            )
          }
        </div>
      </>
    )
  }
})