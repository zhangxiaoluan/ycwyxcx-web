<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { addFeeRecord, updateFeeRecord } from '@/api/fee/record';

  export default defineComponent({
    name: 'FeeRecordDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const recordId = ref<string>();
      const communityId = ref<string>();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { span: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        communityId.value = data?.communityId;

        if (unref(isUpdate)) {
          recordId.value = data.record.id;
          await setFieldsValue(data.record);
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增缴费记录' : '编辑缴费记录'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await updateFeeRecord({ id: unref(recordId)!, ...values });
            message.success('修改成功');
          } else {
            await addFeeRecord({ communityId: unref(communityId), ...values });
            message.success('添加成功');
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
