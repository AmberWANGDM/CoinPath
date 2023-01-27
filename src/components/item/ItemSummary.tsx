import { defineComponent, onMounted, PropType, ref } from 'vue';
import { Button } from '../../shared/Button/Button';
import { FloatButton } from '../../shared/FloatButton/FloatButton';
import { http } from '../../shared/Http';
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: (props, context) => {
    const page = ref<number>(0)
    const items = ref<Item[]>([])
    const hasMore = ref<boolean>(false)
    const fetchItems = async () => {
      const response = await http.get<Resources<Item>>('/items', {
        page: page.value + 1,
        created_before: props.startDate,
        created_after: props.endDate,
        _mock: 'itemIndex'
      })
      const { resources, pager } = response.data
      items.value.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      page.value += 1
    }
    onMounted(fetchItems)
    return () => (
      <div class={s.wrapper}>
        {items.value ?
          <>
            <ul class={s.total}>
              <li><span>收入</span><span>128</span></li>
              <li><span>支出</span><span>99</span></li>
              <li><span>净收入</span><span>39</span></li>
            </ul>
            <ol class={s.list}>
              {items.value.map(item => (
                <li>
                  <div class={s.sign}>
                    <span>{item.tag_ids[0]}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}><>{item.tag_ids[0]}</></span>
                      <span class={s.amount}>￥{item.amount}</span>
                    </div>
                    <div class={s.time}>
                      {item.happen_at}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </>
          :
          <div>记录为空</div>
        }
        <div class={s.more}>
          {hasMore.value ?
            <Button onClick={fetchItems}>加载更多</Button> :
            <span>没有更多</span>
          }
        </div>
        <FloatButton iconName='add' />
      </div>
    )
  }
})