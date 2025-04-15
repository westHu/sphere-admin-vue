export default {
  common: {
    dashboard: "仪表盘",
    orders: "订单管理",
    payments: "支付管理",
    customers: "客户管理",
    settings: "系统设置",
    logout: "退出登录",
    search: "搜索...",
    account: "账户"
  },
  login: {
    title: "商户登录",
    description: "登录您的商户账户",
    email: "邮箱",
    password: "密码",
    remember_me: "记住我",
    forgot_password: "忘记密码？",
    submit: "登录",
    register_link: "没有账户？立即注册",
    errors: {
      failed: "登录失败，请检查您的邮箱和密码"
    }
  },
  register: {
    title: "商户注册",
    description: "创建您的商户账户",
    business_name: "企业名称",
    contact_name: "联系人姓名",
    email: "邮箱",
    password: "密码",
    confirm_password: "确认密码",
    phone: "联系电话",
    business_type: "企业类型",
    business_types: {
      individual: "个体经营",
      company: "企业",
      organization: "组织机构"
    },
    terms: "我已阅读并同意《服务条款》和《隐私政策》",
    submit: "注册",
    login_link: "已有账户？立即登录",
    errors: {
      password_mismatch: "两次输入的密码不一致",
      failed: "注册失败，请稍后重试"
    }
  },
  dashboard: {
    welcome: "欢迎回来",
    summary: {
      today_sales: "今日销售额",
      total_orders: "订单总数",
      success_rate: "成功率",
      revenue: "收入"
    },
    period: {
      today: "今日",
      yesterday: "昨日",
      this_week: "本周",
      this_month: "本月",
      this_year: "今年"
    },
    recent_orders: "最近订单",
    view_all: "查看全部",
    quick_actions: "快速操作",
    actions: {
      new_order: "新建订单",
      new_customer: "添加客户",
      setup_payment: "设置支付方式",
      export_data: "导出数据"
    },
    performance: "业绩概览",
    no_data: "暂无数据"
  },
  orders: {
    title: "订单管理",
    new_order: "新建订单",
    search: "搜索订单",
    filter: "筛选",
    export: "导出",
    status: {
      all: "全部",
      pending: "处理中",
      completed: "已完成",
      failed: "失败",
      refunded: "已退款"
    },
    table: {
      order_id: "订单号",
      customer: "客户",
      amount: "金额",
      payment_method: "支付方式",
      status: "状态",
      date: "日期",
      actions: "操作"
    },
    actions: {
      view: "查看",
      refund: "退款",
      cancel: "取消",
      edit: "编辑"
    },
    details: {
      title: "订单详情",
      customer_info: "客户信息",
      payment_info: "支付信息",
      items: "订单项目",
      back: "返回",
      print: "打印",
      transaction_id: "交易ID",
      payment_status: "支付状态",
      created_at: "创建时间",
      updated_at: "更新时间",
      item_name: "项目名称",
      quantity: "数量",
      price: "单价",
      total: "总计"
    },
    empty: "暂无订单数据"
  },
  customers: {
    title: "客户管理",
    new_customer: "新增客户",
    search: "搜索客户",
    filter: "筛选",
    export: "导出",
    table: {
      id: "ID",
      name: "姓名",
      email: "邮箱",
      phone: "电话",
      orders: "订单数",
      spent: "消费额",
      created_at: "创建时间",
      actions: "操作"
    },
    actions: {
      view: "查看",
      edit: "编辑",
      delete: "删除"
    },
    details: {
      title: "客户详情",
      info: "基本信息",
      orders: "订单历史",
      back: "返回",
      contact_info: "联系信息",
      order_history: "订单历史",
      no_orders: "该客户暂无订单"
    },
    empty: "暂无客户数据"
  },
  payments: {
    title: "支付管理",
    methods: "支付方式",
    transactions: "交易记录",
    settings: "支付设置",
    add_method: "添加支付方式",
    status: {
      enabled: "已启用",
      disabled: "已禁用"
    },
    table: {
      method: "支付方式",
      status: "状态",
      fee: "费率",
      updated_at: "更新时间",
      actions: "操作"
    },
    form: {
      name: "名称",
      description: "描述",
      fee: "费率",
      currency: "货币",
      api_key: "API密钥",
      secret_key: "密钥",
      test_mode: "测试模式",
      save: "保存设置"
    },
    transaction_types: {
      all: "所有交易",
      payment: "收款",
      refund: "退款",
      payout: "提现",
      fee: "手续费"
    }
  },
  settings: {
    title: "系统设置",
    sections: {
      account: "账户设置",
      profile: "商户资料",
      payment: "支付设置",
      notifications: "通知设置",
      security: "安全设置",
      api: "API与Webhooks"
    },
    account: {
      title: "账户设置",
      email: "邮箱",
      password: "密码",
      change_password: "修改密码",
      current_password: "当前密码",
      new_password: "新密码",
      confirm_password: "确认密码"
    },
    profile: {
      title: "商户资料",
      business_name: "企业名称",
      business_type: "企业类型",
      contact_name: "联系人姓名",
      phone: "联系电话",
      address: "地址",
      website: "网站",
      description: "企业描述",
      logo: "企业Logo",
      upload: "上传"
    },
    security: {
      title: "安全设置",
      two_factor: "两步验证",
      enable: "启用",
      disable: "禁用",
      ip_whitelist: "IP白名单",
      add_ip: "添加IP",
      login_history: "登录历史"
    },
    form: {
      save: "保存更改",
      cancel: "取消"
    }
  }
} 