<template>
  <BasicDrawer
    @register="registerDrawer"
    v-bind="$attrs"
    :title="title === 'edit' ? '编辑前端功能' : '新增前端功能'"
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
  import { addMenu, editMenu } from '@/api/Page/prosceniumUser/frontMenu';

  const title = ref('');
  const editId = ref();

  const emit = defineEmits(['register', 'success']);

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
      await setFieldsValue({ ...data, ...{ icon: data.icon ? [data.icon] : [] } });
    }
  });

  // 表单提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      let icon: any = values.icon[0] || {};
      let other = { ...values, id: editId.value, icon: icon.url };
      title.value === 'edit' ? await editMenu({ ...other }) : await addMenu({ ...other });
      closeDrawer();
      emit('success');
    } catch (err) {
      console.log('请填写表单');
    }
  };

  // 表单重置
  const restForm = () => resetFields();
</script>

<style lang="less"></style>
