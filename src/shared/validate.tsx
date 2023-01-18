// 1. 传入的 formData 是一个对象，对象的 key 可以是任意的字符串，值可以是任意的类型
interface FData {
  [k: string]: string | number | null | undefined | FData
}

// 2. 传入的 rules 是一个数组，数组的每一项是一个对象，对象的 key 是 T 的子集，值是一个字符串
type Rule<T> = {
  key: keyof T,
  message: string
  // required?: boolean
  // pattern?: RegExp
} & ({ type: 'required' } | { type: 'pattern', regex: RegExp })

type Rules<T> = Rule<T>[]

export type { Rules, Rule, FData }
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  // 3. errors 是一个对象，对象的 key 是 T 的子集，值是一个数组，数组的每一项是字符串
  type Errors = {
    [k in keyof T]?: string[]
  }
  const errors: Errors = {}

  rules.map(rule => {
    // 取出rule的key, type, message
    const { key, type, message } = rule
    // 通过key取出formData的对应值
    const value = formData[key]
    // 根据type的不同，进行不同的校验
    switch (type) {
      case 'required': // 如果是必填项，且值为空，则将message添加到errors中
        if (!value) {
          errors[key] = errors[key] || []
          errors[key]?.push(message)
        }
        break
      case 'pattern': // 如果是正则校验，且值不符合正则，则将message添加到errors中
        if (value && !rule.regex.test(value.toString())) {
          errors[key] = errors[key] || []
          errors[key]?.push(message)
        }
        break
      default:
        break
    }
  })
  return errors
}