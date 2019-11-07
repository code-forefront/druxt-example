<template>
  <druxt :ui-content-node="uiContent" />
</template>

<script>
import drupalBuilder from '@/assets/drupalBuilder'

export default {
  async asyncData ({ route }) {
    return {
      uiContent: await drupalBuilder(route.path, 'uiconfigexample')
    }
  }
}
</script>
