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
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { addDevice, updateDevice } from '@/api/device/device';

  const isUpdate = ref(true);

  const getTitle = computed(() => (!unref(isUpdate) ? '新增设备' : '编辑设备'));

  const recordId = ref<string>();

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false, loading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      recordId.value = data.record.id;
      await setFieldsValue(data.record);
    }
  });

  async function handleSubmit() {
    const funApi = (api: any, other = {}) => {
      setDrawerProps({ confirmLoading: true, loading: true });
      api({ ...other })
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
      unref(isUpdate)
        ? funApi(updateDevice, { id: unref(recordId)!, ...values })
        : funApi(addDevice, { ...values });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
