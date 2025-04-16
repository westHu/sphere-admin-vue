// 全局类型定义

// 为Window添加自定义属性
declare interface Window {
  // i18n状态
  __APP_I18N_STATE__?: {
    currentLocale: string;
    supportedLocales: string[];
    initialized: boolean;
  };
}

// Vue-i18n相关类型，如果需要
declare namespace VueI18n {
  interface Composer {
    t: (key: string) => string;
    locale: import('vue').Ref<string>;
  }
} 