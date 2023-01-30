import { onMounted } from "vue"
import { useMeStore } from "../stores/useMeStore"

export const useAfterMe = (fn: () => void) => {
  const meStore = useMeStore()
  onMounted(async () => {
    await meStore.mePromise!.then(fn, () => undefined)
    // 1.0
    // try {
    //   await meStore.mePromise
    // } catch (error) {
    //   return
    // }
    // fn()
    // 2.0
    // const result = await meStore.mePromise!.catch(() => {
    //   return new Error()
    // })
    // if (result instanceof Error) return
    // fn()
  })
}