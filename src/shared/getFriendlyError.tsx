const map: Record<string, string> = {
  'is invalid': '格式不合法'
}

export const getFriendlyError = (error: string) => {
  return map[error] || error
}
