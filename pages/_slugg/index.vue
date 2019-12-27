<template>
  <!-- <div>{{ data }}</div> -->
  <druxt :ui-content-node="uiContent" />
</template>
<script>
import Vue from 'vue'
import drupalBuilder from '@/assets/drupalBuilder'
import druxt from '@/components/druxt'
Vue.component('druxt', druxt)
export default {
  async asyncData ({ route, error }) {
    const slugg = route.params.slugg
    const lang = route.params.lang
    try {
      return {
        uiContent: await drupalBuilder(lang, slugg, 'uiconfigexample')
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Article non trouvé' })
    }
  }
}
</script>
