import { defineComponent, PropType, reactive, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useAfterMe } from '../../hooks/useAfterMe';
import { Button } from '../../shared/Button/Button';
import { Center } from '../../shared/Center/Center';
import { Datetime } from '../../shared/DateTime';
import { FloatButton } from '../../shared/FloatButton/FloatButton';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon/Icon';
import { Money } from '../../shared/Money';
import { useItemStore } from '../../stores/useItemStore';
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
  name: 'ItemSummary',
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
    const itemStore = useItemStore(`items-${props.startDate}-${props.endDate}`)()
    // 记账记录
    useAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate))
    watch(() => [props.startDate, props.endDate], () => {
      itemStore.$reset()
      itemStore.fetchItems(props.startDate, props.endDate)
    })
    // 收支情况
    const itemsBalance = reactive({
      expenses: 0, income: 0, balance: 0
    })
    const fetchItemBalance = async () => {
      if (!props.startDate || !props.endDate) return
      const response = await http.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: itemStore.page + 1,
      }, {
        _mock: 'itemIndexBalance', _autoLoading: true
      })
      Object.assign(itemsBalance, response.data)
    }
    useAfterMe(fetchItemBalance)
    watch(() => [props.startDate, props.endDate], () => {
      Object.assign(itemsBalance, {
        expenses: 0, income: 0, balance: 0
      })
      fetchItemBalance()
    })
    return () => (
      !props.startDate || !props.endDate ?
        <>
          <div class={s.notification}>请先选择时间范围</div>
        </> :
        <div class={s.wrapper}>
          {itemStore.items && itemStore.items.length > 0 ? (
            <>
              <ul class={s.total}>
                <li><span>收入</span><Money value={itemsBalance.income} /></li>
                <li><span>支出</span><Money value={itemsBalance.expenses} /></li>
                <li><span>净收入</span><Money value={itemsBalance.balance} /></li>
              </ul>
              <ol class={s.list}>
                {itemStore.items.map(item => (
                  <li>
                    <div class={s.sign}>
                      <span>{item.tags && item.tags.length > 0 ? item.tags![0].sign : '💰'}</span>
                    </div>
                    <div class={s.text}>
                      <div class={s.tagAndAmount}>
                        <span class={s.tag}><>{item.tags && item.tags.length > 0 ? item.tags![0].name : '未分类'}</></span>
                        <span class={s.amount}>￥<Money value={item.amount} /></span>
                      </div>
                      <div class={s.time}>
                        <Datetime value={item.happen_at} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div class={s.more}>
                {itemStore.hasMore ?
                  <Button onClick={() => itemStore.fetchNextPage(props.startDate, props.endDate)}>加载更多</Button> :
                  <span>没有更多</span>
                }
              </div>
            </>)
            :
            <>
              <Center direction='|' class={s.start_center_wrapper}>
                <Icon name="startCenter" class={s.start_center} />
                <p>点击开始记账记一笔吧！</p>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName='add' />
              </RouterLink>
            </>
          }
          <RouterLink to="/items/create">
            <FloatButton iconName='add' />
          </RouterLink>
        </div>
    )
  }
})