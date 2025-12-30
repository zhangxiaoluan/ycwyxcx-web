<template>
  <BasicDrawer
    @register="registerDrawer"
    v-bind="$attrs"
    :title="title === 'edit' ? '角色编辑' : '角色新增'"
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
  import { addOrEditForm } from './table.data';
  import { addUserRole, editUserRole } from '@/api/Page/prosceniumUser/user-role';

  const emit = defineEmits(['register', 'success']);

  const title = ref('');

  const editId = ref();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
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
    if (v.type === 'edit') {
      let data = v.val;
      editId.value = data.id;
      await setFieldsValue({ ...data, roleIds: data.roleInfos.map((res) => res.id) });
    }
  });

  // 表单提交
  const handleSubmit = async () => {
    const values = await validate();
    let other = { ...values, id: editId.value };
    title.value === 'edit' ? await editUserRole({ ...other }) : await addUserRole({ ...other });
    closeDrawer();
    emit('success');
  };
  // 表单重置
  const restForm = () => resetFields();
</script>
