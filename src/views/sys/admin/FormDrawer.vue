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
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { orgList } from '@/api/sys/org';
  import { editUser, createAdmin } from '@/api/sys/admin';
  import { three } from '@/utils/three';

  export default defineComponent({
    name: 'FormDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const selfId = ref({});

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { span: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();

        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        // 打开更新所属机构
        await updateSchema([
          { field: 'orgId', componentProps: { treeData: three(await orgList({})) } },
          { field: 'account', dynamicDisabled: false },
          { field: 'passwd', dynamicDisabled: false, ifShow: true },
        ]);

        // 编辑时候传入ID
        if (isUpdate.value) selfId.value = data.record.userId;

        // 编辑传入数据
        if (unref(isUpdate)) {
          let record = data.record;

          console.log(record);

          // 编辑操作表单
          await updateSchema([
            { field: 'account', dynamicDisabled: true },
            { field: 'passwd', dynamicDisabled: true, ifShow: false },
          ]);

          // 设置表单的值
          await setFieldsValue({
            ...record,
            // roles: record.roles.map((item) => String(item.id)),
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增管理员' : '编辑管理员'));

      // 提交代码
      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          unref(isUpdate)
            ? await editUser({ userId: unref(selfId), ...values }).then(() => {
                message.success('修改成功');
              })
            : await createAdmin(values).then(() => {
                message.success('添加成功');
              });
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
