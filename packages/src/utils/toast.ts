import { createVNode, render } from 'vue'
import Toast from '../components/Toast.vue'

interface ToastOptions {
  message: string
  type?: 'info' | 'success' | 'error' | 'warning'
  duration?: number
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  closable?: boolean
}

// 创建容器
const createToastContainer = (): HTMLDivElement => {
  const container = document.createElement('div')
  container.className = 'toast-container'
  document.body.appendChild(container)
  return container
}

// 显示toast
const showToast = (options: ToastOptions): void => {
  // 创建容器
  const container = createToastContainer()
  
  // 创建虚拟节点
  const vnode = createVNode(Toast, {
    ...options,
    onDestroy: () => {
      // 组件卸载后移除容器
      render(null, container)
      container.remove()
    }
  })
  
  // 渲染到容器
  render(vnode, container)
}

// 便捷方法
export const toast = {
  info: (message: string, options: Omit<ToastOptions, 'message' | 'type'> = {}) => 
    showToast({ message, type: 'info', ...options }),
    
  success: (message: string, options: Omit<ToastOptions, 'message' | 'type'> = {}) => 
    showToast({ message, type: 'success', ...options }),
    
  error: (message: string, options: Omit<ToastOptions, 'message' | 'type'> = {}) => 
    showToast({ message, type: 'error', ...options }),
    
  warning: (message: string, options: Omit<ToastOptions, 'message' | 'type'> = {}) => 
    showToast({ message, type: 'warning', ...options })
}

export default toast 