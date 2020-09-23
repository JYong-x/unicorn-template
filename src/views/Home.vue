<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <u-icon type="icon-biaoge"></u-icon>
    <a-icon type="user"></a-icon>
    <a-icon :component="svgIcons.test"></a-icon>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import svgIcons from '@/assets/icons'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      svgIcons
    }
  },
  created () {
    console.log(svgIcons)
  }
}
</script>
