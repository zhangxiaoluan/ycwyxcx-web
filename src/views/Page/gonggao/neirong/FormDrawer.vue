<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import { announcementAdd, announcementEdit } from '@/api/Page/gonggao';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const selfId = ref(null);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    selfId.value = null;

    setDrawerProps({ confirmLoading: false });

    isUpdate.value = !!data?.isUpdate;

    // 编辑传入数据
    if (unref(isUpdate)) {
      let record = data.record;
      selfId.value = record.id;
      console.log(record);
      // 设置表单的值
      const formValue = { ...record };
      if (record.startTime || record.endTime) {
        // 只取日期部分
        const toDate = (v) => (v ? String(v).slice(0, 10) : null);
        formValue.time = [toDate(record.startTime), toDate(record.endTime)];
      }
      await setFieldsValue(formValue);
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  // 提交代码
  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      let query = { ...values };

      // 时间区间拆分为 startTime / endTime（补全时分秒满足后端格式）
      if (Array.isArray(query.time)) {
        const [start, end] = query.time;
        query.startTime = start ? `${start} 00:00:00` : null;
        query.endTime = end ? `${end} 23:59:59` : null;
      }
      delete query.time;

      // 置顶开关转 0/1
      query.isTop = query.isTop === 1 || query.isTop === true ? 1 : 0;

      unref(isUpdate) ? funApi(announcementEdit, { id: selfId.value }) : funApi(announcementAdd);

      // eslint-disable-next-line no-inner-declarations
      function funApi(api: any, other = {}) {
        console.log(11, other);
        api({ ...query, ...other }).then((res) => {
          console.log(res);
          closeDrawer();
          emit('success');
          message.success('成功');
        });
      }
    } catch (e) {
      console.warn('表单不能为空');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
