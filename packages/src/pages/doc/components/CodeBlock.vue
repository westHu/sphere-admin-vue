<template>
  <pre :class="['language-' + language, 'code-dark-theme']"><code><slot></slot></code></pre>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  language: {
    type: String,
    default: 'text'
  }
})
</script>

<style scoped>
pre {
  background-color: #1e293b;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #e2e8f0;
  tab-size: 2;
}

/* 深色主题语法高亮 */
:deep(.language-json .string),
:deep(.language-javascript .string),
:deep(.language-typescript .string),
:deep(.language-python .string),
:deep(.language-php .string) { color: #4ade80; }

:deep(.language-json .number),
:deep(.language-javascript .number),
:deep(.language-typescript .number),
:deep(.language-python .number) { color: #60a5fa; }

:deep(.language-json .boolean),
:deep(.language-javascript .boolean),
:deep(.language-typescript .boolean),
:deep(.language-python .boolean) { color: #c084fc; }

:deep(.language-json .null) { color: #c084fc; }

:deep(.language-json .punctuation),
:deep(.language-javascript .punctuation),
:deep(.language-typescript .punctuation),
:deep(.language-python .punctuation) { color: #94a3b8; }

:deep(.language-javascript .keyword),
:deep(.language-typescript .keyword),
:deep(.language-python .keyword),
:deep(.language-java .keyword),
:deep(.language-php .keyword) { color: #f87171; }

:deep(.language-javascript .function),
:deep(.language-typescript .function),
:deep(.language-python .function) { color: #93c5fd; }

:deep(.language-javascript .comment),
:deep(.language-typescript .comment),
:deep(.language-python .comment),
:deep(.language-json .comment) { color: #a3e635; font-style: italic; }

:deep(.language-curl .parameter) { color: #38bdf8; }
:deep(.language-curl .option) { color: #f87171; }

/* 代码行高亮 */
:deep(code .line) {
  display: block;
  padding: 0.1rem 0;
}

:deep(code .line:hover) {
  background-color: rgba(255, 255, 255, 0.05);
}

/* 特殊代码片段高亮 */
:deep(.code-dark-theme .keyword:first-child) {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.1rem 0.2rem;
  border-radius: 2px;
  margin: -0.1rem 0;
}
</style> 