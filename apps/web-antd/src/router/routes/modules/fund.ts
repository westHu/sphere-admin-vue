import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 300,
      title: $t('fund.title'),
    },
    name: 'Funds',
    path: '/fund',
    children: [
      {
        meta: {
          title: $t('fund.title'),
        },
        name: 'fund',
        path: '/demos/ant-design',
        component: () => import('#/views/demos/antd/index.vue'),
      },
    ],
  },
];

export default routes;
