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
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { buildingAdd, buildingEdit } from '@/api/Page/xiaoqu';
  import { useMessage } from '@/hooks/web/useMessage';

  let emit = defineEmits(['register', 'success']);

  const { createMessage } = useMessage();

  const isUpdate = ref(true);

  const selfId = ref(null);

  const communityId = ref(null);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  const [registerDrawer, { changeOkLoading, setDrawerProps, closeDrawer }] = useDrawerInner(
    async (data) => {
      await resetFields();
      changeOkLoading(false);
      setDrawerProps({ loading: true });

      communityId.value = data.communityId;

      isUpdate.value = !!data?.isUpdate;

      // 编辑传入数据
      if (unref(isUpdate)) {
        let record = data.record || {};
        selfId.value = record.id;

        // 设置表单的值
        await setFieldsValue({
          ...record,
        });
        setDrawerProps({ loading: false });
      } else {
        setDrawerProps({ loading: false });
      }
    },
  );

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  // 提交代码
  async function handleSubmit() {
    try {
      const values = await validate();
      unref(isUpdate) ? funApi(buildingEdit, { id: selfId.value }) : funApi(buildingAdd);
      // eslint-disable-next-line no-inner-declarations
      function funApi(api: any, other = {}) {
        changeOkLoading(true);
        setDrawerProps({ loading: true });
        api({
          ...values,
          communityId: communityId.value,
          ...other,
        })
          .then(() => {
            closeDrawer();
            emit('success');
          })
          .catch(({ response }) => {
            changeOkLoading(false);
            setDrawerProps({ loading: false });
            createMessage.warn(response.data.message);
          });
      }
    } catch (e) {
      console.warn('请填写表单');
    }
  }
</script>
