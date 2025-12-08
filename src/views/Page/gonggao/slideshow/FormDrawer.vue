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
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { articleAdd, articleEdit } from '@/api/Page/gonggao';

  let emit = defineEmits(['register', 'success']);

  const isUpdate = ref(true);

  const selfId = ref({});

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
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
        await setFieldsValue({ ...record });
        setDrawerProps({ loading: false });
      } else {
        setDrawerProps({ loading: false });
      }
    },
  );

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  // 提交代码
  async function handleSubmit() {
    try {
      const values = await validate();

      let coverImage = values.coverImage[0]?.url;

      console.log('coverImage', coverImage);

      unref(isUpdate) ? funApi(articleEdit, { id: selfId.value }) : funApi(articleAdd);

      // eslint-disable-next-line no-inner-declarations
      function funApi(api: any, other = {}) {
        changeOkLoading(true);
        setDrawerProps({ loading: true });
        api({ ...values, cellphone: values.account, ...other, coverImage })
          .then(() => {
            closeDrawer();
            emit('success');
          })
          .catch(({ response }) => {
            changeOkLoading(false);
            setDrawerProps({ loading: false });
            message.warn(response.data.message);
          });
      }
    } catch (e) {
      changeOkLoading(false);
      setDrawerProps({ loading: false });
    }
  }
</script>
