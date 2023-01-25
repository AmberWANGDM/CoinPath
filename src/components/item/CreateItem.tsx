import { defineComponent, onMounted, PropType, ref } from 'vue';
import { useTags } from '../../hooks/useTags';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button/Button';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon/Icon';
import { Tab, Tabs } from '../../shared/Tabs/Tabs';
import s from './CreateItem.module.scss';
import { InputPad } from './InputPad';
export const CreateItem = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出')

    const { tags: expensesTags, hasMore, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        _mock: 'tagIndex',
        page: page + 1
      });
    })
    const { tags: incomeTags, hasMore: hasMore2, fetchTags: fetchTags2 } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'income',
        _mock: 'tagIndex',
        page: page + 1
      });
    })


    return () => (
      <MainLayout>{{
        title: () => '记一笔',
        icon: () => <Icon name="back" class={s.navIcon} />,
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={refKind.value} class={s.tabs}>
              <Tab name="支出">
                <div class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} />
                    </div>
                    <div class={s.name}>
                      新增
                    </div>
                  </div>
                  {expensesTags.value.map(tag =>
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
                </div>
                <div class={s.more}>
                  {hasMore.value ?
                    <Button class={s.loadMore} onClick={fetchTags}>加载更多</Button> :
                    <span class={s.noMore}>没有更多</span>
                  }
                </div>
              </Tab>
              <Tab name="收入">
                <div class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} />
                    </div>
                    <div class={s.name}>
                      新增
                    </div>
                  </div>
                  {incomeTags.value.map(tag =>
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
                </div>
                <div class={s.more}>
                  {hasMore2.value ?
                    <Button class={s.loadMore} onClick={fetchTags2}>加载更多</Button> :
                    <span class={s.noMore}>没有更多</span>
                  }
                </div>
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
            </div>
          </div>
        </>
      }}</MainLayout>
    )
  }
})