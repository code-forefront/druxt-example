<template>
  <component
    :is="uiContentNode.name"
    v-bind="allProps"
  />
</template>

<script>
import Vue from 'vue'
//  import _ from 'lodash'
//  import DruxtNode from 'assets/helpers.js'
export default {
  props: {
    uiContentNode: {
      type: Object,
      required: true
    }
  },
  computed: {
    allProps () {
      return this.uiContentNode.props
    }
  },
  created () {
    const compName = this.uiContentNode.name
    const comp = () => import('@/components/' + compName)
    Vue.component(compName, comp)
  }
}
</script>

<style>

</style>
