<template>
  <BasicDrawer
    @register="registerDrawer"
    v-bind="$attrs"
    :title="title === 'edit' ? '编辑前端功能' : '新增前端功能'"
    width="50%"
    showFooter
    @ok="handleSubmit"
    @visible-change="visibleChange"
  >
    <BasicForm @register="registerForm">
      <!--      <template #customSlot>-->
      <!--        <div class="styleColor flex">-->
      <!--          <div class="color-left">-->
      <!--            <Select ref="select" v-model:value="selectVal">-->
      <!--              <SelectOption value="to right">线性渐变/从左到右</SelectOption>-->
      <!--              <SelectOption value="to top">线性渐变/从上到下</SelectOption>-->
      <!--              <SelectOption value="to bottom right">线性渐变/对角</SelectOption>-->
      <!--            </Select>-->
      <!--          </div>-->
      <!--          <div class="color-right">-->
      <!--            <v3-color-picker-->
      <!--              :width="320"-->
      <!--              :height="220"-->
      <!--              v-model:value="color1"-->
      <!--              :zIndex="9999"-->
      <!--              @change="colorChange1"-->
      <!--              btn-->
      <!--            />-->
      <!--            <v3-color-picker-->
      <!--              :width="320"-->
      <!--              :height="220"-->
      <!--              v-model:value="color2"-->
      <!--              :zIndex="9999"-->
      <!--              @change="colorChange2"-->
      <!--              btn-->
      <!--            />-->
      <!--          </div>-->
      <!--          <div class="color-btn">-->
      <!--            <p class="button" :style="{ background: btnStyle }"></p>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </template>-->
    </BasicForm>
    <template #insertFooter>
      <a-button @click="restForm">重置</a-button>
    </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { addOrEditForm } from './table.data';
  import { addMenu, editMenu } from '@/api/Page/prosceniumUser/frontMenu';

  const title = ref('');
  const editId = ref();
  const color1 = ref('#FFFFFF');
  const color2 = ref('#888888');
  const selectVal = ref('to right');
  const btnStyle = ref(`linear-gradient(${selectVal.value}, ${color1.value}, ${color2.value})`);

  const emit = defineEmits(['register', 'success']);

  watchEffect(
    () =>
      (btnStyle.value = `linear-gradient(${selectVal.value}, ${color1.value}, ${color2.value})`),
  );

  // const colorChange1 = (c) => (color1.value = c);
  // const colorChange2 = (c) => (color2.value = c);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: addOrEditForm,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [registerDrawer, { closeDrawer }] = useDrawerInner(async (v) => {
    await resetFields();
    title.value = v.type;
    editId.value = null;
    if (v.type === 'edit') {
      let data = v.val;
      editId.value = data.id;
      btnStyle.value = data.style;
      await setFieldsValue({ ...data, ...{ icon: data.icon ? [data.icon] : [] } });
    }
  });

  // 表单提交
  const handleSubmit = async () => {
    const values = await validate();
    let other = { ...values, id: editId.value, icon: values.icon[0], style: btnStyle.value };
    title.value === 'edit' ? await editMenu({ ...other }) : await addMenu({ ...other });
    closeDrawer();
    emit('success');
  };

  // 表单重置
  const restForm = () => resetFields();

  // 弹窗关闭 | 打开
  const visibleChange = (state) => {
    if (!state) {
      btnStyle.value = `linear-gradient(${selectVal.value}, ${color1.value}, ${color2.value})`;
    }
  };

  // export default defineComponent({
  //   components: { AButton, BasicDrawer, BasicForm, Select, SelectOption, Input },
  //   emits: ['success', 'register'],
  //   setup(_, { emit }) {
  //
  //     return {
  //       registerDrawer,
  //       title,
  //       registerForm,
  //       handleSubmit,
  //       restForm,
  //       btnStyle,
  //       color1,
  //       color2,
  //       selectVal,
  //       colorChange1,
  //       colorChange2,
  //       visibleChange,
  //     };
  //   },
  // });
</script>
<style lang="less">
  .styleColor {
    width: 100%;
    justify-content: space-between;
    .color-left {
      width: 50%;
      padding-right: 10px;
      height: 40px;
    }
    .color-btn {
      width: 25%;
      height: 40px;
      float: right;
      .button {
        width: 95%;
        height: 100%;
      }
    }
    .color-right {
      width: 25%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .v3-c-p {
        .c-p-t {
          .c-p-i {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  .color-picker-dark {
    background: #ffffff;
    width: min-content !important;
    .color-value {
      span,
      div,
      svg {
        color: #000000 !important;
      }
      input {
        border: 1px solid #dadada;
        height: 30px;
      }
      .icon {
        fill: #000000 !important;
        height: 30px;
      }
    }
    .color-list {
      display: none;
    }
    .color-btns {
      font-size: 14px;
      padding: 8px 0 5px 0;
    }
  }
</style>
