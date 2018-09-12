/**
 * 本文件定义element-ui组件框架的引入，按需引入
 * theme也按需引入
 */
import Vue from 'vue'
import {
  Button,
  RadioButton,
  RadioGroup,
  Form,
  FormItem,
  Input,
  DatePicker,
  Message,
  Loading,
  MessageBox,
  Collapse,
  CollapseItem,
  Badge,
  Pagination,
  Progress,
  Radio,
  Row,
  Col,
  Select,
  Option,
  Tag,
  Dialog,
  Cascader,
  Checkbox,
  Carousel,
  CarouselItem,
  Breadcrumb,
  BreadcrumbItem,
  InputNumber,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Step,
  Steps
} from 'element-ui'
import '../theme/button.css'
import '../theme/radio-button.css'
import '../theme/form.css'
import '../theme/form-item.css'
import '../theme/input.css'
import '../theme/date-picker.css'
import '../theme/message.css'
import '../theme/loading.css'
import '../theme/badge.css'
import '../theme/collapse.css'
import '../theme/collapse-item.css'
import '../theme/pagination.css'
import '../theme/progress.css'
import '../theme/radio-group.css'
import '../theme/radio.css'
import '../theme/row.css'
import '../theme/col.css'
import '../theme/select.css'
import '../theme/select-dropdown.css'
import '../theme/option.css'
import '../theme/option-group.css'
import '../theme/tag.css'
import '../theme/dialog.css'
import '../theme/cascader.css'
import '../theme/checkbox.css'
import '../theme/carousel.css'
import '../theme/carousel-item.css'
import '../theme/breadcrumb.css'
import '../theme/breadcrumb-item.css'
import '../theme/input-number.css'
import '../theme/table.css'
import '../theme/table-column.css'
import '../theme/tabs.css'
import '../theme/tab-pane.css'
import '../theme/step.css'
import '../theme/steps.css'

export default () => {
  Vue.use(Button)
  Vue.use(RadioButton)
  Vue.use(RadioGroup)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(DatePicker)
  Vue.use(Badge)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(Pagination)
  Vue.use(Loading.directive)
  Vue.use(Progress)
  Vue.use(Radio)
  Vue.use(Select)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Option)
  Vue.use(Tag)
  Vue.use(Dialog)
  Vue.use(Cascader)
  Vue.use(Checkbox)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(InputNumber)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Step)
  Vue.use(Steps)
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$message = Message
  Vue.prototype.$confirm = MessageBox.confirm
}
