import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 100,
      title: $t('merchant.title'),
    },
    name: 'Merchants',
    path: '/merchant',
    children: [
      {
        meta: {
          title: $t('merchant.menu.title'),
        },
        name: 'merchant',
        path: '/merchant/merchantList',
        component: () => import('#/views/merchant/index.vue'),
      },
    ],
  },
];

export default routes;
