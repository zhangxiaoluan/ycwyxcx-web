<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="flex items-center absolute right-4 top-4">
      <AppDarkModeToggle class="enter-x mr-2" v-if="!sessionTimeout" />
      <AppLocalePicker
        class="text-white enter-x xl:text-gray-600"
        :show-text="false"
        v-if="!sessionTimeout && showLocale"
      />
    </div>

    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo class="-enter-x" />
          <div class="my-auto">
            <img
              :alt="title"
              src="../../../assets/svg/login-property.svg"
              class="w-1/2 -mt-16 -enter-x"
            />
            <div class="mt-10 -enter-x">
              <span class="inline-block mt-4 login-title">
                {{ t('sys.login.signInTitle') }}</span
              >
            </div>
            <div class="login-divider -enter-x"></div>
            <div class="mt-6 -enter-x login-desc">
              {{ t('sys.login.signInDesc') }}
            </div>
          </div>
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div
            :class="`${prefixCls}-form`"
            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-lg xl:ml-16 xl:bg-white sm:px-8 xl:p-6 sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <LoginForm />
            <ForgetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { AppDarkModeToggle, AppLocalePicker, AppLogo } from '@/components/Application';
  import { useGlobSetting } from '@/hooks/setting';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLocaleStore } from '@/store/modules/locale';
  import { computed } from 'vue';
  import ForgetPasswordForm from './ForgetPasswordForm.vue';
  import LoginForm from './LoginForm.vue';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const globSetting = useGlobSetting();
  const { prefixCls } = useDesign('login');
  const { t } = useI18n();
  const localeStore = useLocaleStore();
  const showLocale = localeStore.getShowPicker;
  const title = computed(() => globSetting?.title ?? '');
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;

      &::before {
        display: none;
      }

      .login-title {
        color: #fff;
        background-image: linear-gradient(90deg, #ffffff 0%, #d3e0f7 55%, #a7c0ea 100%);
      }

      .login-divider {
        background: linear-gradient(90deg, #ffffff 0%, #9db9e8 100%);
      }

      .login-desc {
        color: rgba(255, 255, 255, 0.65);
      }

      .container .@{logo-prefix-cls}__title {
        color: #fff;
      }

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link, .ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }

      .app-iconify {
        color: #fff;
      }

      .ant-divider-inner-text {
        color: @text-color-secondary;
      }
    }
  }

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;

    /* stylelint-disable-next-line media-query-no-invalid */
    @media (max-width: @screen-xl) {
      background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-image: url('@/assets/images/bg.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-xl) {
        display: none;
      }
    }

    .login-title {
      font-family: 'HarmonyOS Sans SC', 'MiSans', 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', sans-serif;
      font-size: 38px;
      font-weight: 700;
      letter-spacing: 0.1em;
      line-height: 1.2;
      background-image: linear-gradient(90deg, #2c4a8c 0%, #4a6cb2 55%, #7195d8 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .login-divider {
      width: 52px;
      height: 4px;
      margin-top: 20px;
      border-radius: 999px;
      background: linear-gradient(90deg, #3b5598 0%, #7ea2e0 100%);
    }

    .login-desc {
      font-family: 'HarmonyOS Sans SC', 'MiSans', 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', sans-serif;
      font-size: 15px;
      letter-spacing: 0.02em;
      color: #5a6b8c;
      line-height: 1.9;
      white-space: pre-line;
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        color: #fff;
        font-size: 16px;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          color: #1f2d3d;
          font-size: 24px;
        }

        img {
          width: 48px;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 360px;
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-xl) {
        min-width: 320px;
      }
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-lg) {
        min-width: 260px;
      }
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-md) {
        min-width: 240px;
      }
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }
  }
</style>
