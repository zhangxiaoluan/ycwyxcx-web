<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="30%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { bindingAudit, bindingUnbind } from '@/api/Page/xiaoqu';

  let emit = defineEmits(['register', 'success']);

  const isUpdate = ref(true);

  const selfId = ref(null);

  const [registerForm, { resetFields, validate, updateSchema }] = useForm({
    labelWidth: 70,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  const [registerDrawer, { changeOkLoading, setDrawerProps, closeDrawer }] = useDrawerInner(
    async (data) => {
      await resetFields();
      isUpdate.value = !!data?.isUpdate;
      selfId.value = data.record.id;
      await updateSchema([
        { field: 'auditRemark', ifShow: unref(isUpdate) },
        { field: 'remark', ifShow: !unref(isUpdate) },
      ]);
    },
  );

  const getTitle = computed(() => '审核');

  // 提交代码
  async function handleSubmit() {
    try {
      const values = await validate();

      unref(isUpdate) ? funApi(bindingAudit, { status: '2' }) : funApi(bindingUnbind);

      // eslint-disable-next-line no-inner-declarations
      function funApi(api: any, other = {}) {
        changeOkLoading(true);
        setDrawerProps({ loading: true });
        api({ ...values, bindingId: selfId.value, ...other })
          .then(() => {
            closeDrawer();
            emit('success');
            changeOkLoading(false);
            setDrawerProps({ loading: false });
          })
          .catch(({ response }) => {
            changeOkLoading(false);
            setDrawerProps({ loading: false });
            message.warn(response.data.message);
          });
      }
    } catch (e) {
      changeOkLoading(false);
      setDrawerProps({ loading: false });
      console.warn('请填写表单');
    }
  }
</script>
