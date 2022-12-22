import { defineComponent, ref } from "vue"

export const App2 = defineComponent({
  setup(){
    const refCount = ref(0)
    const add = () => {
      refCount.value += 1
    }
    return () =>
    <> 
    <div>
      {refCount.value}
    </div>
    <div>
      <button onClick={add}>+1</button>
    </div>
    </>
  }
})

