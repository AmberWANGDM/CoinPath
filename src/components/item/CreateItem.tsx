import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon/Icon';
import s from './CreateItem.module.scss';
export const CreateItem = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '记一笔',
        icon: () => <Icon name="back" class={s.navIcon} />
      }}</MainLayout>
    )
  }
})