import { defineStore } from "pinia"
import { http } from "../shared/Http"
type ItemState = {
  page: number,
  items: Item[],
  hasMore: boolean
}
type ItemActions = {
  _fetch: (firstPage: boolean, startDate?: string, endDate?: string) => void,
  fetchItems: (startDate?: string, endDate?: string) => void,
  fetchNextPage: (startDate?: string, endDate?: string) => void,
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
    async _fetch(firstPage, startDate, endDate) {
      if (!startDate || !endDate) return
      const response = await http.get<Resources<Item>>('/items', {
        page: firstPage ? 1 : this.page + 1,
        happen_after: startDate,
        happen_before: endDate,
      }, { _mock: 'itemIndex', _autoLoading: true })
      const { resources, pager } = response.data
      if (firstPage) {
        this.items = resources
      }
      else {
        this.items.push(...resources)
      }
      this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
      this.page += 1
    },
    async fetchItems(startDate, endDate) {
      this._fetch(true, startDate, endDate)
    },
    async fetchNextPage(startDate, endDate) {
      this._fetch(false, startDate, endDate)
    }
  }
})