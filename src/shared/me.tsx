import { AxiosResponse } from "axios";
import { http } from "./Http"

export let mePromise: Promise<AxiosResponse<{
  resource: {
    id: number;
  };
}>> | undefined

// 更新用户信息
export const refreshMe = () => {
  mePromise = http.get<{ resource: { id: number } }>('/me')
  return mePromise
}

// 首次获取用户信息
export const fetchMe = refreshMe