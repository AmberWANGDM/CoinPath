import { defineStore } from "pinia"
import { http } from "../shared/Http"
type ItemState = {
  page: number,
  items: Item[],
  hasMore: boolean
}
type ItemActions = {
  fetchItems: (startDate?: string, endDate?: string) => void,
  reset: () => void
}
export const useItemStore = (id: string) => defineStore<string, ItemState, {}, ItemActions>(id, {
  state: () => {
    return {
      page: 0,
      items: [],
      hasMore: false
    }
  },
  actions: {
    reset() {
      this.hasMore = false
      this.page = 0
      this.items = []
    },
    async fetchItems(startDate, endDate) {
      if (!startDate || !endDate) return
      const response = await http.get<Resources<Item>>('/items', {
        page: this.page + 1,
        happen_after: startDate,
        happen_before: endDate,
      }, { _mock: 'itemIndex', _autoLoading: true })
      const { resources, pager } = response.data
      this.items.push(...resources)
      this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
      this.page += 1
    }
  }
})