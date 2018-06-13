/**
 * 本文件定义element-ui组件框架的引入，按需引入
 * theme也按需引入
 */

import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
import '../theme/button.css'
import '../theme/form.css'
import '../theme/form-item.css'
import '../theme/input.css'
import '../theme/message.css'

export default () => {
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.prototype.$message = Message
}
