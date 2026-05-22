<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="60%"
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
  import { xiaoquAdd, xiaoquEdit } from '@/api/Page/xiaoqu';
  import { useMessage } from '@/hooks/web/useMessage';
  import { buildUUID } from '@/utils/uuid';
  import { orgList } from '@/api/sys/org';

  let emit = defineEmits(['register', 'success']);

  const { createMessage } = useMessage();

  const isUpdate = ref(true);

  const selfId = ref({});

  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
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

      isUpdate.value = !!data?.isUpdate;

      // 编辑传入数据
      if (unref(isUpdate)) {
        let record = data.record || {};
        selfId.value = record.id;

        // 如果有关联的组织节点，查找其parentId作为树选择的值
        let parentId = null;
        if (record.orgId) {
          try {
            const orgs = await orgList({});
            const orgNode = findOrgById(orgs, record.orgId);
            if (orgNode) {
              parentId = orgNode.parentId || orgNode.parent_id;
            }
          } catch (e) {
            console.warn('获取组织信息失败', e);
          }
        }

        await setFieldsValue({
          ...record,
          parentId: parentId,
        });
        setDrawerProps({ loading: false });
      } else {
        setDrawerProps({ loading: false });
      }
    },
  );

  function findOrgById(orgs: any[], id: any): any {
    for (const org of orgs) {
      const self = org.self || org;
      if (String(self.id) === String(id)) return self;
      if (org.children) {
        const found = findOrgById(org.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  // 提交代码
  async function handleSubmit() {
    try {
      const values = await validate();
      unref(isUpdate) ? funApi(xiaoquEdit, { id: selfId.value }) : funApi(xiaoquAdd);
      // eslint-disable-next-line no-inner-declarations
      function funApi(api: any, other = {}) {
        changeOkLoading(true);
        setDrawerProps({ loading: true });
        api({
          ...values,
          code: buildUUID().slice(0, 5),
          province: '宁夏',
          city: '银川',
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
