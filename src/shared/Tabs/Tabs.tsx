import { defineComponent, PropType } from 'vue'
import s from './Tabs.module.scss'

export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<string>,
      required: false,
    },
    classPrefix: {
      type: String as PropType<string>,
    },
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    return () => {
      const tabs = context.slots.default?.()
      if (!tabs) return () => null
      tabs.map((item) => {
        if (item.type !== Tab) {
          throw new Error('Tabs 的子组件必须是 Tab')
        }
      })
      const cp = props.classPrefix
      return (
        <div class={[s.tabs, cp + '_tabs']}>
          <ol class={[s.tabs_nav, cp + '_tabs_nav']}>
            {tabs.map((item) => {
              // 获取子组件的 name 属性
              return (
                <li
                  class={[
                    item.props?.name === props.selected
                      ? [s.selected, cp + '_selected']
                      : '',
                    cp + '_tabs_nav_item',
                  ]}
                  onClick={() =>
                    context.emit('update:selected', item.props?.name)
                  }
                >
                  {item.props?.name}
                </li>
              )
            })}
          </ol>
          <div>
            {tabs.map((item) => (
              <div v-show={item.props?.name === props.selected}>{item}</div>
            ))}
          </div>
        </div>
      )
    }
  },
})

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div>{context.slots.default?.()}</div>
  },
})
