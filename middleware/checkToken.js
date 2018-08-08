export default function ({store, redirect}) {
  const token = store.getters.loggedToken
  if (!token) {
    redirect('/')
  }
}
