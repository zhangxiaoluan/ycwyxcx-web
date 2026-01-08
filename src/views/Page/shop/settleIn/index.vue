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
      <div style="text-align: center">
        <Image :src="qrCodeUrl" :height="200" />
      </div>
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Image } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { downloadByUrl } from '@/utils/file/download';
  import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { merchantInPage, createRr, merchantInDel } from '@/api/Page/shop';

  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const qrCodeUrl = ref('');

  const tableRecord = ref<any>({});

  const [registerBasicModal, { setModalProps }] = useModalInner();

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '商户列表',
    api: merchantInPage,
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
    merchantInDel(record.id).then((res) => {
      if (res) {
        createMessage.success('成功');
        reload();
      }
    });
  };

  // 生成二维码
  const handleCode = (record: Recordable) => {
    tableRecord.value = record;
    let status = record.status || 0;
    setModalProps({ open: true, title: record.name, canFullscreen: false, showOkBtn: false });
    console.log(11, record);
    if (status == 1) {
      setModalProps({ showOkBtn: true, okText: '下载二维码' });
      return (qrCodeUrl.value = record.qrCodeUrl);
    }
    createRr({ merchantId: record.merchantId })
      .then((res) => {
        setModalProps({ showOkBtn: true, okText: '下载二维码' });
        qrCodeUrl.value = res.qrCodeUrl || '';
      })
      .catch(() => {});
  };

  // 下载二维码
  const okBasicModal = () => {
    downloadByUrl({
      url: qrCodeUrl.value,
      fileName: tableRecord.value.name + '码.png',
    });
  };

  function handleSuccess() {
    reload();
  }
</script>

<style></style>
