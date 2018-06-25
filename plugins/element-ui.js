/**
 * 本文件定义element-ui组件框架的引入，按需引入
 * theme也按需引入
 */
import Vue from 'vue'
import { Button, Form, FormItem, Input, Message, Loading, MessageBox, Collapse, CollapseItem, Badge, Pagination } from 'element-ui'
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
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$message = Message
  Vue.prototype.$confirm = MessageBox.confirm
}
