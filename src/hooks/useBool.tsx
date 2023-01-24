import { ref } from "vue"

export const useBool = (initialValue: boolean) => {
  const bool = ref(initialValue)
  return {
    ref: bool,
    on: () => bool.value = true,
    off: () => bool.value = false,
    toggle: () => bool.value = !bool.value
  }
}