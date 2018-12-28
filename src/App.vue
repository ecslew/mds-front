<template>
  <div id="app">
    <mds-nav></mds-nav>
    <router-view/>
  </div>
</template>

<script>
import mdsNav from '@/base/mdsNav'
export default {
  name: 'App',
  components: {
    mdsNav
  }
}
</script>

<style>

</style>
