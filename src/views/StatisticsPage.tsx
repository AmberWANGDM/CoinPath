import { defineComponent, PropType } from 'vue';
import { Charts } from '../components/statistics/Charts';
import { TimeTabsLayout } from '../layouts/TimeTabsLayout';
import s from './StatisticsPage.module.scss';
const StatisticsPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <TimeTabsLayout reRenderOnSwitchTab={true} component={Charts} hideThisYear={true} />
    )
  }
})

export default StatisticsPage