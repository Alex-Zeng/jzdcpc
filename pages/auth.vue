<template>
  <div>
    <authHeader></authHeader>
    <nuxt-child/>
    <authFooter></authFooter>
  </div>
</template>

<style lang="stylus">
</style>

<script>
import authHeader from '../components/auth/header'
import authFooter from '../components/auth/footer'
export default {
  components: {
    authHeader,
    authFooter
  }
}
</script>
