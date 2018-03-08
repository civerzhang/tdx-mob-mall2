/* 
  单个操作按钮组件
*/
<style scoped>

.btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

<template>

  <div>
    <div
      class="btn"
      :style="btnStyle"
      @click.stop.prevent="btnClick"
    >{{btn.name}}</div>
    <mob-split 
      v-if="item.split"
      :item="item.split"
    />
  </div>

</template>

<script>

import logger from "commons/logger.js";
import mixins from "commons/mixins.js";
import { __webCallTqlWrapper } from "commons/req.js";

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
      require: true
    }
  },
  data() {
    return {};
  },

  methods: {

    btnClick: function() {
      
      if(this.btn.urlParam) {
        __webCallTqlWrapper("tdxOpenUrl", this.btn.urlParam, () => {}, this.data);
      }
    }
  },

  computed: {

    btn: function() {

      if(!this.data) return {};

      if(typeof this.item.btn == "function") {
        return this.item.btn(this.data);
      }
      else {
        return this.item.btn;
      }
    },

    _size: function() {
      return this.tdxSize.mobBtnSingle || {};
    },

    _color: function() {
      return this.tdxColor.mobBtnSingle || {};
    },

    btnStyle: function() {
      let { btn } = this._size;
      let color = this._color.btn;
      return $.extend({}, btn, color, this.btn.style);
    }
  }
}

</script>