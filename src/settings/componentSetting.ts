// 用于配置某些组件的常规配置，而无需修改组件

import type { SorterResult } from '@/components/Table';

export default {
  // 基本表格设置
  table: {
    // 表单界面请求常规配置
    // 支持xxx.xxx.xxx
    fetchSetting: {
      // 传递给后台的当前页面的字段名
      pageField: 'current',
      // 背景中显示的每页的数字字段名称
      sizeField: 'size',
      // 接口返回的表单数据的字段名
      listField: 'records',
      // 接口字段名返回的表总数
      totalField: 'total',
    },
    // Number of pages that can be selected
    pageSizeOptions: ['10', '50', '80', '100'],
    // Default display quantity on one page
    defaultPageSize: 10,
    // Default Size
    defaultSize: 'middle',
    // Custom general sort function
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      if (field && order) {
        return {
          // The sort field passed to the backend you
          field,
          // Sorting method passed to the background asc/desc
          order,
        };
      } else {
        return {};
      }
    },
    // Custom general filter function
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
  },
  vxeTable: {
    table: {
      border: true,
      stripe: true,
      columnConfig: {
        resizable: true,
        isCurrent: true,
        isHover: true,
      },
      rowConfig: {
        isCurrent: true,
        isHover: true,
      },
      emptyRender: {
        name: 'AEmpty',
      },
      printConfig: {},
      exportConfig: {},
      customConfig: {
        storage: true,
      },
    },
    grid: {
      toolbarConfig: {
        enabled: true,
        export: true,
        zoom: true,
        print: true,
        refresh: true,
        custom: true,
      },
      pagerConfig: {
        pageSizes: [20, 50, 100, 500],
        pageSize: 20,
        autoHidden: true,
      },
      proxyConfig: {
        form: true,
        props: {
          result: 'items',
          total: 'total',
        },
      },
      zoomConfig: {},
    },
  },
  // scrollbar setting
  scrollbar: {
    // Whether to use native scroll bar
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    native: false,
  },
};
