import { defineComponent, PropType } from 'vue';
import { RouterView } from 'vue-router';
import s from './ItemsPage.module.scss';

const ItemsPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => <RouterView />
  }
})

export default ItemsPage