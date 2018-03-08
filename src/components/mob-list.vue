<style scoped>


</style>

<template>

  <div>
    <mob-bar 
      v-if="item.bar"
      :item="item.bar"
    />
    <div v-if="loading" class="tdx-loading"></div>
    <div v-else-if="data.length == 0" class="tdx-nodata">{{item.noDataInfo || noDataInfo}}</div>
    <div v-else>
      <component 
        v-for="(row, index) in data"
        :key="`list-card-${index}`"
        :is="card"
        :item="item.card"
        :data="row"
      />
    </div>
    <mob-split 
      v-if="item.split"
      :item="item.split"
      :style="item.split.style"
    />
  </div>

</template>

<script>

import mixins from "commons/mixins.js";

import mobBar from "components/mob-bar.vue";
import mobSplit from "components/mob-split.vue";
import { getCard } from "commons/components.js";
  
export default {

  mixins: [mixins],
  components: {
    mobBar,
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
      timer: undefined
    };
  },
  computed: {

    card: function() {
      return getCard(this.item.card.tplid);
    },

    loading: function() {

      if(!this.data) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}

</script>