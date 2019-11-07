<template>
  <druxt :ui-content-node="uiContent" />
</template>

<script>

import Vue from 'vue'
import drupalBuilder from '@/assets/drupalBuilder'
import druxt from '@/components/druxt'
Vue.component('druxt', druxt)

export default {
  async asyncData ({ route }) {
    return {
      uiContent: await drupalBuilder(route.path, 'uiconfigexample')
    }
  }
}
</script>
