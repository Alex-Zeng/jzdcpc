// 已经登录的用户无法进入login页面
export default function ({ store, redirect }) {
  if (store.getters.loggedToken) {
    return redirect('/')
  }
}
