import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue }

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
  get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'get'
    })
  }
  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({
      ...config,
      url: url,
      data: data,
      method: 'post'
    })
  }
  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({
      ...config,
      url: url,
      data: data,
      method: 'post'
    })
  }
  // delete
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params'>) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}

export const http = new Http('api/v1')

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