import { AxiosRequestConfig } from "axios";
import { faker } from '@faker-js/faker'
// `=>`用来表示函数的定义 左边是输入类型，右边是输出类型
type Mock = (config: AxiosRequestConfig) => [number, any]

export const mockSession: Mock = (config) => {
  return [200, {
    jwt: faker.random.word()
  }]
}