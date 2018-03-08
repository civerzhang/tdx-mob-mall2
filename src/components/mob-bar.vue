<style scoped>

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.barIcon {
  display: inline-block;
}

.more {
  display: flex;
  align-items: center;
}

.arrow {
  width: 8px;
  height: 16px;
}

</style>

<template>

  <div 
    class="bar"
    :style="barStyle"
    @click.stop.prevent="rowClick"
  >
    <div class="more">
      <div
        v-if="item.icon && item.icon.url" 
        :style="getIconStyle(item.icon)"
      >
        <img 
          :src="barIconImage" 
          style="width: 100%;height: 100%;"
          alt="img"
        />
      </div>
      <span 
        v-else-if="item.icon"
        class="barIcon"
        :style="getIconStyle(item.icon)"
      ></span>
      <span
        :style="titleStyle"
      >{{item.title}}</span>
      <span
        :style="subTitleStyle"  
      >{{item.subTitle}}</span>
    </div>
    <div
      v-if="item.more"
      class="more"
      @click.stop.prevent="barMoreClick"
    >
      <span
        :style="moreTitleStyle"
      >{{item.more.title}}</span>
      <div 
        :style="moreImageStyle"
        class="arrow"
      >
        <img 
          :src="moreImagePath"
          style="width:100%; height: 100%;"
        />
      </div>
    </div>
  </div>

</template>

<script>

import mixins from "commons/mixins.js";
import { getImagePathSimple } from "commons/image.js";
import { __webCallTqlWrapper } from "commons/req.js";
  
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

  methods: {

    rowClick: function() {
      if(this.item.rowClickEnable) {
        this.barMoreClick();
      }
    },

    barMoreClick: function() {

      let { urlParam, urlFunc } = this.item.more || {};
      if(typeof urlFunc == "function") {
        urlFunc();
      }
      else if(this.item.more.urlParam) {
        __webCallTqlWrapper("tdxOpenUrl", this.item.more.urlParam, () => {});
      }
    },
    
    getIconStyle: function(iconObj) {
      let { icon } = this._size;
      let color = this._color.icon;
      return $.extend({}, icon, color, iconObj && iconObj.style);
    },

  },
  computed: {

    _size: function() {
      return this.tdxSize.mobBar || {};
    },

    _color: function() {
      return this.tdxColor.mobBar || {};
    },

    barStyle: function() {
      let { bar } = this._size;
      let color = this._color.bar;
      return $.extend({}, bar, color, this.item.style);
    },

    barIconImage: function() {
      return getImagePathSimple(this.item.icon.url);
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

    moreImagePath: function() {
      return getImagePathSimple("arrow.png");
    },

    moreTitleStyle: function() {
      let { moreTitle } = this._size;
      let color = this._color.moreTitle;
      return $.extend({}, moreTitle, color, this.item.more.style);
    },

    moreImageStyle: function() {
      return this.item.more.iconStyle;
    }

  }
}

</script>