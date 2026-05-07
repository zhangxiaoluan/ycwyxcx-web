import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const warehouse: AppRouteModule = {
  path: '/warehouse',
  name: 'Warehouse',
  component: LAYOUT,
  redirect: '/warehouse/product',
  meta: {
    orderNo: 20,
    icon: 'ion:warehouse-outline',
    title: '进销存管理',
  },
  children: [
    {
      path: 'product',
      name: 'WarehouseProduct',
      component: () => import('@/views/warehouse/product/index.vue'),
      meta: {
        title: '商品管理',
      },
    },
    {
      path: 'stock',
      name: 'WarehouseStock',
      component: () => import('@/views/warehouse/stock/index.vue'),
      meta: {
        title: '出入库记录',
      },
    },
  ],
};

export default warehouse;
