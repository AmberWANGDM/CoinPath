/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare var DEBUG : boolean

type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue }

type Tag = {
  id: number
  user_id: number
  name: string
  sign: string
  kind: expenses | income
}

type Resources<T = any> = {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}

type Resource<T> = {
  resource: T
}

type Item = {
  id: number
  user_id: number
  amount: number
  tag_ids: number[]
  tags?:[Tag]
  happen_at: string
  kind: 'expenses' | 'income'
}

type ResourceError = {
  errors: Record<string, string[]>
}

type User = {
  id: number,
  email: string
}

// FormErrors可以看做一个函数，返回一个对象
// {[]:string[]}，这里的[]表示任意的key，string[]表示value的类型
// T为泛型，因此传对象时前面需要加typeof
type FormErrors<T> = {[K in keyof T]:string[]}