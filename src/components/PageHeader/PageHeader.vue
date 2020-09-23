<template>
  <div class="page-header">
    <div class="page-header-index-wide">
      <breadcrumb />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'PageHeader',
  components: {
    Breadcrumb
  },
  props: {
    title: {
      type: [String, Boolean],
      default: true,
      required: false
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.page-header {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
}
</style>
