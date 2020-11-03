<template>
  <div class="home">
    <a-row :gutter="16">
      <a-col :span="12">
        <announcement></announcement>
      </a-col>
    </a-row>
    <!--    <u-icon type="icon-biaoge"></u-icon>-->
    <!--    <a-icon type="user"></a-icon>-->
    <!--    <u-empty></u-empty>-->
    <!--    <a-icon :component="test"></a-icon>-->
  </div>
</template>

<script>
// import { test } from '@/assets/icons'
import Announcement from './Announcement'
export default {
  name: 'Home',
  components: {
    Announcement
  },
  data () {
    return {
      // test
    }
  },
  created () {
  }
}
</script>
