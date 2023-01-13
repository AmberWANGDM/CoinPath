import { defineComponent, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon/Icon';
import { Tab, Tabs } from '../../shared/Tabs/Tabs';
import s from './CreateItem.module.scss';
export const CreateItem = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出')
    return () => (
      <MainLayout>{{
        title: () => '记一笔',
        icon: () => <Icon name="back" class={s.navIcon} />,
        default: () => (
          <Tabs v-model:selected={refKind.value}>
            <Tab name="支出">
              支出 icon 列表
            </Tab>
            <Tab name="收入">
              收入 icon 列表2
            </Tab>
          </Tabs>
        )
      }}</MainLayout>
    )
  }
})