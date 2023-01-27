import { AxiosResponse } from "axios";
import { http } from "./Http"

export let mePromise: Promise<AxiosResponse<Resource<User>>> | undefined

// 更新用户信息
export const refreshMe = () => {
  mePromise = http.get<Resource<User>>('/me')
  return mePromise
}

// 首次获取用户信息
export const fetchMe = refreshMe