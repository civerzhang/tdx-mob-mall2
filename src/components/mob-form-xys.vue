<style scoped>

.row {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 15px;
}

.row-image {
  flex: 0 0 19px;
  height: 19px;
}

.row-title {
  margin-left: 10px;
}

</style>

<template>

<div>
  <div
    v-if="!urls || !urls.length"
    class="tdx-loading"
  ></div>
  <div
    v-else
  >
    <div
      class="row"
      :style="rowStyle"
    >
      <img
        class="row-image"
        :style="checkStyle"
        :src="allCheckImage"
        @click.stop.prevent="allCheckClick"
      >
      <span
        class="row-title"
      >{{item.title}}</span>
    </div>
    <div 
      class="row"
      v-for="(url, index) in urls"
      :key="`xys-${index}`"
    >
      <img
        class="row-image"
        :style="getXysCheckStyle(url)"
        :src="getCheckImage(url, index)"
        @click.stop.prevent="xysCheckClick(index)"
      >
      <span
        class="row-title"
        :style="getXysUrlStyle(url)"
        @click.stop.prevent="xysUrlClick(url, index)"
      >{{url.title}}</span>
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
import { getImagePathSimple } from "commons/image.js";
import event from "commons/event.js";
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
    return {
      allCheck: false,
      checkList: []
    };
  },

  watch: {

    // url 改变时，我们对 checkList 中每个下标进行监听
    urls: function() {
      this.checkList = [];
    },

    allCheck: function(newValue, oldValue) {
      let o = {};
      o[this.item.field] = newValue;
      event.$emit("mob-form-xys-check", o);
    }
  },

  methods: {

    getCheckImage: function(param, index) {
      let imageIndex = this.allCheck || this.checkList[index] ? 1 : 0;
      let checkImage = param.checkImage || this.item.checkImage;
      return getImagePathSimple(checkImage[imageIndex]);
    },

    xysCheckClick: function(index, result) {

      this.$set(this.checkList, index, result || !this.checkList[index]);
      let flag = true;
      for(let i = 0; i < this.urls.length; i++) {
        if(!this.checkList[i]) {
          flag = false;
          break;
        }
      }
      this.allCheck = flag;
    },

    allCheckClick: function() {
      this.checkList = [];
      this.allCheck = !this.allCheck;
      this.urls.map((url, index) => {
        this.checkList[index] = this.allCheck;
      });
    },

    xysUrlClick: function(param, index) {
      this.xysCheckClick(index, true);
      if(param.urlParam) {
        __webCallTqlWrapper("tdxOpenUrl", param.urlParam, () => {}, this.data);
      }
    },

    getXysCheckStyle: function(param) {
      return param.checkStyle;
    },

    getXysUrlStyle: function(param) {
      return param.style;
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobFormXys || {};
    },

    _color: function() {
      return this.tdxColor.mobFormXys || {};
    },

    urls: function() {
      
      let { getUrls, urls } = this.item;
      if(typeof getUrls == "function") {
        return this.data && getUrls(this.data);
      }
      else {
        return urls;
      }
    },

    allCheckImage: function() {
      let imageIndex = this.allCheck ? 1 : 0;
      let imageName = this.item.checkImage[imageIndex];
      return getImagePathSimple(imageName);
    },

    rowStyle: function() {
      let { row } = this._size;
      let color = this._color.row;
      return $.extend({}, row, color, this.item.style);
    },

    checkStyle: function() {
      let { check } = this._size;
      let color = this._color.check;
      return $.extend({}, check, color, this.item.checkStyle);
    }
  }
}

</script>