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
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { stockFormSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { stockIn, stockOut } from '@/api/warehouse/stock';
  import { getProductList } from '@/api/warehouse/product';
  // import { getProductList } from '@/api/warehouse/product';

  const emit = defineEmits(['success', 'register']);

  const stockType = ref<1 | 2>(1);
  const title = ref('入库');
  const communityId = ref<string>();

  const [registerForm, { resetFields, updateSchema, validate }] = useForm({
    labelWidth: 80,
    schemas: stockFormSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });
    stockType.value = data.type;
    title.value = data.type == 1 ? '入库' : '出库';
    communityId.value = data.communityId;
    await HandleProductList();
  });

  // 根据组织查询商品
  const HandleProductList = async () => {
    await updateSchema([
      {
        field: 'productId',
        component: 'ApiSelect',
        componentProps: {
          api: getProductList,
          resultField: 'result',
          params: { communityId: communityId.value },
          labelField: 'name',
          valueField: 'id',
          showSearch: true,
        },
      },
    ]);
  };

  async function handleSubmit() {
    const funApi = (api: any, other = {}) => {
      setDrawerProps({ confirmLoading: true, loading: true });
      api({ ...other, communityId: communityId.value })
        .then(() => {
          closeDrawer();
          emit('success');
        })
        .catch(({ response }) => {
          setDrawerProps({ confirmLoading: false, loading: false });
          message.warn(response.data?.message || '系统异常请联系管理员');
        });
    };
    try {
      const values = await validate();
      unref(stockType) === 1 ? funApi(stockIn, { ...values }) : funApi(stockOut, { ...values });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  // export default defineComponent({
  //   name: 'StockDrawer',
  //   components: { BasicDrawer, BasicForm },
  //   emits: ['success', 'register'],
  //   setup(_, { emit }) {
  //     return { registerDrawer, registerForm, title, handleSubmit };
  //   },
  // });
</script>
