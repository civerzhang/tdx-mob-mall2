/* 
  订单卡片组件
*/
<style scoped>

.box {
  padding: 15px;
}

.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bar-left {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.bar-right {
  flex-shrink: 0;
}

.title {
  font-size: 16px;
  line-height: 22px;
  color: #333;
}

.code {
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.5);
}

.td-wrapper {
  display: flex;
  align-items: center;
}

.td-title {
  flex-shrink: 0;
}

.td-title,
.td-value {
  color: rgba(0, 0, 0, 0.5);
}

.td-value {
  flex: 1 1 auto;
}

</style>

<template>

<div>
  <div 
    v-if="data"
    class="box"
    :style="boxStyle"
  >
    <div class="bar">
      <div class="bar-left">
        <span
          class="title"
          :style="titleStyle"
          @click.stop.prevent="titleClick"
        >{{data[item.title.field]}}</span>
        <span
          class="code"
          :style="codeStyle"
        >{{data[item.code.field]}}</span>
      </div>
      <div 
        class="bar-right tdx-btn"
        v-if="item.opBtn"
        :style="opBtnStyle"
        @click.stop.prevent="opBtnClick"
      >{{item.opBtn.name}}</div>
    </div>
    <table 
      style="width: 100%"
      :style="tableStyle"
    >
      <tr
        v-for="(tr, trIndex) in item.table.cols"
        :key="`card-dd-tr-${trIndex}`"
      >
        <td
          v-for="(td, tdIndex) in tr"
          :key="`card-dd-tr-${trIndex}-td-${tdIndex}`"
        >
          <div class="td-wrapper">
            <span
              class="td-title"
              :style="tdTitleStyle"
            >{{td.title}}</span>
            <span
              class="td-value"
              :style="tdValueStyle"
            >{{getFieldValue(data, td.field, td)}}</span>  
          </div>
        </td>
      </tr>
    </table>
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

    opBtnClick: function() {
      let { opBtn } = this.item;
      if(typeof opBtn.urlFunc == "function") {
        opBtn.urlFunc(this.data);
      }
      else if(opBtn.urlParam) {
        __webCallTqlWrapper("tdxOpenUrl", opBtn.urlParam, () => {}, this.data);
      }
    },

    titleClick: function() {
      let { urlParam } = this.item;
      if(urlParam) {
        __webCallTqlWrapper("tdxOpenUrl", urlParam, () => {}, this.data);
      }
    }
  },
  computed: {

    _size: function() {
      return this.tdxSize.mobCardDd || {};
    },

    _color: function() {
      return this.tdxColor.mobCardDd || {};
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

    codeStyle: function() {
      let { code } = this._size;
      let color = this._color.code;
      return $.extend({}, code, color, this.item.code.style);
    },

    opBtnStyle: function() {
      let { opBtn } = this._size;
      let color = this._color.opBtn;
      return $.extend({}, opBtn, color, this.item.opBtn.style);
    },

    tableStyle: function() {
      let { table } = this._size;
      let color = this._color.table;
      return $.extend({}, table, color, this.item.table.style);
    },

    tdTitleStyle: function() {
      let { tdTitle } = this._size;
      let color = this._color.tdTitle;
      return $.extend({}, tdTitle, color);
    },

    tdValueStyle: function() {
      let { tdValue } = this._size;
      let color = this._color.tdValue;
      return $.extend({}, tdValue, color);
    },
  }
}

</script>