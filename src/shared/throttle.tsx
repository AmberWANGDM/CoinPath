/**
 * 节流
 * @param fn 执行函数
 * @param time 间隔时间
 * @returns 
 */
export const throttle = (fn: Function, time: number) => {
  let timer: number | undefined = undefined
  return (...args: any[]) => {
    // 如果timer存在，说明还在等待，直接返回
    if (timer) {
      return
    } else {
      // 否则执行函数，并设置timer
      fn(...args)
      // 用setTimeout模拟setInterval
      timer = setTimeout(() => {
        timer = undefined
      }, time)
    }
  }
}