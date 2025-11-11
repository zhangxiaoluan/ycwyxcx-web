<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { formSchema } from './org.data';
  import { updateOrg, saveOrg, orgList } from '@/api/sys/org';

  const isUpdate = ref(true);

  const selfId = ref({});

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 90,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    await setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    console.log('=====>', data);
    if (isUpdate.value) {
      selfId.value = data.record.id;
    }

    if (unref(isUpdate)) {
      await setFieldsValue({
        ...data.record,
      });
    }

    let treeData = rebuildTree(await orgList());
    await updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增组织机构' : '编辑组织机构'));

  const rebuildTree = (data) => {
    let result = [];
    data.forEach((it) => {
      let obj = { ...it.self };
      if (it.children) {
        obj.children = rebuildTree(it.children);
      }
      result.push(obj);
    });

    return result;
  };

  const handleSubmit = async () => {
    try {
      const values = await validate();
      await setDrawerProps({ confirmLoading: true });

      unref(isUpdate) ? await updateOrg({ id: unref(selfId), ...values }) : await saveOrg(values);
      await closeDrawer();
      emit('success');
    } finally {
      await setDrawerProps({ confirmLoading: false });
    }
  };
</script>

<style></style>
