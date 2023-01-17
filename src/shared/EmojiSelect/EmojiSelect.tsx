import { computed, defineComponent, PropType, ref } from 'vue';
import { emojiList } from '../emojiList';
import s from './EmojiSelect.module.scss';
export const EmojiSelect = defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refSeletedItem = ref(0)
    const table: [string, string[]][] = [
      ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
        'person-activity', 'person-sport', 'person-resting']],
      ['食物', [
        'food-fruit', 'food-vegetable', 'food-prepared', 'food-asian',
        'food-marine', 'food-sweet'
      ]],
      ['衣服', ['clothing']],
      ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
        'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
      ['植物', ['plant-flower', 'plant-other']],
      ['表情', ['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
        'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
        'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
      ]],
      ['手势', ['hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
        'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts']],
      ['运动', ['sport', 'game']],
      ['自然', ['sky & weather', 'science']],
    ]
    const onClickTab = (index: number) => {
      refSeletedItem.value = index
    }
    const onClickEmoji = (item: string) => {
      context.emit('update:modelValue', item)
    }
    const emojis = computed(() => {
      const selectedItem = table[refSeletedItem.value][1]
      return selectedItem.map(category =>
        emojiList.find(item => item[0] === category)?.[1]
          .map(item => <li class={item === props.modelValue ? s.selectedEmoji : ''}
            onClick={() => onClickEmoji(item)}>{item}</li>)
      )
    })
    return () => (
      <div class={s.emojiList}>
        <nav>
          {table.map((navItem, index) =>
            <span class={index === refSeletedItem.value ? s.selected : ''} onClick={() => onClickTab(index)}>{navItem[0]}</span>
          )
          }
        </nav>
        <ol>
          {emojis.value}
        </ol>
      </div>
    )
  }
})