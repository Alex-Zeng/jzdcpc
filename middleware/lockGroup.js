export default function ({ store, redirect }) {
  if (store.getters.loggedUser) {
    const user = store.getters.loggedUser
    if (user.group == 5) {
      redirect('/')
    }
  }
}
