export default function ({ store, redirect }) {
  if (store.getters.loggedUser) {
    const userRole = store.getters.loggedUser
    if (userRole == -1) {
      redirect('/')
    }
  }
}
