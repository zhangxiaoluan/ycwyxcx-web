<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="30%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menus="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'meta.title', key: 'id' }"
          :checkStrictly="true"
          @check="check"
          checkable
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTree, TreeItem } from '@/components/Tree';
  import { getMenuList } from '@/api/sys/menu';
  import { saveRole, updateRole, roleMenus } from '@/api/sys/role';
  import { message } from 'ant-design-vue';

  let emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const treeData = ref<TreeItem[]>([]);

  const menuIds = ref([]);

  const id = ref({});

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();

    setDrawerProps({ confirmLoading: false });

    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    if (unref(treeData).length === 0) {
      treeData.value = (await getMenuList()) as any as TreeItem[];
    }

    isUpdate.value = !!data?.isUpdate;

    // 编辑回显
    if (unref(isUpdate)) {
      let initData = data.record;
      id.value = initData.id;
      menuIds.value = await roleMenus(initData.id);
      await setFieldsValue({
        ...initData,
        menus: menuIds.value || [],
        // permissions: initData.systemPermissions?.map((item) => item.id),
      });
    }
  });

  // 角色选中
  const check = (checkKey: { checked: never[] }) => (menuIds.value = checkKey.checked);

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      values.menus = menuIds.value;
      const result = unref(isUpdate)
        ? await updateRole({ id: id.value, ...values })
        : await saveRole(values);
      if (result) {
        closeDrawer();
        emit('success');
        message.success('成功！');
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
