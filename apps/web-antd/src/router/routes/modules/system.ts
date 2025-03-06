import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 500,
      title: $t('system.title'),
    },
    name: 'System',
    path: '/system',
    children: [
      {
        meta: {
          title: $t('system.title'),
        },
        name: 'system',
        path: '/demos/ant-design',
        component: () => import('#/views/demos/antd/index.vue'),
      },
    ],
  },
];

export default routes;
