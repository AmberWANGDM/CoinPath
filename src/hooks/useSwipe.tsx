import { computed, onMounted, onUnmounted, ref, Ref } from "vue";

// 类型别名
type Point = { x: number, y: number }

// 配置项
interface Options {
  beforeStart?: (e: TouchEvent) => void,
  afterStart?: (e: TouchEvent) => void,
  beforeMove?: (e: TouchEvent) => void,
  afterMove?: (e: TouchEvent) => void,
  beforeEnd?: (e: TouchEvent) => void,
  afterEnd?: (e: TouchEvent) => void,
}

export const useSwipe = (element: Ref<HTMLElement | undefined>, options?: Options) => {
  // 开始和结束坐标
  const start = ref<Point>()
  const end = ref<Point>()

  // 是否正在滑动
  const swiping = ref(false)

  // 计算x和y轴移动距离，以判断方向
  const distance = computed(() => {
    if (!start.value || !end.value) { return null }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    }
  })

  // 计算方向
  const direction = computed(() => {
    if (!swiping.value) { return '' }
    if (!distance.value) { return '' }
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      // 在x轴投影大于y轴，说明是水平移动
      return x > 0 ? 'right' : 'left'
    } else {
      // 垂直移动
      return y > 0 ? 'down' : 'up'
    }
  })

  const onStart = (ev: TouchEvent) => {
    options?.beforeStart?.(ev)
    // 记录开始位置
    end.value = start.value = {
      x: ev.touches[0].clientX,
      y: ev.touches[0].clientY
    }
    // 正在滑动
    swiping.value = true
    options?.afterStart?.(ev)
  }

  const onMove = (ev: TouchEvent) => {
    options?.beforeMove?.(ev)
    // 结束坐标就是touchmove的最后一刻
    end.value = {
      x: ev.touches[0].clientX,
      y: ev.touches[0].clientY
    }
    options?.afterMove?.(ev)
  }

  const onEnd = (ev: TouchEvent) => {
    options?.beforeEnd?.(ev)
    // 结束滑动
    swiping.value = false
    start.value = undefined
    end.value = undefined
    options?.afterEnd?.(ev)
  }

  // 组件挂载时给元素添加touch事件
  onMounted(() => {
    element.value?.addEventListener('touchstart', onStart)
    element.value?.addEventListener('touchmove', onMove)
    element.value?.addEventListener('touchend', onEnd)
  })

  // 组件卸载时删除事件
  onUnmounted(() => {
    element.value?.removeEventListener('touchstart', onStart)
    element.value?.removeEventListener('touchmove', onMove)
    element.value?.removeEventListener('touchend', onEnd)
  })
  return {
    swiping, distance, direction
  }
}
