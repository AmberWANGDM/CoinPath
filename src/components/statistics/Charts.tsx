import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { FormItem } from '../../shared/Form/Form';
import s from './Charts.module.scss';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';
import { http } from '../../shared/Http';
import { Time } from '../../shared/time';

const DAY = 24 * 60 * 60 * 1000 // 一天的毫秒数为86400000

type Data1Item = { happen_at: string, amount: number }
type Data1 = Data1Item[]
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    const kind = ref('expenses')
    const data1 = ref<Data1>([])
    // 数据类型转换
    const betterData1 = computed(() => {
      if (!props.startDate || !props.endDate) return []
      const array = []
      // 1. 根据传入的开始和结束日期计算应显示的天数
      const diff = new Date(props.endDate!).getTime() - new Date(props.startDate!).getTime()
      const n = diff / DAY + 1 // 两个日期之间的天数
      let data1Index = 0 // 后端数据的索引
      // 2. 循环n次，每次循环都push一个数组，数组的第一个元素是时间戳，第二个元素是金额
      for (let i = 0; i < n; i++) {
        const time = new Time(props.startDate + 'T00:00:00.000+0800').add(i, 'day').getTimeStamp()
        // 如果后端返回的日期与当前日期相同（比较时间戳），就push后端返回的金额
        if (data1.value[data1Index] && new Date(data1.value[data1Index].happen_at).getTime() === time) {
          array.push([time, data1.value[data1Index].amount])
          data1Index += 1 // 每push一次就把索引+1
        } else {
          // 后端无数据，金额为0
          array.push([time, 0])
        }
      }
      return array as [string, number][]
    })
    onMounted(async () => {
      const response = await http.get<{ groups: Data1, summary: number }>('/items/summary', {
        happen_after: props.startDate!,
        happen_before: props.endDate!,
        kind: kind.value,
        _mock: 'itemSummary'
      })
      data1.value = response.data.groups
    })
    return () => (
      <>
        <div class={s.wrapper}>
          <FormItem
            class={s.formItem}
            label="类型"
            type="select"
            options={[
              { value: 'expenses', text: '支出' },
              { value: 'income', text: '收入' },
            ]}
            v-model={kind.value}
          />
          <LineChart data={betterData1.value} />
          <PieChart />
          <Bars />
        </div>
      </>
    )
  }
})