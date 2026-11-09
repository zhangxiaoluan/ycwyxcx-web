import type { App } from 'vue';
import { Button } from './Button';
import { Alert, Form, Input, Layout, Modal, Radio, Select, Tag } from 'ant-design-vue';
import VXETable from 'vxe-table';
import VXEUI from 'vxe-pc-ui';

export function registerGlobComp(app: App) {
  // 页面模板里直接用的 a-xxx 标签需要全局注册，否则会被当成未知标签渲染（不报错、但什么都不显示）
  app.use(Input)
    .use(Form)
    .use(Select)
    .use(Modal)
    .use(Radio)
    .use(Alert)
    .use(Tag)
    .use(Button)
    .use(Layout)
    .use(VXETable)
    .use(VXEUI);
}
