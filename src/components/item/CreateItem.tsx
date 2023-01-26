import { defineComponent, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon/Icon';
import { Tab, Tabs } from '../../shared/Tabs/Tabs';
import s from './CreateItem.module.scss';
import { InputPad } from './InputPad';
import { Tags } from './Tags';
export const CreateItem = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出')
    const refTagId = ref<number>(0)
    const refHappenAt = ref<string>(new Date().toISOString())
    const refAmount = ref<number>(0)
    return () => (
      <MainLayout>{{
        title: () => '记一笔',
        icon: () => <Icon name="back" class={s.navIcon} />,
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={refKind.value} class={s.tabs}>
              <Tab name="支出">
                <Tags kind='expenses' v-model:selected={refTagId.value} />
              </Tab>
              <Tab name="收入">
                <Tags kind='income' v-model:selected={refTagId.value} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad
                v-model:happenAt={refHappenAt.value}
                v-model:amount={refAmount.value} />
            </div>
          </div>
        </>
      }}</MainLayout>
    )
  }
})