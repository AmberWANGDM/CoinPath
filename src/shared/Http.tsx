import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { mockSession } from "../mock/mock";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>
/**
 * 中间层HttpClient，隔离对axios的依赖
 */
export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  // read
  get<R = unknown>(url: string, query?: Record<string, string>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
  }
  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  // delete
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}
const mock = (response: AxiosResponse) => {
  // 排除线上地址
  if (location.hostname !== 'localhost'
    && location.hostname !== '127.0.0.1'
    && location.hostname !== '192.168.3.57') { return false }
  switch (response.config?.params?._mock) {
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config)
      return true
    case 'itemCreate':
      [response.status, response.data] = mockItemCreate(response.config)
      return true
    case 'itemIndex':
      [response.status, response.data] = mockItemIndex(response.config)
      return true
    case 'tagCreate':
      [response.status, response.data] = mockTagCreate(response.config)
    case 'session':
      [response.status, response.data] = mockSession(response.config)
      return true
  }
  return false
}

export const http = new Http('api/v1')

// 请求拦截器
http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    // 类型断言 !.
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// 响应拦截器-mock
http.instance.interceptors.response.use((response) => {
  // 尝试mock，对response进行篡改
  mock(response)
  return response
}, (error) => {
  if (mock(error.response)) {
    return error.response
  } else {
    throw error
  }
})
// 响应拦截器-公共错误处理
http.instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  // error不一定是请求错误，需要判断error.response是否存在
  if (error.response) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 429) {
      alert('请求过于频繁，请稍后再试')
    }
  }
  // return Promise.reject(error) 等价于 
  throw error
})