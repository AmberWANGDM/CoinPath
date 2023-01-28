import { defineComponent, PropType, ref } from 'vue'
import { routerKey, RouterLink, useRouter } from 'vue-router'
import { useTags } from '../../hooks/useTags'
import { Button } from '../../shared/Button/Button'
import { http } from '../../shared/Http'
import { Icon } from '../../shared/Icon/Icon'
import s from './Tags.module.scss'
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true,
    },
    selected: Number,
  },
  emit: ['update:selected'],
  setup: (props, context) => {
    const router = useRouter()
    const { tags, hasMore, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        page: page + 1,
      }, { _mock: 'tagIndex', _autoLoading: true })
    })
    const timer = ref<number>()
    const currentTag = ref<HTMLDivElement>()
    const longPress = (tagId: Tag['id']) => {
      router.push(`/tags/${tagId}/edit?kind=${props.kind}&return_to=${router.currentRoute.value.fullPath}`)
    }
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id)
    }
    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      // 记录当前所在标签并计时
      currentTag.value = e.currentTarget as HTMLDivElement
      timer.value = setTimeout(() => {
        longPress(tag.id)
      }, 500);
    }
    const onTouchEnd = () => {
      clearTimeout(timer.value)
    }
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      // 移出当前tag需要清空timer
      if (currentTag.value !== pointedElement
        && currentTag.value?.contains(pointedElement) === false) {
        clearTimeout(timer.value)
      }
    }
    return () => (
      <>
        <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
          <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
          </RouterLink>
          {tags.value.map((tag) => (
            <div
              class={[s.tag, props.selected === tag.id ? s.selected : '']}
              onClick={() => onSelect(tag)}
              onTouchstart={(e) => onTouchStart(e, tag)}
              onTouchend={onTouchEnd}
            >
              <div class={s.sign}>{tag.sign}</div>
              <div class={s.name}>{tag.name}</div>
            </div>
          ))}
        </div>
        <div class={s.more}>
          {hasMore.value ? (
            <Button class={s.loadMore} onClick={fetchTags}>
              加载更多
            </Button>
          ) : (
            <span class={s.noMore}>没有更多</span>
          )}
        </div>
      </>
    )
  },
})
