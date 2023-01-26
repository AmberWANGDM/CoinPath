/* 
  example:
  import { time } from 'shared/time'
  time.format('YYYY-MM-DD HH:mm:ss.SSS') // 2021-03-01 10:00:00.000
  time.firstDayOfMonth()
  time.firstDayOfYear()
  time.lastDayOfMonth()
  time.lastDayOfYear()
  time.add(1,'month')
  time.substract(1,'month')
*/
export class Time {
  private date: Date
  // 初始化 date，默认值为当前时间
  constructor(date?: string | Date) {
    if (date === undefined) {
      this.date = new Date()
    } else if (typeof date === 'string') {
      this.date = new Date(date)
    } else {
      this.date = date
    }
  }
  // 方法挂载在原型上
  // 格式日期
  format(pattern = 'YYYY-MM-DD') {
    // 目前支持的格式有 YYYY MM DD HH mm ss SSS
    const year = this.date.getFullYear()
    const month = this.date.getMonth() + 1
    const day = this.date.getDate()
    const hour = this.date.getHours()
    const minute = this.date.getMinutes()
    const second = this.date.getSeconds()
    const millisecond = this.date.getMilliseconds()
    return pattern.replace(/YYYY/g, year.toString())
      .replace(/MM/, month.toString().padStart(2, '0'))
      .replace(/DD/, day.toString().padStart(2, '0'))
      .replace(/HH/, hour.toString().padStart(2, '0'))
      .replace(/mm/, minute.toString().padStart(2, '0'))
      .replace(/ss/, second.toString().padStart(2, '0'))
      .replace(/SSS/, millisecond.toString().padStart(3, '0'))
  }
  // 获取当前时间的 月初
  firstDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0))
  }
  // 获取当前时间的 年初
  firstDayOfYear() {
    return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0))
  }
  // 获取当前时间的 月末
  // 下个月的 0 号就是当前月的最后一天
  lastDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0))
  }
  // 获取当前时间的 年末
  lastDayOfYear() {
    return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0))
  }
  // 添加时间
  add(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond') {
    const date = new Date(this.date.getTime())
    switch (unit) {
      case 'year':
        date.setFullYear(date.getFullYear() + amount)
        break
      case 'month':
        // js 添加月份是添加当月的天数
        const d = date.getDate() // date 2000-01-31 [31]
        date.setDate(1) // date 2000-01-01
        date.setMonth(date.getMonth() + amount) // date 2000-02-01
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate() // date 2000-02-29 [29]
        date.setDate(Math.min(d, d2))
        break
      case 'day':
        date.setDate(date.getDate() + amount)
        break
      case 'hour':
        date.setHours(date.getHours() + amount)
        break
      case 'minute':
        date.setMinutes(date.getMinutes() + amount)
        break
      case 'second':
        date.setSeconds(date.getSeconds() + amount)
        break
      case 'millisecond':
        date
    }
    return new Time(date)
  }
}