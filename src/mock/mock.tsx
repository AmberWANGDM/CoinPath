import { AxiosRequestConfig } from "axios";
import { faker } from '@faker-js/faker'
// `=>`用来表示函数的定义 左边是输入类型，右边是输出类型
type Mock = (config: AxiosRequestConfig) => [number, any]

export const mockSession: Mock = (config) => {
  return [200, {
    jwt: faker.random.word()
  }]
}

export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  let id = 0
  const createId = () => {
    id += 1
    return id
  }
  const createPager = (page = 1) => {
    return { page, per_page, count }
  }
  const createTag = (n = 1, attrs?: any) => {
    return Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind,
      ...attrs
    }))
  }
  const createBody = (n = 1) => {
    return { resources: createTag(n), pager: createPager(page) }
  }
  if (kind === 'expenses' && (page === 1 || !page)) {
    return [200, createBody(25)]
  } else if (kind === 'expenses' && page === 2) {
    return [200, createBody(1)]
  } else if (kind === 'income' && (page === 1 || !page)) {
    return [200, createBody(25)]
  } else {
    return [200, createBody(10)]
  }
}