import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
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
type Data2Item = { tag_id: number, tag: Tag, amount: number }
type Data2 = Data2Item[]
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
      const diff = new Date(props.endDate!).getTime() - new Date(props.startDate!).getTime()
      const n = diff / DAY + 1 // 两个日期之间的天数
      const array = Array.from({ length: n }).map((_, i) => {
        const time = new Time(props.startDate).add(i, 'day').getTimeStamp()
        const amount = data1.value.find(item => new Date(item.happen_at).getTime() === time)?.amount || 0
        return [time, amount]
      })
      return array as [string, number][]
    })
    // linechart data1
    const fetchData1 = async () => {
      const response = await http.get<{ groups: Data1, summary: number }>('/items/summary', {
        happen_after: props.startDate!,
        happen_before: props.endDate!,
        kind: kind.value,
        group_by: 'happen_at',
      }, {
        _mock: 'itemSummary', _autoLoading: true
      })
      data1.value = response.data.groups
    }
    onMounted(fetchData1)
    watch(() => kind.value, fetchData1)
    // piechart+barchart data2
    const data2 = ref<Data2>([])
    const betterData2 = computed<{ name: string; value: number }[]>(() =>
      data2.value.map((item: Data2Item) => ({
        name: item.tag.name,
        value: item.amount
      })
      )
    )
    const fetchData2 = async () => {
      const response = await http.get<{ groups: Data2, summary: number }>('/items/summary', {
        happen_after: props.startDate!,
        happen_before: props.endDate!,
        kind: kind.value,
        group_by: 'tag_id',
      }, {
        _mock: 'itemSummary', _autoLoading: true
      })
      data2.value = response.data.groups
    }
    onMounted(fetchData2)
    watch(() => kind.value, fetchData2)
    const betterData3 = computed<{ tag: Tag, amount: number, percent: number }[]>(() => {
      // 计算total
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
      // 计算percent
      return data2.value.map(item => ({
        ...item,
        percent: Math.round(item.amount / total * 100)
      }))
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
          <PieChart data={betterData2.value} />
          <Bars data={betterData3.value} />
        </div>
      </>
    )
  }
})