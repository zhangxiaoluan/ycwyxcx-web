<template>
  <div class="page-box">
    <Row :gutter="16">
      <Col :md="6" class="h-screen">
        <div class="mb-2">
          <Input v-model:value="searchTable" placeholder="搜索" @keyup="handleSearchTable" />
        </div>
        <List
          :data-source="state.tables"
          class="overflow-y-scroll h-200 z-panel vben-basic-table-form-container"
        >
          <template #renderItem="{ item }">
            <ListItem
              :class="[state.currTable === item ? 'z-curr-item' : '', 'z-list-item']"
              @click="tableInfo(item)"
              >{{ item }}</ListItem
            >
          </template>
          <template #footer>
            <div class="z-list-item">共计 {{ state.tables.length }} 张表</div>
          </template>
        </List>
      </Col>
      <Col :md="18">
        <div class="z-panel">
          <Form layout="inline" :labelCol="{ span: 4 }">
            <FormItem label="名称">
              <Input v-model:value="state.name" placeholder="例如：user" />
            </FormItem>
            <FormItem label="标题">
              <Input v-model:value="state.title" placeholder="例如：用户管理" />
            </FormItem>
            <FormItem label="模块">
              <Input v-model:value="state.module" placeholder="例如：system" />
            </FormItem>
            <FormItem>
              <Button @click="_prevCode()" type="primary">预览代码</Button>
            </FormItem>
            <FormItem>
              <Button @click="makeCode()" type="primary">生成代码</Button>
            </FormItem>
          </Form>
        </div>
        <div class="z-panel">
          <Table
            :pagination="false"
            :columns="columns"
            :data-source="rows"
            class="ant-table-striped"
            bordered
            :key="(record) => record.key"
            :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
          >
            <template #column-comment="{ index }">
              <Input v-model:value="rows[index].columnComment" />
            </template>
            <template #widget="{ index }">
              <Select
                v-model:value="rows[index].widget"
                :options="widgetOptions"
                style="width: 120px"
              />
            </template>
            <template #is-col="{ index }">
              <Checkbox v-model:checked="rows[index].isCol" />
            </template>
            <template #is-form="{ index }">
              <Checkbox v-model:checked="rows[index].isForm" />
            </template>
            <template #is-search="{ index }">
              <Checkbox v-model:checked="rows[index].isSearch" />
            </template>
          </Table>
        </div>
        <div class="z-panel">
          <Tabs type="card" v-model:activeKey="activeKey">
            <TabPane key="1" tab="前端数据模型">
              <CodeEditor v-model:value="state.code.tsModel" mode="javascript" />
            </TabPane>
            <TabPane key="2" tab="前端API">
              <CodeEditor v-model:value="state.code.tsApi" mode="javascript" />
            </TabPane>
            <TabPane key="3" tab="前端Data">
              <CodeEditor v-model:value="state.code.tsData" mode="javascript" />
            </TabPane>
            <TabPane key="4" tab="前端列表视图">
              <CodeEditor v-model:value="state.code.tsTable" mode="htmlmixed" />
            </TabPane>
            <TabPane key="5" tab="前端表单视图">
              <CodeEditor v-model:value="state.code.tsForm" mode="htmlmixed" />
            </TabPane>
          </Tabs>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script lang="ts" setup>
  import {
    Row,
    Col,
    List,
    ListItem,
    Tabs,
    TabPane,
    Table,
    Input,
    message,
    Button,
    Select,
    Form,
    FormItem,
    Checkbox,
  } from 'ant-design-vue';
  import { reactive, onMounted, ref } from 'vue';
  import { getTableList, getTableInfo, genCode, prevCode } from '@/api/sys/code';
  import { CodeEditor } from '@/components/CodeEditor';
  import { columns } from './code.data';

  const loadKey = 'loaddata';
  const activeKey = ref('1');
  const rows = ref([]);
  const searchTable = ref('');

  const widgetOptions = ref([
    { label: '单行文本', value: 'Input' },
    { label: '下拉框', value: 'Select' },
    { label: '单选', value: 'RadioGroup' },
    { label: '多选', value: 'Checkbox' },
    { label: '多行文本', value: 'InputTextArea' },
    { label: '日期', value: 'DatePicker' },
  ]);

  const state = reactive({
    tables: [],
    allTables: [],
    name: '',
    title: '',
    module: '',
    code: {
      tsModel: `// data model`,
      tsApi: `// api`,
      tsData: `// vue about data`,
      tsTable: `<!-- vue code -->`,
      tsForm: '<!-- vue code -->',
    },
    options: [],
    currTable: '',
    tableColumns: null,
  });

  onMounted(() => {
    getTableList().then((result) => {
      state.tables = result;
      state.allTables = result;
    });
  });

  const handleSearchTable = () => {
    if (searchTable.value) {
      state.tables = state.allTables.filter((it) => {
        return it.indexOf(searchTable.value) > -1;
      });
    } else {
      state.tables = state.allTables;
    }
  };

  // 加载数据表信息
  const tableInfo = (tableName) => {
    console.log('==>', tableName);
    message.info({ content: '数据加载中', loadKey });
    getTableInfo(tableName).then((result) => {
      message.success({ content: '成功加载', loadKey, duration: 2 });
      result = result.map((it) => {
        it.key = it.columnName;
        it.widget = 'Input';
        it.isCol = true;
        it.isForm = true;
        it.isSearch = false;

        return it;
      });
      state.currTable = tableName;
      state.tableColumns = result;
      rows.value = result;
    });
  };

  const _prevCode = () => {
    const data = {
      name: state.name,
      title: state.title,
      module: state.module,
      columns: state.tableColumns,
    };

    prevCode(data).then((result) => {
      console.log('code:', result);
      state.code.tsApi = result.api;
      state.code.tsData = result.data;
      state.code.tsModel = result.model;
      state.code.tsForm = result.form;
      state.code.tsTable = result.table;
    });
  };

  const makeCode = () => {
    const data = {
      name: state.name,
      title: state.title,
      module: state.module,
      columns: state.tableColumns,
    };

    genCode(data).then((result) => {
      console.log('result:', result);
    });
  };
</script>

<style scoped>
  .page-box {
    margin: 16px;
  }

  .z-list-item {
    padding-left: 15px;
    cursor: pointer;
  }
  .z-curr-item {
    background-color: cornflowerblue;
    color: #fff;
  }
  .z-panel {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 15px;
  }

  .z-option-bar {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
  }
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>
