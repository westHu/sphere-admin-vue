import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 200,
      title: $t('order.title'),
    },
    name: 'Orders',
    path: '/order',
    children: [
      {
        meta: {
          title: $t('order.title'),
        },
        name: 'order',
        path: '/demos/ant-design',
        component: () => import('#/views/demos/antd/index.vue'),
      },
    ],
  },
];

export default routes;
