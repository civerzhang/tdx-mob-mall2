<style scoped>

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.op-btn {
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid #4696F5;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  color: #4696F5;
}

</style>

<template>
  <div>
    <mob-bar 
      :v-if="item.bar"
      :item="item.bar"
      :data="data"
    />
    <div 
      v-if="item.card"
      class="card"
      :style="cardStyle"
      @click="cardClick"
    >
      <span
        v-if="item.card.title"
        :style="cardTitleStyle"
      >{{data[item.card.title.field]}}</span>
      <div class="cards">
        <span
          v-if="data[cc.field]"
          v-for="(cc, index) in item.card.cards"
          :key="`op-cc-${index}`"
          :class="getCardClass(cc)"
          :style="cc.style"
        >{{data[cc.field]}}</span>
      </div>
      <span
        v-if="item.card.sy && item.card.sy.name"
        :style="syNameStyle"
      >{{item.card.sy.name}}</span>
      <span
        v-if="item.card.sy && item.card.sy.field"
        :style="syValueStyle"
      >{{getFieldValue(data, item.card.sy.field, item.card.sy)}}</span>
      <div 
        v-if="item.card.op && item.card.op.name"
        class="op-btn"
        @click.stop.prevent="cardOpBtnClick"
      >{{item.card.op.name}}</div>
    </div>
    <mob-split
      v-if="item.split"
      :style="item.split.style"
    />
  </div>
</template>

<script>

import mixins from "commons/mixins.js";
import { getImagePathSimple } from "commons/image.js";
import { __webCallTqlWrapper } from "commons/req.js";

import mobSplit from "components/mob-split.vue";
import mobBar from "components/mob-bar.vue";
  
export default {

  mixins: [mixins],
  components: {
    mobSplit,
    mobBar
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
    return {};
  },

  methods: {

    cardOpBtnClick: function(e) {

      let urlParam = this.item.card.op.urlParam;
      let param;
      if(typeof urlParam == "function") {
        param = urlParam(this.data);
      }
      else {
        param = urlParam;
      }
      
      if(param) {
        __webCallTqlWrapper(
          "tdxOpenUrl", 
          param,
          () => {},
          this.data
        );
      }
    },

    cardClick: function() {
      
      if(this.item.card.urlParam) {
        __webCallTqlWrapper(
          "tdxOpenUrl", 
          this.item.card.urlParam,
          () => {},
          this.data
        );
      }
    },

    getCardClass: function(card) {
      return card.class;
    },

    getBarIcon: function(iconName) {
      return getImagePathSimple(iconName);
    },

    getIconStyle: function(iconObj) {
      let { icon } = this._size;
      let color = this._color.icon;
      return $.extend({}, icon, color, iconObj.style);
    },

  },
  computed: {

    _size: function() {
      return this.tdxSize.mobCardOp || {};
    },

    _color: function() {
      return this.tdxColor.mobCardOp || {};
    },

    barStyle: function() {
      let { bar } = this._size;
      let color = this._color.bar;
      return $.extend({}, bar, color);
    },

    titleStyle: function() {
      let { title } = this._size;
      let color = this._color.title;
      return $.extend({}, title, color);
    },

    subTitleStyle: function() {
      let { subTitle } = this._size;
      let color = this._color.subTitle;
      return $.extend({}, subTitle, color);
    },

    cardStyle: function() {
      let { card } = this._size;
      let color = this._color.card;
      return $.extend({}, card, color);
    },

    cardTitleStyle: function() {
      let { cardTitle } = this._size;
      let color = this._color.cardTitle;
      return $.extend({}, cardTitle, color, this.item.card.title.style);
    },

    syNameStyle: function() {
      let { syName } = this._size;
      let color = this._color.syName;
      return $.extend({}, syName, color, this.item.card.sy.nameStyle);
    },

    syValueStyle: function() {

      let { syValue} = this._size;
      let color = this._color.syValue;
      let fieldColor = this.getFieldColor(this.data, this.item.card.sy.field, 4);
      return $.extend({}, syValue, color, { color: fieldColor });
    }
  }
}

</script>