/**
 * 本文件定义element-ui组件框架的引入，按需引入
 */

import Vue from 'vue'
import { Button, Form, FormItem, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default () => {
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
}
