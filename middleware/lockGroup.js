export default function ({ store, redirect }) {
  if (store.getters.groupId) {
    const groupId = store.getters.groupId
    if (groupId == 5) {
      redirect('/')
    }
  }
}
