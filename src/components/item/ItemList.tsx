import { defineComponent, reactive, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon/Icon';
import { Tab, Tabs } from '../../shared/Tabs/Tabs';
import { Time } from '../../shared/time';
import s from './ItemList.module.scss';
import { ItemSummary } from './ItemSummary';

export const ItemList = defineComponent({
  setup: (props, context) => {
    const refSelected = ref('本月')

    const time = new Time()
    // 本月、上月、本年
    const timeList = [
      { start: time.firstDayOfMonth(), end: time.lastDayOfMonth() },
      { start: time.add(-1, 'month').firstDayOfMonth(), end: time.add(-1, 'month').lastDayOfMonth() },
      { start: time.firstDayOfYear(), end: time.lastDayOfYear() }
    ]
    // 自定义时间
    const customTime = reactive({
      start: new Time(),
      end: new Time()
    })

    return () => (
      <MainLayout>{
        {
          title: () => 'CoinPath',
          icon: () => <Icon name="menu" />,
          default: () => (
            <Tabs v-model:selected={refSelected.value} classPrefix={'customTabs'}>
              <Tab name='本月'>
                <ItemSummary startDate={timeList[0].start.format()} endDate={timeList[0].end.format()} />
              </Tab>
              <Tab name='上月'>
                <ItemSummary startDate={timeList[1].start.format()} endDate={timeList[1].end.format()} />
              </Tab>
              <Tab name='今年'>
                <ItemSummary startDate={timeList[2].start.format()} endDate={timeList[2].end.format()} />
              </Tab>
              <Tab name='自定义时间'>
                <ItemSummary startDate={customTime.start.format()} endDate={customTime.end.format()} />
              </Tab>
            </Tabs>
          )
        }
      }</MainLayout>
    )
  }
})