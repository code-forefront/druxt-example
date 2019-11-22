<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ pictureTitle }}</p>
    <druxt :ui-content-node="content" />
  </div>
</template>

<script>
import DruxtNode from 'assets/helpers.js'
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    pictureTitle: {
      type: String,
      default: null
    },
    content: {
      type: DruxtNode,
      default: null
    }
  }
}
</script>

<style>

</style>
