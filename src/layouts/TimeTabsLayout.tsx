import { Overlay } from 'vant'
import { defineComponent, PropType, reactive, ref, watchEffect } from 'vue'
import { Form, FormItem } from '../shared/Form/Form'
import { OverlayIcon } from '../shared/Overlay/Overlay'
import { Tab, Tabs } from '../shared/Tabs/Tabs'
import { Time } from '../shared/time'
import { MainLayout } from './MainLayout'
import s from './TimeTabsLayout.module.scss'

const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },
})

export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true,
    },
  },
  setup: (props, context) => {
    const refSelected = ref('本月')

    const time = new Time()
    // 本月、上月、本年
    const timeList = [
      { start: time.firstDayOfMonth(), end: time.lastDayOfMonth() },
      {
        start: time.add(-1, 'month').firstDayOfMonth(),
        end: time.add(-1, 'month').lastDayOfMonth(),
      },
      { start: time.firstDayOfYear(), end: time.lastDayOfYear() },
    ]
    // 自定义时间
    const customTime = reactive<{
      start?: string,
      end?: string
    }>({})
    // 临时自定义时间
    const tempCustomTime = reactive({
      start: new Time().format(),
      end: new Time().format()
    })
    const refOverlayVisible = ref(false)

    watchEffect(() => {
      if (refSelected.value === '自定义时间') {
        refOverlayVisible.value = true
      }
    })

    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refOverlayVisible.value = false
      Object.assign(customTime, tempCustomTime)
    }

    const onSelect = (value: string) => {
      if (value === '自定义时间') {
        refOverlayVisible.value = true
      }
    }

    return () => (
      <MainLayout>
        {{
          title: () => 'CoinPath',
          icon: () => <OverlayIcon />,
          default: () => (
            <>
              <Tabs
                v-model:selected={refSelected.value}
                onUpdate:selected={onSelect}
                classPrefix={'customTabs'}
              >
                <Tab name="本月">
                  <props.component
                    startDate={timeList[0].start.format()}
                    endDate={timeList[0].end.format()}
                  />
                </Tab>
                <Tab name="上月">
                  <props.component
                    startDate={timeList[1].start.format()}
                    endDate={timeList[1].end.format()}
                  />
                </Tab>
                <Tab name="今年">
                  <props.component
                    startDate={timeList[2].start.format()}
                    endDate={timeList[2].end.format()}
                  />
                </Tab>
                <Tab name="自定义时间">
                  <props.component
                    startDate={customTime.start}
                    endDate={customTime.end}
                  />
                </Tab>
              </Tabs>
              <Overlay show={refOverlayVisible.value} class={s.overlay}>
                <div class={s.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem
                        label="开始时间"
                        type="date"
                        placeholder='请选择开始时间'
                        v-model={tempCustomTime.start}
                      />
                      <FormItem
                        label="结束时间"
                        type="date"
                        placeholder='请选择结束时间'
                        v-model={tempCustomTime.end}
                      />
                      <FormItem>
                        <div class={s.actions}>
                          <button
                            type="button"
                            onClick={() => {
                              refOverlayVisible.value = false
                            }}
                          >
                            取消
                          </button>
                          <button type="submit">确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
