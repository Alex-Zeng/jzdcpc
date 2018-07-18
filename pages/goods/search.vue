<template>
  <div>
    <indexHeader :isOpen="showMenu"></indexHeader>
  </div>
</template>

<script>
import indexHeader from '../../components/index/header'
export default {
  components: {
    indexHeader
  },
  data () {
    return {
      showMenu: false
    }
  },
  name: 'search'
}
</script>

<style scoped>

</style>
