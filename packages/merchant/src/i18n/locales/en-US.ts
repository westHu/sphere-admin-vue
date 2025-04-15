export default {
  common: {
    dashboard: "Dashboard",
    orders: "Orders",
    payments: "Payments",
    customers: "Customers",
    settings: "Settings",
    logout: "Logout",
    search: "Search...",
    account: "Account"
  },
  login: {
    title: "Merchant Login",
    description: "Sign in to your merchant account",
    email: "Email",
    password: "Password",
    remember_me: "Remember me",
    forgot_password: "Forgot password?",
    submit: "Sign in",
    register_link: "Don't have an account? Sign up",
    errors: {
      failed: "Login failed, please check your email and password"
    }
  },
  register: {
    title: "Merchant Registration",
    description: "Create your merchant account",
    business_name: "Business Name",
    contact_name: "Contact Name",
    email: "Email",
    password: "Password",
    confirm_password: "Confirm Password",
    phone: "Phone Number",
    business_type: "Business Type",
    business_types: {
      individual: "Individual",
      company: "Company",
      organization: "Organization"
    },
    terms: "I have read and agree to the Terms of Service and Privacy Policy",
    submit: "Register",
    login_link: "Already have an account? Sign in",
    errors: {
      password_mismatch: "Passwords do not match",
      failed: "Registration failed, please try again"
    }
  },
  dashboard: {
    welcome: "Welcome back",
    summary: {
      today_sales: "Today's Sales",
      total_orders: "Total Orders",
      success_rate: "Success Rate",
      revenue: "Revenue"
    },
    period: {
      today: "Today",
      yesterday: "Yesterday",
      this_week: "This Week",
      this_month: "This Month",
      this_year: "This Year"
    },
    recent_orders: "Recent Orders",
    view_all: "View all",
    quick_actions: "Quick Actions",
    actions: {
      new_order: "New Order",
      new_customer: "Add Customer",
      setup_payment: "Setup Payment Method",
      export_data: "Export Data"
    },
    performance: "Performance Overview",
    no_data: "No data available"
  },
  orders: {
    title: "Orders Management",
    new_order: "New Order",
    search: "Search orders",
    filter: "Filter",
    export: "Export",
    status: {
      all: "All",
      pending: "Pending",
      completed: "Completed",
      failed: "Failed",
      refunded: "Refunded"
    },
    table: {
      order_id: "Order ID",
      customer: "Customer",
      amount: "Amount",
      payment_method: "Payment Method",
      status: "Status",
      date: "Date",
      actions: "Actions"
    },
    actions: {
      view: "View",
      refund: "Refund",
      cancel: "Cancel",
      edit: "Edit"
    },
    details: {
      title: "Order Details",
      customer_info: "Customer Information",
      payment_info: "Payment Information",
      items: "Order Items",
      back: "Back",
      print: "Print",
      transaction_id: "Transaction ID",
      payment_status: "Payment Status",
      created_at: "Created At",
      updated_at: "Updated At",
      item_name: "Item Name",
      quantity: "Quantity",
      price: "Price",
      total: "Total"
    },
    empty: "No orders found"
  },
  customers: {
    title: "Customer Management",
    new_customer: "New Customer",
    search: "Search customers",
    filter: "Filter",
    export: "Export",
    table: {
      id: "ID",
      name: "Name",
      email: "Email",
      phone: "Phone",
      orders: "Orders",
      spent: "Spent",
      created_at: "Created At",
      actions: "Actions"
    },
    actions: {
      view: "View",
      edit: "Edit",
      delete: "Delete"
    },
    details: {
      title: "Customer Details",
      info: "Basic Information",
      orders: "Order History",
      back: "Back",
      contact_info: "Contact Information",
      order_history: "Order History",
      no_orders: "This customer has no orders"
    },
    empty: "No customers found"
  },
  payments: {
    title: "Payment Management",
    methods: "Payment Methods",
    transactions: "Transactions",
    settings: "Payment Settings",
    add_method: "Add Payment Method",
    status: {
      enabled: "Enabled",
      disabled: "Disabled"
    },
    table: {
      method: "Method",
      status: "Status",
      fee: "Fee",
      updated_at: "Updated At",
      actions: "Actions"
    },
    form: {
      name: "Name",
      description: "Description",
      fee: "Fee",
      currency: "Currency",
      api_key: "API Key",
      secret_key: "Secret Key",
      test_mode: "Test Mode",
      save: "Save Settings"
    },
    transaction_types: {
      all: "All Transactions",
      payment: "Payments",
      refund: "Refunds",
      payout: "Payouts",
      fee: "Fees"
    }
  },
  settings: {
    title: "Settings",
    sections: {
      account: "Account Settings",
      profile: "Business Profile",
      payment: "Payment Settings",
      notifications: "Notifications",
      security: "Security",
      api: "API & Webhooks"
    },
    account: {
      title: "Account Settings",
      email: "Email",
      password: "Password",
      change_password: "Change Password",
      current_password: "Current Password",
      new_password: "New Password",
      confirm_password: "Confirm Password"
    },
    profile: {
      title: "Business Profile",
      business_name: "Business Name",
      business_type: "Business Type",
      contact_name: "Contact Name",
      phone: "Phone Number",
      address: "Address",
      website: "Website",
      description: "Business Description",
      logo: "Business Logo",
      upload: "Upload"
    },
    security: {
      title: "Security Settings",
      two_factor: "Two-Factor Authentication",
      enable: "Enable",
      disable: "Disable",
      ip_whitelist: "IP Whitelist",
      add_ip: "Add IP",
      login_history: "Login History"
    },
    form: {
      save: "Save Changes",
      cancel: "Cancel"
    }
  }
} 