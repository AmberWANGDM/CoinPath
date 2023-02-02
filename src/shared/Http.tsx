import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Toast } from "vant";

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
  get<R = unknown>(url: string, query?: Record<string, string | number>, config?: GetConfig) {
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

export const http = new Http(DEBUG ? '/api/v1/' : 'http://121.196.236.94:3000/api/v1')

// 请求拦截器
http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    // 类型断言 !.
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  if (config._autoLoading === true) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 测试环境mock
if (DEBUG) {
  import('../mock/mock').then(({ mockItemCreate, mockItemIndex, mockItemIndexBalance, mockItemSummary, mockSession, mocktagEdit, mockTagIndex, mockTagShow }) => {
    const mock = (response: AxiosResponse) => {
      switch (response.config?._mock) {
        case 'itemSummary':
          [response.status, response.data] = mockItemSummary(response.config)
          return true
        case 'itemIndexBalance':
          [response.status, response.data] = mockItemIndexBalance(response.config)
          return true
        case 'itemIndex':
          [response.status, response.data] = mockItemIndex(response.config)
          return true
        case 'tagEdit':
          [response.status, response.data] = mocktagEdit(response.config)
          return true
        case 'tagShow':
          [response.status, response.data] = mockTagShow(response.config)
          return true
        case 'itemCreate':
          [response.status, response.data] = mockItemCreate(response.config)
          return true
        case 'tagIndex':
          [response.status, response.data] = mockTagIndex(response.config)
          return true
        case 'session':
          [response.status, response.data] = mockSession(response.config)
          return true
      }
      return false
    }
    // 响应拦截器-mock
    http.instance.interceptors.response.use((response) => {
      // 尝试mock，对response进行篡改
      mock(response)
      if (response.status >= 400) {
        throw response
      } else {
        return response
      }
    }, (error) => {
      mock(error.response)
      if (error.response.status >= 400) {
        throw error
      } else {
        return error.response
      }
    })
  })
}

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
// 响应拦截器-关闭loading
http.instance.interceptors.response.use((response) => {
  Toast.clear()
  return response
}, (error) => {
  Toast.clear()
  throw error
}
)