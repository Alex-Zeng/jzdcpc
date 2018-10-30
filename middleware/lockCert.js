export default function ({ store, redirect }) {
  if (store.getters.loggedUser) {
    const userRole = store.getters.loggedRole
    if (userRole == 0) {
      redirect('/user/setting/cert')
    }
  }
}
