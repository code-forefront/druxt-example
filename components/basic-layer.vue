<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ pictureTitle }}</p>
    <druxt-slot :ui-content-node="content" />
  </div>
</template>

<script>
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
      type: Object,
      default: null
    }
  }
}
</script>

<style>

</style>