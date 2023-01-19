import { defineComponent, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon/Icon';
import { Tab, Tabs } from '../../shared/Tabs/Tabs';
import { Time } from '../../shared/time';
import s from './ItemList.module.scss';
import { ItemSummary } from './ItemSummary';

export const ItemList = defineComponent({
  setup: (props, context) => {
    const refSelected = ref('本月')
    // 测试 time.tsx
    const t = new Time(new Date(2000, 0, 31, 0, 0, 0)).add(1, 'month').format('YYYY-MM-DD')
    console.log(t); // 2000-02-29
    return () => (
      <MainLayout>{
        {
          title: () => 'CoinPath',
          icon: () => <Icon name="menu" />,
          default: () => (
            <Tabs v-model:selected={refSelected.value} classPrefix={'customTabs'}>
              <Tab name='本月'>
                <ItemSummary startDate={''} endDate={''} />
              </Tab>
              <Tab name='上月'>
                <ItemSummary startDate={''} endDate={''} />
              </Tab>
              <Tab name='更早'>
                <ItemSummary startDate={''} endDate={''} />
              </Tab>
              <Tab name='自定义时间'>
                <ItemSummary startDate={''} endDate={''} />
              </Tab>
            </Tabs>
          )
        }
      }</MainLayout>
    )
  }
})