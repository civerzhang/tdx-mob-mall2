<style scoped>
  
.split {
  flex-shrink: 0;
  height: 10px;
  width: 100%;
}

</style>

<template>
  <div class="split" :style="splitStyle"></div>
</template>

<script>

import mixins from "commons/mixins.js";
  
export default {

  mixins: [mixins],
  props: {
    item: {
      require: false
    },
    data: {
      require: false
    }
  },
  data() {
    return {};
  },
  computed: {

    splitStyle: function() {

      let { mobSplit } = this.tdxSize;
      let color = this.tdxColor.mobSplit;
      return $.extend({}, mobSplit, color);
    }
  }
}

</script>