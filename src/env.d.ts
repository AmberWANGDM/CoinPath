/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue }

// `=>`用来表示函数的定义 左边是输入类型，右边是输出类型
type Mock = (config: AxiosRequestConfig) => [number, any]
