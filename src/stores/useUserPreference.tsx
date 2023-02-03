import { defineStore } from "pinia";
type Kind = 'income' | 'expenses'
type ItemState = {
  kind?: Kind,
}
type ItemActions = {
  changeKind: (kind: Kind) => void
}
export const useUserPreference = (id: string) => defineStore<string, ItemState, {}, ItemActions>(id, {
  state: () => ({
    kind: 'expenses',
  }),
  actions: {
    changeKind(kind) {
      this.kind = kind
    }
  }
})