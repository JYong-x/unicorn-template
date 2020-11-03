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
  Card,
  Popover,
  Popconfirm,
  message,
  Modal,
  notification,
  Spin,
  Skeleton,
  Checkbox,
  Radio,
  Tag,
  Row,
  Col,
  Upload,
  List,
  Divider
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
Vue.use(Card)
Vue.use(Popover)
Vue.use(Popconfirm)
Vue.use(message)
Vue.use(Modal)
Vue.use(notification)
Vue.use(Spin)
Vue.use(Drawer)
Vue.use(Select)
Vue.use(Skeleton)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Tag)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(List)
Vue.use(Divider)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
