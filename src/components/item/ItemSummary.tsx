import { defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { Button } from '../../shared/Button/Button';
import { Datetime } from '../../shared/DateTime';
import { FloatButton } from '../../shared/FloatButton/FloatButton';
import { http } from '../../shared/Http';
import { Money } from '../../shared/Money';
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
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
    const page = ref<number>(0)
    const items = ref<Item[]>([])
    const hasMore = ref<boolean>(false)
    const fetchItems = async () => {
      if (!props.startDate || !props.endDate) return
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
    // 收支情况
    const itemsBalance = reactive({
      expenses: 0, income: 0, balance: 0
    })
    onMounted(async () => {
      if (!props.startDate || !props.endDate) return
      const response = await http.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndexBalance'
      })
      Object.assign(itemsBalance, response.data)
    })
    return () => (
      <div class={s.wrapper}>
        {items.value ?
          <>
            <ul class={s.total}>
              <li><span>收入</span><Money value={itemsBalance.income} /></li>
              <li><span>支出</span><Money value={itemsBalance.expenses} /></li>
              <li><span>净收入</span><Money value={itemsBalance.balance} /></li>
            </ul>
            <ol class={s.list}>
              {items.value.map(item => (
                <li>
                  <div class={s.sign}>
                    <span>{item.tags![0].sign}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}><>{item.tags![0].name}</></span>
                      <span class={s.amount}>￥<Money value={item.amount} /></span>
                    </div>
                    <div class={s.time}>
                      <Datetime value={item.happen_at} />
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