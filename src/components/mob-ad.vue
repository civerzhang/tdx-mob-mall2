<style scoped>


</style>

<template>

  <div
    :style="adStyle"
  >
    <img 
      style="width: 100%;"
      :src="adImagePath"
    />
    <mob-split 
      v-if="item.split"
      :style="item.split.style"
    />
  </div>

</template>

<script>

import mixins from "commons/mixins.js";
import { getImagePathSimple } from "commons/image.js";

import mobSplit from "components/mob-split.vue";
  
export default {

  mixins: [mixins],
  components: {
    mobSplit
  },
  props: {
    item: {
      require: false
    },
    data: {
      require: false
    }
  },
  data() {
    return {
      winWidth: window.innerWidth,
    };
  },
  computed: {

    adStyle: function() {
      // return {
      //   width: `${this.winWidth}px`
      // };
    },

    adImagePath: function() {
      return getImagePathSimple(this.item.url);
    }
  }
}

</script>