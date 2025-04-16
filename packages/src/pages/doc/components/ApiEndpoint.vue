<template>
  <div class="api-endpoint">
    <span class="method" :class="methodClass">{{ method }}</span>
    <span class="path">{{ path }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  method: {
    type: String,
    default: 'GET',
    validator: (value: string) => ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(value.toUpperCase())
  },
  path: {
    type: String,
    required: true
  }
})

const methodClass = computed(() => {
  const method = props.method.toUpperCase()
  switch (method) {
    case 'GET': return 'method-get'
    case 'POST': return 'method-post'
    case 'PUT': return 'method-put'
    case 'DELETE': return 'method-delete'
    case 'PATCH': return 'method-patch'
    default: return ''
  }
})
</script>

<style scoped>
.api-endpoint {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.method {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-right: 0.75rem;
}

.path {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.875rem;
  word-break: break-all;
}

.method-get {
  background-color: rgba(16, 185, 129, 0.1);
  color: rgb(16, 185, 129);
}

.method-post {
  background-color: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
}

.method-put {
  background-color: rgba(245, 158, 11, 0.1);
  color: rgb(245, 158, 11);
}

.method-delete {
  background-color: rgba(239, 68, 68, 0.1);
  color: rgb(239, 68, 68);
}

.method-patch {
  background-color: rgba(124, 58, 237, 0.1);
  color: rgb(124, 58, 237);
}

@media (prefers-color-scheme: dark) {
  .method-get {
    background-color: rgba(16, 185, 129, 0.2);
    color: rgb(52, 211, 153);
  }
  
  .method-post {
    background-color: rgba(59, 130, 246, 0.2);
    color: rgb(96, 165, 250);
  }
  
  .method-put {
    background-color: rgba(245, 158, 11, 0.2);
    color: rgb(251, 191, 36);
  }
  
  .method-delete {
    background-color: rgba(239, 68, 68, 0.2);
    color: rgb(248, 113, 113);
  }
  
  .method-patch {
    background-color: rgba(124, 58, 237, 0.2);
    color: rgb(167, 139, 250);
  }
}
</style> 