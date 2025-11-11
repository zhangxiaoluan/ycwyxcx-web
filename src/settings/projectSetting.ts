import type { ProjectConfig } from '#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '@/enums/appEnum';
import {
  SIDE_BAR_BG_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  APP_PRESET_COLOR_LIST,
} from './designSetting';

// !更改后需要清除浏览器缓存
const setting: ProjectConfig = {
  // 是否显示配置按钮
  showSettingButton: true,

  // 是否显示主题切换按钮
  showDarkModeToggle: true,

  // “设置”按钮位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  //权限模式
  permissionMode: PermissionModeEnum.BACK,

  // 权限相关缓存存储在sessionStorage或localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // 主题颜色
  themeColor: APP_PRESET_COLOR_LIST[0],

  // 网站灰色模式，可能的哀悼日期开放
  grayMode: false,

  // 颜色弱点模式
  colorWeak: false,

  // 是否取消菜单、顶部、多标签页显示，可能嵌入其他系统
  fullContent: false,

  // 内容模式
  contentMode: ContentEnum.FULL,

  // 是否显示log
  showLogo: true,

  // 是否显示页脚
  showFooter: false,

  // 标头配置
  headerSetting: {
    //标题bg颜色
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // 固定在顶部
    fixed: true,
    // 是否显示顶部
    show: true,
    // 主题
    theme: ThemeEnum.LIGHT,
    // 是否启用锁屏功能
    useLockPage: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示文档按钮
    showDoc: false,
    // 是否显示通知按钮
    showNotice: false,
    // 是否显示菜单搜索
    showSearch: true,
    // 是否显示菜单api
    showApi: false,
  },

  // 菜单配置
  menuSetting: {
    // 侧边栏菜单bg颜色
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    //  是否固定左侧菜单
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 当因响应式布局而隐藏时
    siderHidden: false,
    // 折叠菜单时是否显示菜单名称
    collapsedShowTitle: false,
    // 是否可以拖动
    // 仅限于打开左侧菜单，鼠标在菜单右侧有一个拖动条
    canDrag: false,
    // 是否显示无dom
    show: true,
    // 是否显示dom
    hidden: false,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 分割菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 折叠触发器位置
    trigger: TriggerEnum.HEADER,
    // 打开手风琴模式，只显示菜单
    accordion: true,
    // 切换页面以关闭菜单
    closeMixSidebarOnChange: false,
    // 模块打开方法“点击”|“切换”
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 固定扩展菜单
    mixSideFixed: false,
  },

  // 多标签
  multiTabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true,
    // Auto collapsed
    autoCollapse: false,
  },

  // Transition Setting
  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoading
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar
    openNProgress: false,
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

  // Automatic screen lock time, 0 does not lock the screen. Unit minute default 0
  lockTime: 0,

  // Whether to show breadcrumbs
  showBreadCrumb: true,

  // Whether to show the breadcrumb icon
  showBreadCrumbIcon: false,

  // Use error-handler-plugin
  useErrorHandle: false,

  // Whether to open back to top
  useOpenBackTop: true,

  //  Is it possible to embed iframe pages
  canEmbedIFramePage: true,

  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: true,

  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  removeAllHttpPending: false,
};

export default setting;
