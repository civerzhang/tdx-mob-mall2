<style scoped>


</style>

<template>

<div>
  <div>tdx-template</div>
  <mob-split 
    v-if="item.split"
    :item="item.split"
  />
</div>

</template>

<script>

import logger from "commons/logger.js";
import mixins from "commons/mixins.js";

import mobSplit from "components/mob-split.vue";
  
export default {

  mixins: [mixins],
  components: {
    mobSplit
  },
  props: {
    item: {
      require: true
    },
    data: {
      require: false
    }
  },
  data() {
    return {};
  },
  computed: {

    _size: function() {
      return this.tdxSize.mobBarTab || {};
    },

    _color: function() {
      return this.tdxColor.mobBarTab || {};
    }
  }
}

</script>