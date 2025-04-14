// 导出共享的类型定义
export interface User {
  id: string
  name: string
  email: string
}

// 导出共享的工具函数
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN')
}

// 导出共享的常量
export const APP_NAME = 'Sphere' 