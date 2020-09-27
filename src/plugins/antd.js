/**
 * 按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import Vue from 'vue'
import {
  ConfigProvider,
  Button,
  Icon,
  Layout,
  Breadcrumb,
  Menu,
  Pagination,
  Form,
  Dropdown,
  Avatar,
  Input,
  Drawer,
  Select,
  Table,
  Tooltip,
  message,
  Modal,
  notification,
  Spin
} from 'ant-design-vue'

Vue.use(ConfigProvider)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.use(Menu)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(Dropdown)
Vue.use(Avatar)
Vue.use(Input)
Vue.use(Table)
Vue.use(Tooltip)
Vue.use(message)
Vue.use(Modal)
Vue.use(notification)
Vue.use(Spin)
Vue.use(Drawer)
Vue.use(Select)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
