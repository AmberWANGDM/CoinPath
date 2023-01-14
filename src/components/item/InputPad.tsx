import { defineComponent, ref } from 'vue';
import { Icon } from '../../shared/Icon/Icon';
import s from './InputPad.module.scss';
import { DatePicker, Popup } from 'vant';
export const InputPad = defineComponent({
  setup: (props, context) => {
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
      { text: 'Del', onClick: () => { } },
      { text: '清空', onClick: () => { } },
      { text: '提交', onClick: () => { } }
    ]

    const now = new Date()
    const year = now.getFullYear().toString()
    const month = now.getMonth().toString() + 1
    const day = now.getDate().toString().padStart(2, '0')

    const refDate = ref<string[]>([year, month, day])
    const refDatePickerVisible = ref(false)

    const refAmount = ref('')
    const appendText = (n: string | number) => { refAmount.value += n.toString() }

    const showDatePicker = () => { refDatePickerVisible.value = true }
    const hideDatePicker = () => { refDatePickerVisible.value = false }
    const setDate = ({ selectedValues }: any) => { refDate.value = selectedValues; refDatePickerVisible.value = false }

    return () => (
      <>
        <div class={s.dateAndAmount_wrapper}>
          <div class={s.dateAndAmount}>
            <span class={s.date}>
              <Icon name="date" class={s.icon} />
              <span>
                <span onClick={showDatePicker}>{refDate.value[0] + '年' + refDate.value[1] + '月' + refDate.value[2]
                  + '日'}</span>
                <Popup v-model:show={refDatePickerVisible.value} position='bottom' >
                  <DatePicker modelValue={refDate.value} title="选择日期" onCancel={hideDatePicker} onConfirm={setDate} />
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