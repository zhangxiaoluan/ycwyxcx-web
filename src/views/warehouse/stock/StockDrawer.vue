<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="title"
    width="30%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { stockFormSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { stockIn, stockOut } from '@/api/warehouse/stock';
  import { getProductList } from '@/api/warehouse/product';

  export default defineComponent({
    name: 'StockDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const stockType = ref<1 | 2>(1);
      const title = ref('入库');
      const communityId = ref<string>();

      const [registerForm, { resetFields, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: stockFormSchema,
        showActionButtonGroup: false,
        baseColProps: { span: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        stockType.value = data.type;
        title.value = data.type === 1 ? '入库' : '出库';
        communityId.value = data.communityId;

        await updateSchema([
          {
            field: 'productId',
            componentProps: {
              api: () => getProductList(data.communityId),
            },
          },
        ]);
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (stockType.value === 1) {
            await stockIn(values);
            message.success('入库成功');
          } else {
            await stockOut(values);
            message.success('出库成功');
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, title, handleSubmit };
    },
  });
</script>
