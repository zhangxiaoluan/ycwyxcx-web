<template>
  <BasicDrawer
    @register="registerDrawer"
    v-bind="$attrs"
    :title="title === 'edit' ? '用户编辑' : '用户新增'"
    width="50%"
    showFooter
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <template #insertFooter>
      <a-button @click="restForm">重置</a-button>
    </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { addOrEditForm } from './user.data';
  import { addUser, editUser } from '@/api/Page/prosceniumUser/user';

  const emit = defineEmits(['register', 'success']);

  const title = ref('');
  const editId = ref();

  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 100,
    schemas: addOrEditForm,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [registerDrawer, { closeDrawer }] = useDrawerInner(async (v) => {
    await resetFields();
    title.value = v.type;
    editId.value = null;
    await updateSchema({
      field: 'regionId',
      componentProps: {
        onChange: (_id, option) => setFieldsValue({ region: option[0] }),
      },
    });
    if (v.type === 'edit') {
      let data = v.val;
      editId.value = data.id;
      await setFieldsValue({ ...data });
    }
  });

  // 表单提交
  const handleSubmit = async () => {
    const values = await validate();
    let other = { ...values, id: editId.value };
    title.value === 'edit' ? await editUser({ ...other }) : await addUser({ ...other });
    closeDrawer();
    emit('success');
  };
  // 表单重置
  const restForm = () => resetFields();
</script>
