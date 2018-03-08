<style scoped>

.nav {
  display: flex;
}

.nav-item {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}

</style>

<template>
<div>
  <div class="nav">
    <div 
      class="nav-item"
      v-for="(nav, index) in item.navs"
      :key="`nav-${index}`"
      :style="styleNavItem"
      @click="navItemClick(nav, $event)"
    >
      <img
        class="nav-image" 
        :style="styleImage"
        :src="getNavIconPath(nav.url)"
      />
      <span :style="styleTitle">{{nav.title}}</span>
    </div>
  </div>
  <mob-split 
    v-if="item.split"
    :class="getComponentClass(item.split)"
    :style="getComponentStyle(item.split)"
  /> 
</div>
</template>

<script>

import mixins from "commons/mixins.js";
import { getImagePathSimple } from "commons/image.js";
import { __webCallTqlWrapper } from "commons/req.js";

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
    return {};
  },

  methods: {

    navItemClick: function(nav, event) {
      
      if(nav.urlParam) {
        __webCallTqlWrapper("tdxOpenUrl", nav.urlParam, () => {});
      }
    },

    getNavIconPath: function(imageName) {
      return getImagePathSimple(imageName);
    }
  },
  computed: {

    _size: function() {
      return this.tdxSize.mobNavIcon || {};
    },

    _color: function() {
      return this.tdxColor.mobNavIcon || {};
    },

    styleImage: function() {
      let { image } = this._size;
      let color = this._color.image;
      return $.extend({}, image, color);
    },

    styleTitle: function() {
      let { title } = this._size;
      let color = this._color.title;
      return $.extend({}, title, color);
    },

    styleNavItem: function() {
      let { navItem } = this._size;
      let color = this._color.navItem;
      return $.extend({}, navItem, color);
    }
  }
}

</script>