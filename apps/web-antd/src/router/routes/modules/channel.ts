import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 400,
      title: $t('channel.title'),
    },
    name: 'Channel',
    path: '/channel',
    children: [
      {
        meta: {
          title: $t('channel.title'),
        },
        name: 'channel',
        path: '/demos/ant-design',
        component: () => import('#/views/demos/antd/index.vue'),
      },
    ],
  },
];

export default routes;
