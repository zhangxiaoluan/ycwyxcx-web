

export const columns = [
  {
    title: '字段',
    dataIndex: 'columnName',
    key: 'columnName',
  },
  {
    title: '名称',
    dataIndex: 'columnComment',
    key: 'columnComment',
    // slots: { customRender: 'column-comment' },
  },
  {
    title: '主键',
    dataIndex: 'columnKey',
    key: 'columnKey',
  },
  {
    title: '控件',
    dataIndex: 'widget',
    key: 'widget',
    // slots: { customRender: 'widget' },
  },
  {
    title: '列显示',
    dataIndex: 'isCol',
    key: 'isCol',
    // slots: { customRender: 'is-col' },
  },
  {
    title: '表单',
    dataIndex: 'isForm',
    key: 'isForm',
    // slots: { customRender: 'is-form' },
  },
  {
    title: '搜索',
    dataIndex: 'isSearch',
    key: 'isSearch',
    // slots: { customRender: 'is-search' },
  },
  {
    title: '最大长度',
    dataIndex: 'characterMaximumLength',
    key: 'characterMaximumLength',
  },
  {
    title: '数据类型',
    dataIndex: 'dataType',
    key: 'dataType',
  },

  {
    title: '是否为空',
    dataIndex: 'isNullable',
    key: 'isNullable',
  },
];
