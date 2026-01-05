<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加 </a-button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                label: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:qrcode-outlined',
                label: '付款码',
                onClick: handleCode.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                label: '删除',
                color: 'error',
                popConfirm: {
                  title: '是否删除？',
                  placement: 'left',
                  confirm: restPas.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <FormDrawer @register="registerDrawer" @success="handleSuccess" />

    <BasicModal v-bind="$attrs" @register="registerBasicModal" @ok="okBasicModal">
      <QRCode
        ref="qrRef"
        :value="qrCodeUrl"
        style="margin: 0 auto"
        :size="200"
        :status="codeLoading"
        @refresh="refreshCode"
      />
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  import { QRCode } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { downloadByBase64 } from '@/utils/file/download';
  import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { createRr, merchantDel, merchantPage } from '@/api/Page/shop';

  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const qrRef = ref<any>(null);

  const qrCodeUrl = ref('');

  const codeLoading = ref<any>('active');

  const tableRecord = ref<any>({});

  const [registerBasicModal, { setModalProps }] = useModalInner();

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '商户列表',
    api: merchantPage,
    columns,
    isTreeTable: false,
    pagination: true,
    striped: true,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: 'right',
      width: 230,
    },
  });

  // 新增
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  // 编辑
  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  // 删除
  const restPas = (record: Recordable) => {
    merchantDel(record.id).then((res) => {
      if (res) {
        createMessage.success('成功');
        reload();
      }
    });
  };

  // 生成二维码
  const handleCode = (record: Recordable) => {
    tableRecord.value = record;
    codeLoading.value = 'loading';
    setModalProps({ open: true, title: record.name, canFullscreen: false, showOkBtn: false });
    createRr({ merchantId: record.id })
      .then((res) => {
        setModalProps({ showOkBtn: true, okText: '下载二维码' });
        codeLoading.value = 'active';
        console.log(res);
      })
      .catch((err) => {
        codeLoading.value = 'expired';
        nextTick(() => {
          let expired: any = document.getElementsByClassName('ant-qrcode-expired');
          expired[0].innerText = err.message || '二维码生成失败';
        });
      });
  };

  // 刷新二维码
  const refreshCode = () => handleCode(tableRecord.value);

  // 下载二维码
  const okBasicModal = () => {
    const url = qrRef.value.toDataURL();
    downloadByBase64(url, tableRecord.value.name + '付款码.png');
  };

  function handleSuccess() {
    reload();
  }
</script>

<style></style>
