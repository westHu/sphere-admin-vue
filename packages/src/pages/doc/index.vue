<template>
  <div class="doc-container">
    <div class="doc-sidebar">
      <div class="sidebar-header">
        <h2>Sphere API</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li><a href="#introduction" @click.prevent="scrollToSection('introduction')">介绍</a></li>
          <li>
            <span class="nav-group-title">商户API</span>
            <ul>
              <li><a href="#auth" @click.prevent="scrollToSection('auth')">认证授权</a></li>
              <li><a href="#orders" @click.prevent="scrollToSection('orders')">订单管理</a></li>
              <li><a href="#products" @click.prevent="scrollToSection('products')">商品管理</a></li>
              <li><a href="#customers" @click.prevent="scrollToSection('customers')">客户管理</a></li>
            </ul>
          </li>
          <li>
            <span class="nav-group-title">管理员API</span>
            <ul>
              <li><a href="#admin-auth" @click.prevent="scrollToSection('admin-auth')">管理员认证</a></li>
              <li><a href="#merchants" @click.prevent="scrollToSection('merchants')">商户管理</a></li>
              <li><a href="#admin-orders" @click.prevent="scrollToSection('admin-orders')">订单管理</a></li>
              <li><a href="#settlement" @click.prevent="scrollToSection('settlement')">结算管理</a></li>
              <li><a href="#system" @click.prevent="scrollToSection('system')">系统管理</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    
    <div class="doc-content" ref="contentRef">
      <!-- 介绍 -->
      <section id="introduction" class="doc-section">
        <h1>Sphere API 文档</h1>
        <p class="api-version">API 版本: v1.0</p>
        
        <div class="content-box">
          <h2>基本信息</h2>
          <p>Sphere API 提供了商户和管理员操作系统的所有功能。本文档详细介绍了API的使用方法、认证机制和各个端点的详细信息。</p>
          
          <h3>基础URL</h3>
          <code-block language="text">https://api.sphere.com/v1</code-block>
          
          <h3>请求格式</h3>
          <p>所有请求应当使用 JSON 格式的请求体，并设置以下 HTTP 头：</p>
          <code-block language="text">
Content-Type: application/json
Accept: application/json
          </code-block>
          
          <h3>认证</h3>
          <p>大多数 API 端点需要认证。认证通过 Bearer Token 机制实现：</p>
          <code-block language="text">
Authorization: Bearer {your_token}
          </code-block>
          
          <h3>响应格式</h3>
          <p>所有响应均为 JSON 格式，包含以下基本结构：</p>
          <code-block language="json">
{
  "code": 200,
  "message": "操作成功",
  "data": {
    // 返回的数据
  }
}
          </code-block>
          
          <h3>错误处理</h3>
          <p>当发生错误时，API 将返回对应的 HTTP 状态码和错误信息：</p>
          <code-block language="json">
{
  "code": 400,
  "message": "参数错误",
  "errors": [
    {
      "field": "email",
      "message": "邮箱格式不正确"
    }
  ]
}
          </code-block>
        </div>
      </section>
      
      <!-- 商户认证授权 -->
      <section id="auth" class="doc-section">
        <h2>商户认证授权</h2>
        
        <div class="content-box">
          <h3>登录</h3>
          <api-endpoint method="POST" path="/merchant/login"></api-endpoint>
          
          <p>商户登录并获取访问令牌。</p>
          
          <h4>请求参数</h4>
          <param-table :params="[
            { name: 'username', type: 'string', required: true, desc: '用户名' },
            { name: 'password', type: 'string', required: true, desc: '密码' },
            { name: 'remember_me', type: 'boolean', required: false, desc: '是否记住登录状态' }
          ]"></param-table>
          
          <h4>请求示例</h4>
          <code-block language="json">
{
  "username": "merchant001",
  "password": "password123",
  "remember_me": true
}
          </code-block>
          
          <h4>响应示例</h4>
          <code-block language="json">
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400,
    "user": {
      "id": "m_001",
      "username": "merchant001",
      "name": "示例商户",
      "email": "merchant@example.com"
    }
  }
}
          </code-block>
          
          <h3>注册</h3>
          <api-endpoint method="POST" path="/merchant/register"></api-endpoint>
          
          <p>注册新商户账户。</p>
          
          <h4>请求参数</h4>
          <param-table :params="[
            { name: 'username', type: 'string', required: true, desc: '用户名' },
            { name: 'password', type: 'string', required: true, desc: '密码' },
            { name: 'name', type: 'string', required: true, desc: '商户名称' },
            { name: 'email', type: 'string', required: true, desc: '邮箱地址' },
            { name: 'phone', type: 'string', required: true, desc: '联系电话' }
          ]"></param-table>
          
          <h4>请求示例</h4>
          <code-block language="json">
{
  "username": "newmerchant",
  "password": "securepass123",
  "name": "新商户",
  "email": "new@example.com",
  "phone": "13800138000"
}
          </code-block>
          
          <h4>响应示例</h4>
          <code-block language="json">
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "id": "m_002",
    "username": "newmerchant",
    "name": "新商户",
    "email": "new@example.com"
  }
}
          </code-block>
        </div>
      </section>
      
      <!-- 订单管理 -->
      <section id="orders" class="doc-section">
        <h2>订单管理</h2>
        
        <div class="content-box">
          <h3>获取订单列表</h3>
          <api-endpoint method="GET" path="/merchant/orders"></api-endpoint>
          
          <p>获取商户的订单列表，支持分页和筛选。</p>
          
          <h4>请求参数</h4>
          <param-table :params="[
            { name: 'page', type: 'integer', required: false, desc: '页码，默认1' },
            { name: 'limit', type: 'integer', required: false, desc: '每页数量，默认20' },
            { name: 'status', type: 'string', required: false, desc: '订单状态：pending/processing/completed/cancelled' },
            { name: 'start_date', type: 'string', required: false, desc: '开始日期，格式YYYY-MM-DD' },
            { name: 'end_date', type: 'string', required: false, desc: '结束日期，格式YYYY-MM-DD' }
          ]"></param-table>
          
          <h4>响应示例</h4>
          <code-block language="json">
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 153,
    "page": 1,
    "limit": 20,
    "items": [
      {
        "id": "o_10001",
        "order_number": "ORD2023101001",
        "customer_name": "张三",
        "amount": 1245.80,
        "status": "completed",
        "created_at": "2023-10-10T14:32:10Z"
      },
      // ... 更多订单
    ]
  }
}
          </code-block>
          
          <h3>获取订单详情</h3>
          <api-endpoint method="GET" path="/merchant/orders/:id"></api-endpoint>
          
          <p>获取指定订单的详细信息。</p>
          
          <h4>路径参数</h4>
          <param-table :params="[
            { name: 'id', type: 'string', required: true, desc: '订单ID' }
          ]"></param-table>
          
          <h4>响应示例</h4>
          <code-block language="json">
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "o_10001",
    "order_number": "ORD2023101001",
    "customer": {
      "id": "c_5001",
      "name": "张三",
      "email": "zhang@example.com",
      "phone": "13800138001"
    },
    "items": [
      {
        "id": "oi_1",
        "product_id": "p_101",
        "product_name": "高级套餐",
        "quantity": 2,
        "unit_price": 599.90,
        "total_price": 1199.80
      },
      {
        "id": "oi_2",
        "product_id": "p_102",
        "product_name": "增值服务",
        "quantity": 1,
        "unit_price": 46.00,
        "total_price": 46.00
      }
    ],
    "amount": 1245.80,
    "discount": 0,
    "tax": 0,
    "total": 1245.80,
    "status": "completed",
    "payment_method": "alipay",
    "payment_status": "paid",
    "created_at": "2023-10-10T14:32:10Z",
    "updated_at": "2023-10-10T14:35:22Z"
  }
}
          </code-block>
        </div>
      </section>
      
      <!-- 更多API文档内容按需添加 -->
      <section id="products" class="doc-section">
        <h2>商品管理</h2>
        <div class="content-box">
          <p>商品管理API文档内容...</p>
        </div>
      </section>
      
      <section id="customers" class="doc-section">
        <h2>客户管理</h2>
        <div class="content-box">
          <p>客户管理API文档内容...</p>
        </div>
      </section>
      
      <section id="admin-auth" class="doc-section">
        <h2>管理员认证</h2>
        <div class="content-box">
          <p>管理员认证API文档内容...</p>
        </div>
      </section>
      
      <section id="merchants" class="doc-section">
        <h2>商户管理</h2>
        <div class="content-box">
          <p>商户管理API文档内容...</p>
        </div>
      </section>
      
      <section id="admin-orders" class="doc-section">
        <h2>管理员订单管理</h2>
        <div class="content-box">
          <p>管理员订单管理API文档内容...</p>
        </div>
      </section>
      
      <section id="settlement" class="doc-section">
        <h2>结算管理</h2>
        <div class="content-box">
          <p>结算管理API文档内容...</p>
        </div>
      </section>
      
      <section id="system" class="doc-section">
        <h2>系统管理</h2>
        <div class="content-box">
          <p>系统管理API文档内容...</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './components/CodeBlock.vue'
import ApiEndpoint from './components/ApiEndpoint.vue'
import ParamTable from './components/ParamTable.vue'

const contentRef = ref<HTMLElement | null>(null)

// 滚动到指定区域
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section && contentRef.value) {
    contentRef.value.scrollTo({
      top: section.offsetTop - 20,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.doc-container {
  display: flex;
  height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
}

.doc-sidebar {
  width: 260px;
  border-right: 1px solid var(--color-border);
  height: 100%;
  overflow-y: auto;
  background-color: var(--color-background-muted);
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 1rem;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.sidebar-nav {
  padding: 1rem 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 0.5rem;
}

.sidebar-nav a {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}

.sidebar-nav a:hover {
  background-color: var(--color-background-hover);
}

.nav-group-title {
  display: block;
  padding: 0.75rem 1rem 0.5rem;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.sidebar-nav ul ul {
  padding-left: 0.75rem;
}

.doc-content {
  margin-left: 260px;
  padding: 2rem;
  flex: 1;
  height: 100%;
  overflow-y: auto;
}

.doc-section {
  margin-bottom: 3rem;
}

.doc-section h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.doc-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.api-version {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.content-box {
  background-color: var(--color-card);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.content-box h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
}

.content-box h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

:deep(code) {
  background-color: var(--color-code-bg);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 0.85em;
  -webkit-font-smoothing: auto !important;
  -moz-osx-font-smoothing: auto !important;
}

:deep(pre) {
  background-color: #1e293b !important;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(pre code) {
  background-color: transparent !important;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #f8fafc !important;
}

/* 适配深色/浅色模式的CSS变量 */
:root {
  --color-background: #ffffff;
  --color-background-muted: #f9fafb;
  --color-background-hover: #f3f4f6;
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-card: #ffffff;
  --color-code-bg: #f1f5f9;
  --color-code-block-bg: #1e293b;
  --color-primary: #3b82f6;
}

/* 强制使用深色模式 */
.doc-container {
  --color-background: #0f172a;
  --color-background-muted: #1e293b;
  --color-background-hover: #334155;
  --color-text: #f8fafc;
  --color-text-muted: #cbd5e1;
  --color-border: #475569;
  --color-card: #1e293b;
  --color-code-bg: #334155;
  --color-code-block-bg: #1e293b;
  --color-primary: #60a5fa;
  
  color: var(--color-text);
  background-color: var(--color-background);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .doc-sidebar {
    width: 100%;
    position: static;
    height: auto;
    max-height: 300px;
  }
  
  .doc-content {
    margin-left: 0;
    padding: 1rem;
  }
  
  .doc-container {
    flex-direction: column;
  }
}
</style> 