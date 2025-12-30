<template>
  <div class="roleDrawer">
    <BasicDrawer
      v-bind="$attrs"
      @register="registerDrawer"
      showFooter
      :title="getTitle"
      width="45%"
      @ok="handleSubmit"
    >
      <BasicForm @register="registerForm">
        <template #menusSlot="{ model, field }">
          <BasicTree
            class="menu-tree"
            v-model:value="model[field]"
            :treeData="treeData"
            :fieldNames="{ title: 'meta.title', key: 'id' }"
            title="后台菜单分配"
            checkable
            :checkStrictly="false"
            @check="check"
          />
        </template>
        <template #frontMenuSlot="{ model, field }">
          <BasicTree
            class="front-menu-tree"
            v-model:value="model[field]"
            :treeData="frontMenuData"
            :fieldNames="{ title: 'title', key: 'id' }"
            title="前台菜单分配"
            checkable
          />
        </template>
      </BasicForm>
    </BasicDrawer>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTree, TreeItem } from '@/components/Tree';

  import { getMenuList } from '@/api/sys/menu';
  import { saveRole, updateRole, roleMenus, frontMenu } from '@/api/sys/role';

  import { closeParent } from '@/utils/three';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const treeData = ref<TreeItem[]>([]);

  const frontMenuData = ref<any[]>([]);

  const id = ref({});

  let halfCheckedKeys = ref([]);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 80,
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

    // 前台用户菜单
    if (unref(frontMenuData).length === 0) {
      let data: any[] = await frontMenu();
      closeParent(data);
      frontMenuData.value = data;
    }

    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      id.value = data.record.id;
      let roleMenusData = await roleMenus(data.record.id);
      await setFieldsValue({
        ...data.record,
        menus: roleMenusData.backendMenuList || [],
        frontMenu: roleMenusData.frontMenuList || [],
      });
    }
  });

  const check = (_checkKey, e) => {
    halfCheckedKeys.value = e.halfCheckedKeys;
  };

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  async function handleSubmit() {
    try {
      // code
      const values = await validate();
      let apiParams = {
        ...values,
        code: String(new Date().valueOf()),
        menus: [...halfCheckedKeys.value, ...values.menus],
      };
      setDrawerProps({ confirmLoading: true });
      const result = unref(isUpdate)
        ? await updateRole({ id: id.value, ...apiParams })
        : await saveRole({ ...apiParams });
      if (result) {
        closeDrawer();
        emit('success');
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
<style lang="less">
  .menu-tree {
    border: 1px solid #d9d9d9;
    //height: 400px;
    .basic-tree-header {
      padding: 5px 0;
    }
    .scroll-container {
      .scrollbar__wrap {
        padding: 10px 5px !important;
      }
    }
  }
  .front-menu-tree {
    border: 1px solid #d9d9d9;
    //height: 300px;
  }
  .ant-checkbox-group {
    .ant-checkbox-group-item {
      margin-bottom: 8px;
    }
  }
</style>
