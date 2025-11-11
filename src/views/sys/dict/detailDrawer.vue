<template>
  <BasicDrawer
    @register="registerDrawer"
    v-bind="$attrs"
    :title="title === 'edit' ? '字典编辑' : '新增字典'"
    width="30%"
    showFooter
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <template #insertFooter>
      <AButton @click="restForm">重置</AButton>
    </template>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { addOrEditForm } from './dict.data';
  import { group, editGroup, dictTreePage } from '@/api/sys/dict';
  import AButton from '/@/components/Button/src/BasicButton.vue';
  import { three } from '@/utils/three';

  export default defineComponent({
    components: { AButton, BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
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
        let record = v.record || {};

        await updateSchema({
          field: 'parentId',
          componentProps: {
            treeData: three(await dictTreePage(record.id || '')),
          },
        });

        if (v.type === 'edit') {
          editId.value = record.id;
          await setFieldsValue({ ...record });
        }
      });

      // 表单提交
      const handleSubmit = async () => {
        const values = await validate();
        let other = { ...values, id: editId.value };
        title.value === 'edit' ? await editGroup({ ...other }) : await group({ ...values });
        closeDrawer();
        emit('success');
      };

      // 表单重置
      const restForm = () => resetFields();

      return {
        registerDrawer,
        title,
        registerForm,
        handleSubmit,
        restForm,
      };
    },
  });
</script>
