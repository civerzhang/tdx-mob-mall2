// 顶部 tab 栏
<style scoped>

.tab {
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-item-sel {
  border-bottom: 2px solid #ddd;
}

</style>

<template>

  <div>
    <div
      class="tab"
      :style="tabStyle"
    >
      <div
        v-for="(tab, index) in item.tabs"
        :key="`mob-bar-tab-${index}`"
        :class="getTabItemClass(index)"
        :style="getTabItemStyle(index)"
        @click.stop.prevent="tabItemClick(index)"
      >{{tab.title}}</div>
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
import event from "commons/event.js";

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
    return {
      itemSel: localStorage[this.item.localStorageKey] || 0
    };
  },

  methods: {

    tabItemClick: function(index) {

      if(index == this.itemSel) return;

      this.itemSel = index;
      localStorage[this.item.localStorageKey] = index;
      event.$emit("mob-bar-tab-item-click", this.item.tabs[index].param);
    },

    getTabItemClass: function(index) {

      if(index == this.itemSel) {
        return "tab-item tab-item-sel";
      }
      else {
        return "tab-item";
      }
    },

    getTabItemStyle: function(index) {

      let { tabItem } = this._size;
      let color = this._color.tabItem;
      let tabItem2, color2;
      let tabItemSelStyle;
      if(index == this.itemSel) {
        tabItem2 = this._size.tabItemSel;
        color2 = this._color.tabItemSel;
        tabItemSelStyle = this.item.tabItemSelStyle;
      }
      return $.extend(
        {},
        tabItem,
        color,
        tabItem2,
        color2,
        this.item.tabItemStyle,
        tabItemSelStyle
      );
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobBarTab || {};
    },

    _color: function() {
      return this.tdxColor.mobBarTab || {};
    },

    tabStyle: function() {
      let { tab } = this._size;
      let color = this._color.tab;
      return $.extend({}, tab, color, this.item.style);
    }
  },

  mounted: function() {
    
  }
}

</script>