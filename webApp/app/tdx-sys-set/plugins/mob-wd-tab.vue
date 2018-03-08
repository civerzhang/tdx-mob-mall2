<template>
  
  <div 
    class="tdx-wd-row"
  >
    <div class="tdx-wd-left">
      <img 
        class="tdx-wd-icon"
        v-if="item.imageName"
        :src="imageSrc"
      />
      <span
        class="tdx-wd-title"
      >{{item.title}}</span>
    </div>
    <div class="tdx-wd-right">
      <div
        v-for="(tab, tabIndex) in tabs"
        :key="'tab-' + tabIndex"
        class="tdx-wd-tab-item"
        :style="getTabItemStyle(tabIndex, tab)"
        @click="tabClick(tabIndex, tab)"
      >{{tab.title}}</div>
    </div>
  </div>

</template>

<script>

return {

  data: function() {
    return {
      tabSel: 0,
      tabs: []
    };
  },

  methods: {

    tabClick: function(index, tab) {

      if(index != this.tabSel) {

        var click = tab.click;
        if(typeof click == "function") {
          click(index, this);
        }
      }

    },

    getTabItemStyle: function(index, tab) {

      // console.log(index + "|" + this.tabSel);
      if(index == this.tabSel) {
        return $.extend({}, this.tabItemSelStyle, tab.style);
      }
      else {
        return $.extend({}, this.tabItemStyle, tab.style);
      }
    },

    initTabs: function() {

      var getTabs = this.item.getTabs;
      if(typeof getTabs == "function") {
        getTabs(this);
      }
      else {
        this.tabs = this.item.tabs;
        this.tabSel = 0;
      }
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobWdTab || {};
    },

    _color: function() {
      return this.tdxColor.mobWdTab || {};
    },

    tabItemStyle: function() {
      var size = this._size.tabItem;
      var color = this._color.tabItem;
      return $.extend({}, size, color);
    },

    tabItemSelStyle: function() {
      var size = this._size.tabItemSel;
      var color = this._color.tabItemSel;
      return $.extend({}, size, color);
    },

    imageSrc: function() {
      return tdx.getImagePathSimple(this.item.imageName);
    }
  },

  mounted: function() {
    this.initTabs();
  }
}

</script>
