// 资金展示卡片

<style scoped>

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*align-items: center;*/
  padding: 0 20px;
  height: 100px;
  background-image: linear-gradient(0deg, #4D91FF 0%, #2E6BB1 100%);
}

.info {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 20px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.zj {
  flex: 1 1 auto;
  color: #fff;
  font-size: 34px;
  line-height: 48px;
}

.btn {
  flex: 0 0 60px;
  font-size: 14px;
  color: #fff;
  border: 1px solid #ddd;
  padding: 3px 10px;
  border-radius: 3px;
}

</style>

<template>

<div>
  <div 
    class="box"
    :style="boxStyle"
  >
    <div
      class="info"
      :style="titleStyle"
    >{{item.title.name}}</div>
    <div class="row">
      <span
        class="zj"
        :style="zjStyle"
      >{{getFieldValue(data, item.zj.field, item.zj)}}</span>
      <div
        class="btn"
        :style="btnStyle"
        @click.stop.prevent="btnClick"
      >{{item.btn.name}}</div>
    </div>
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

    btnClick: function() {

      if(typeof this.item.btn.urlFunc == "function") {
        this.item.btn.urlFunc();
      }
      else if(this.item.btn.urlParam) {
        __webCallTqlWrapper("tdxOpenUrl", this.item.btn.urlParam, () => {}, this.data);
      }
    }
  },
  computed: {

    _size: function() {
      return this.tdxSize.mobCardZj || {};
    },

    _color: function() {
      return this.tdxColor.mobCardZj || {};
    },

    boxStyle: function() {
      let { box } = this._size;
      let color = this._color.box;
      return $.extend({}, box, color, this.item.style);
    },

    titleStyle: function() {
      let { title } = this._size;
      let color = this._color.title;
      return $.extend({}, title, color, this.item.title.style);
    },

    zjStyle: function() {
      let { zj } = this._size;
      let color = this._color.zj;
      return $.extend({}, zj, color, this.item.zj.style);
    },

    btnStyle: function() {
      let { btn } = this._size;
      let color = this._color.btn;
      return $.extend({}, btn, color, this.item.btn.style);
    }
  }
}

</script>