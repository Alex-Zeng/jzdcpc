/**
 * 本文件定义element-ui组件框架的引入，按需引入
 * theme也按需引入
 */
import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Loading,
  MessageBox,
  Collapse,
  CollapseItem,
  Badge,
  Pagination,
  Progress,
  Radio,
  Select,
  Option,
  Tag,
  Dialog,
  Cascader,
  Checkbox
} from 'element-ui'
import '../theme/button.css'
import '../theme/form.css'
import '../theme/form-item.css'
import '../theme/input.css'
import '../theme/message.css'
import '../theme/loading.css'
import '../theme/badge.css'
import '../theme/collapse.css'
import '../theme/collapse-item.css'
import '../theme/pagination.css'
import '../theme/progress.css'
import '../theme/radio-group.css'
import '../theme/radio.css'
import '../theme/col.css'
import '../theme/select.css'
import '../theme/select-dropdown.css'
import '../theme/option.css'
import '../theme/option-group.css'
import '../theme/tag.css'
import '../theme/dialog.css'
import '../theme/cascader.css'
import '../theme/checkbox.css'

export default () => {
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Badge)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(Pagination)
  Vue.use(Loading.directive)
  Vue.use(Progress)
  Vue.use(Radio)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Tag)
  Vue.use(Dialog)
  Vue.use(Cascader)
  Vue.use(Checkbox)
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$message = Message
  Vue.prototype.$confirm = MessageBox.confirm
}
