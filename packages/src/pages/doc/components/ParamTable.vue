<template>
  <div class="param-table-container">
    <table class="param-table">
      <thead>
        <tr>
          <th>参数名</th>
          <th>类型</th>
          <th>必填</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(param, index) in params" :key="index">
          <td class="param-name">{{ param.name }}</td>
          <td class="param-type">{{ param.type }}</td>
          <td class="param-required">
            <span v-if="param.required" class="required">是</span>
            <span v-else>否</span>
          </td>
          <td class="param-desc">{{ param.desc }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Param {
  name: string;
  type: string;
  required: boolean;
  desc: string;
}

defineProps({
  params: {
    type: Array as () => Param[],
    required: true
  }
})
</script>

<style scoped>
.param-table-container {
  overflow-x: auto;
  margin: 1rem 0;
}

.param-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.param-table th {
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  font-weight: 600;
  background-color: var(--color-background-muted, #f9fafb);
}

.param-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  vertical-align: top;
}

.param-name {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-weight: 500;
}

.param-type {
  color: var(--color-text-muted, #6b7280);
}

.param-required .required {
  color: #ef4444;
  font-weight: 500;
}

.param-table tr:last-child td {
  border-bottom: none;
}

@media (max-width: 640px) {
  .param-table th:nth-child(3),
  .param-table td:nth-child(3) {
    display: none;
  }
}
</style> 