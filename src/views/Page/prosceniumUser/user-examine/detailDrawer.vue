<template>
  <BasicDrawer
    @register="registerDrawer"
    v-bind="$attrs"
    :title="title === 'edit' ? '编辑审核' : '新增审核'"
    width="35%"
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
  import { addUserExamine, editUserExamine } from '@/api/Page/prosceniumUser/user-examine';

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
    await restForm();
    title.value = v.type;
    editId.value = null;
    if (v.type === 'edit') {
      let data = v.val;
      editId.value = data.id;
      await setFieldsValue({ ...data });
    }
  });

  // 表单提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      let other = { ...values, id: editId.value };
      title.value === 'edit'
        ? await editUserExamine({ ...other })
        : await addUserExamine({ ...other });
      closeDrawer();
      emit('success');
    } catch (error) {
      console.warn('请填写表单');
    }
  };

  // 表单重置
  const restForm = () => resetFields();
</script>
