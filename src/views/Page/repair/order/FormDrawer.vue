<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="指派"
    width="90%"
    okText="确认"
    @ok="handleSubmit"
  >
    <div class="audit-container">
      <!-- 基本信息 -->
      <Card size="small" title="基本信息" class="section-card">
        <div class="education-list">
          <Description
            :data="formData"
            :schema="basicInfoSchema"
            :column="3"
            class="description-section"
          />
        </div>
      </Card>

      <!-- 证明材料 -->
      <Card size="small" title="证明材料" class="section-card">
        <div class="attachment-section">
          <div v-if="formData.attachments?.length" class="attachment-list">
            <div v-for="(file, index) in formData.attachments" :key="index" class="attachment-item">
              <Image :src="file.filePath" />
            </div>
          </div>
          <Empty v-else description="暂无证明材料" />
        </div>
      </Card>

      <!-- 表单信息 -->
      <div class="pt-4">
        <BasicForm @register="registerForm" />
      </div>
    </div>
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card, Empty, Image } from 'ant-design-vue';
  import { Description } from '@/components/Description';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useMessage } from '@/hooks/web/useMessage';
  import { basicInfoSchema, formSchema } from './data';
  import { BasicForm, useForm } from '@/components/Form';
  import { repairAssign } from '@/api/Page/repair';

  const emit = defineEmits(['register', 'success']);

  const { createMessage } = useMessage();

  let formData = ref({} as any);

  const [registerForm, { validate }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  const [registerDrawer, { changeOkLoading, setDrawerProps, closeDrawer }] = useDrawerInner(
    async (data) => {
      changeOkLoading(false);
      setDrawerProps({ loading: false });

      let record = data.record;

      // 状态
      let status = Number(record.status);

      formData.value = { ...record, status } || {};

      // await updateSchema([
      //   { field: 'handlerId', ifShow: status === 0 },
      //   { field: 'solutionPlan', ifShow: status === 1 },
      // ]);

      console.log(11, data.record);
    },
  );

  // 提交审核
  async function handleSubmit() {
    changeOkLoading(true);
    setDrawerProps({ loading: true });
    try {
      let value = await validate();
      let query = { id: formData.value.id, ...value };
      const funApi = (api) => {
        api(query).then(() => {
          createMessage.success('成功');
          closeDrawer();
          emit('success');
        });
      };
      funApi(repairAssign);
      // formData.value.status == 0 ? funApi(difficultyNeedAssign) : funApi(difficultyNeedHandle);
      console.log('query', query);
    } catch (error: any) {
      createMessage.error(error.response?.data?.message || '提交失败');
      // throw error;
    } finally {
      changeOkLoading(false);
      setDrawerProps({ loading: false });
    }
  }
</script>

<style lang="less" scoped>
  .audit-container {
    max-height: calc(100vh - 200px);
    overflow-y: auto;

    .section-card {
      margin-bottom: 16px;
    }

    .description-section {
      //margin-bottom: 24px;
    }

    .education-list,
    .work-list {
      .education-item,
      .work-item {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .family-section {
      .family-card {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .children-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 16px;

        .child-item {
          margin-bottom: 0;
        }
      }
    }

    .attachment-section {
      .attachment-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 16px;
        margin-bottom: 24px;

        .attachment-item {
          margin-bottom: 0;
        }
      }

      .other-description {
        margin-top: 24px;
        padding: 16px;
        background-color: #f5f5f5;
        border-radius: 6px;

        h4 {
          margin-bottom: 8px;
          color: #333;
        }

        p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }
      }
    }

    .audit-action-section {
      .audit-form {
        max-width: 600px;
        margin: 0 auto 24px;
      }

      .quick-actions {
        text-align: center;

        .ant-btn {
          min-width: 120px;
          height: 40px;
          font-size: 16px;
        }
      }
    }
  }
</style>
