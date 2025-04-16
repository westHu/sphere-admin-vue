<template>
  <div class="code-tabs">
    <div class="code-tabs-header">
      <button 
        v-for="tab in tabs" 
        :key="tab.language"
        :class="['tab-button', { active: activeTab === tab.language }]"
        @click="activeTab = tab.language"
      >
        {{ tab.label }}
      </button>
      <div class="tab-actions">
        <button class="action-button" @click="formatCode" title="格式化代码">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10H3"></path>
            <path d="M21 6H3"></path>
            <path d="M21 14H3"></path>
            <path d="M21 18H3"></path>
          </svg>
        </button>
        <button class="action-button" @click="copyActiveCode" title="复制代码">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          <span v-if="copied" class="copied-tooltip">已复制</span>
        </button>
      </div>
    </div>
    <div class="code-tabs-content">
      <div 
        v-for="tab in tabs" 
        :key="tab.language"
        :class="['tab-content', { active: activeTab === tab.language }]"
      >
        <code-block :language="tab.language">{{ formattedCode(tab) }}</code-block>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CodeBlock from './CodeBlock.vue'

interface CodeTab {
  language: string;
  label: string;
  code: string;
  formatted?: string;
}

const props = defineProps<{
  tabs: CodeTab[];
  defaultLanguage?: string;
}>()

const activeTab = ref(props.defaultLanguage || (props.tabs.length > 0 ? props.tabs[0].language : ''))
const copied = ref(false)
const formattedTabs = ref<Record<string, string>>({})

// 复制当前选中的代码
const copyActiveCode = () => {
  const currentTab = props.tabs.find(tab => tab.language === activeTab.value)
  if (currentTab) {
    const codeToCopy = formattedTabs.value[currentTab.language] || currentTab.code
    navigator.clipboard.writeText(codeToCopy).then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
  }
}

// 返回格式化后的代码
const formattedCode = (tab: CodeTab) => {
  return formattedTabs.value[tab.language] || tab.code
}

// 格式化代码
const formatCode = () => {
  const currentTab = props.tabs.find(tab => tab.language === activeTab.value)
  if (!currentTab) return
  
  let code = currentTab.code
  
  // 根据语言进行特定格式化
  switch (currentTab.language) {
    case 'json':
      try {
        // 尝试解析并美化 JSON
        const parsed = JSON.parse(code)
        code = JSON.stringify(parsed, null, 2)
      } catch (e) {
        // 格式化失败，保持原样
        console.warn('无法格式化JSON:', e)
      }
      break
      
    case 'javascript':
    case 'typescript':
      // 简单的 JavaScript 缩进格式化
      code = formatJavaScript(code)
      break
      
    case 'python':
      // 简单的 Python 缩进格式化
      code = formatPython(code)
      break
      
    case 'curl':
      // curl 命令格式化
      code = formatCurl(code)
      break
  }
  
  // 更新已格式化的代码
  formattedTabs.value = { ...formattedTabs.value, [currentTab.language]: code }
}

// JavaScript 格式化逻辑
const formatJavaScript = (code: string) => {
  let formatted = ''
  let indentLevel = 0
  const lines = code.split('\n')
  
  for (let line of lines) {
    const trimmedLine = line.trim()
    
    // 减少缩进级别 (如果行以结束括号开始)
    if (trimmedLine.startsWith('}') || trimmedLine.startsWith(')') || trimmedLine.startsWith(']')) {
      indentLevel = Math.max(0, indentLevel - 1)
    }
    
    // 添加缩进
    const indent = '  '.repeat(indentLevel)
    formatted += indent + trimmedLine + '\n'
    
    // 增加缩进级别 (如果行以开始括号结束)
    if (trimmedLine.endsWith('{') || trimmedLine.endsWith('(') || 
        (trimmedLine.endsWith('[') && !trimmedLine.includes(']'))) {
      indentLevel++
    }
    
    // 处理同一行有开始和结束括号的情况
    if (trimmedLine.endsWith('}') || trimmedLine.endsWith(')') || trimmedLine.endsWith(']')) {
      // 计算该行中的开始和结束括号
      const openBrackets = (trimmedLine.match(/{|\(|\[/g) || []).length
      const closeBrackets = (trimmedLine.match(/}|\)|\]/g) || []).length
      
      // 如果开始括号多于结束括号，增加缩进
      if (openBrackets > closeBrackets) {
        indentLevel++
      }
      // 如果结束括号多于开始括号，减少缩进
      else if (closeBrackets > openBrackets) {
        indentLevel = Math.max(0, indentLevel - (closeBrackets - openBrackets))
      }
    }
  }
  
  return formatted.trim()
}

// Python 格式化逻辑
const formatPython = (code: string) => {
  let formatted = ''
  let indentLevel = 0
  const lines = code.split('\n')
  
  for (let line of lines) {
    const trimmedLine = line.trim()
    
    // 空行保持原样
    if (trimmedLine === '') {
      formatted += '\n'
      continue
    }
    
    // 添加缩进
    const indent = '    '.repeat(indentLevel)
    formatted += indent + trimmedLine + '\n'
    
    // 增加缩进级别（如果行以冒号结束且不是注释）
    if (trimmedLine.endsWith(':') && !trimmedLine.startsWith('#')) {
      indentLevel++
    }
    
    // 减少缩进级别（如果遇到特定关键字开始的行）
    if (/^(return|break|continue|raise|pass|else|elif|except|finally)/.test(trimmedLine)) {
      indentLevel = Math.max(0, indentLevel - 1)
    }
  }
  
  return formatted.trim()
}

// curl 命令格式化
const formatCurl = (code: string) => {
  // 替换连续的空格为单个空格
  let formatted = code.replace(/\s+/g, ' ').trim()
  
  // 在每个 -H 和 -d 前换行并添加两个空格的缩进
  formatted = formatted.replace(/\s+(-[a-zA-Z])\s+/g, ' \\\n  $1 ')
  
  // 处理 JSON 数据部分，确保它格式良好
  if (formatted.includes('-d \'')) {
    const parts = formatted.split('-d \'')
    const prefix = parts[0]
    let jsonPart = parts[1]
    
    // 提取JSON部分 (在单引号之间)
    const jsonEndIndex = jsonPart.lastIndexOf('\'')
    const jsonStr = jsonPart.substring(0, jsonEndIndex)
    const suffix = jsonPart.substring(jsonEndIndex)
    
    try {
      // 尝试解析并美化JSON
      const jsonObj = JSON.parse(jsonStr)
      const prettyJson = JSON.stringify(jsonObj, null, 2)
      
      // 将格式化后的JSON添加缩进并换行
      const indentedJson = prettyJson.split('\n').join('\n  ')
      
      formatted = `${prefix}-d '${indentedJson}'${suffix}`
    } catch (e) {
      // JSON 解析失败，保持原样
      console.warn('无法格式化curl中的JSON:', e)
    }
  }
  
  return formatted
}

// 初始化时自动格式化所有代码
for (const tab of props.tabs) {
  if (tab.formatted) {
    formattedTabs.value[tab.language] = tab.formatted
  }
}
</script>

<style scoped>
.code-tabs {
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid #475569;
  background-color: #1e293b !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  -webkit-font-smoothing: auto !important;
  -moz-osx-font-smoothing: auto !important;
}

.code-tabs-header {
  display: flex;
  background-color: #0f172a !important;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  justify-content: space-between;
  border-bottom: 1px solid #475569;
}

.code-tabs-header::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.tab-button {
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #cbd5e1 !important;
  transition: color 0.2s, background-color 0.2s;
  white-space: nowrap;
  text-rendering: optimizeLegibility;
}

.tab-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #f1f5f9 !important;
}

.tab-button.active {
  color: #60a5fa !important;
  font-weight: 600;
  border-bottom: 2px solid #60a5fa;
  margin-bottom: -1px;
}

.tab-actions {
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
}

.action-button {
  background: none;
  border: none;
  color: #cbd5e1 !important;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.action-button:hover {
  color: #f1f5f9 !important;
  background-color: rgba(255, 255, 255, 0.1);
}

.copied-tooltip {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #475569;
  color: #f1f5f9 !important;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.code-tabs-content {
  position: relative;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

/* 动画效果 */
.tab-content {
  opacity: 0;
  transition: opacity 0.2s;
}

.tab-content.active {
  opacity: 1;
}

:deep(pre) {
  margin: 0 !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
</style> 