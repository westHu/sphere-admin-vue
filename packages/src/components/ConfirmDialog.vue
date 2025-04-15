<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center p-4 text-center">
      <!-- 背景遮罩 -->
      <div 
        class="fixed inset-0 bg-black/30 transition-opacity" 
        @click="cancel"
      ></div>

      <!-- 对话框面板 -->
      <div 
        class="relative w-full max-w-md rounded-lg bg-background p-6 shadow-lg transition-all"
      >
        <div class="mb-4 text-left">
          <h3 class="text-lg font-medium leading-6">{{ title }}</h3>
          <div class="mt-2">
            <p class="text-sm text-muted-foreground">{{ message }}</p>
          </div>
        </div>

        <div class="mt-4 flex justify-end space-x-3">
          <button 
            class="rounded-md border px-4 py-2 text-sm transition-colors hover:bg-muted"
            @click="cancel"
          >
            {{ cancelText }}
          </button>
          <button 
            class="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
            @click="confirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '确认操作'
  },
  message: {
    type: String,
    default: '确定要执行此操作吗？'
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const isOpen = ref(false)

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const confirm = () => {
  emit('confirm')
  close()
}

const cancel = () => {
  emit('cancel')
  close()
}

// 暴露方法供父组件调用
defineExpose({ open, close })
</script> 