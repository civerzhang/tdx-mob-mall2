/* 
  表单中的展示组件
*/
<style scoped>

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0px 15px;
}

.row-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
}

.row-op {
  font-size: 12px;
  color: #00A2E8;
}

</style>

<template>

<div>
  <div 
    class="row"
    :style="boxStyle"
  >
    <div class="row-left">
      <div
        v-for="(col, index) in item.cols"
        :key="`col-${index}`"
        :style="getColStyle(col)"
      >
        <span
          v-if="col.field"
        >{{getFieldValue(data, col.field, col)}}</span>
        <span
          v-else
        >{{col.name}}</span>
      </div>
    </div>
    <div
      v-if="item.op"
      :style="opStyle"
      @click.stop.prevent="opClick"
    >{{item.op.name}}</div>
  </div>
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
      require: false
    }
  },
  data() {
    return {};
  },

  methods: {

    getColStyle: function(col) {
      return $.extend({}, this.colStyle, col.style);
    },

    opClick: function() {

      let { urlFunc, urlParam } = this.item.op;
      if(typeof urlFunc == "function") {
        urlFunc(this.data);
      }
      else {
        __webCallTqlWrapper("tdxOpenUrl", urlParam, () => {}, this.data);
      }
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobFormSpan || {};
    },

    _color: function() {
      return this.tdxColor.mobFormSpan || {};
    },

    boxStyle: function() {
      let { box } = this._size;
      let color = this._color.box;
      return $.extend({}, box, color, this.item.style);
    },

    colStyle: function() {
      let { col } = this._size;
      let color = this._color.col;
      return $.extend({}, col, color);
    },

    opStyle: function() {
      let { op } = this._size;
      let color = this._color.op;
      return $.extend({}, op, color, this.item.op.style);
    }
  }
}

</script>