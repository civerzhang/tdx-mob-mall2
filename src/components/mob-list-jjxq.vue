/* 

  基金详情列表组件

 */

<style scoped>

.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.line-right {
  display: flex;
  align-items: center;
}

</style>

<template>

  <div>
    <mob-bar 
      v-if="item.bar"
      :item="item.bar"
    />
    <div
      v-if="showLine(line)"
      v-for="(line, lineIndex) in item.lines"
      :key="`line-${lineIndex}`"
      class="line"
      :style="lineStyle"
      @click.stop.prevent="moreClick(line)"
    >
      <div
        :style="titleStyle"
      >{{line.title}}</div>
      <div
        class="line-right"
      >
        <div
          v-if="line.field"
          :style="valueStyle"
        >{{getFieldValue(data, line.field, line)}}</div>
        <div
          v-else-if="line.subTitle"
          :style="subTitleStyle"
        >{{line.subTitle}}</div>
        <img 
          v-if="line.urlParam"
          :src="imagePath"
          :style="imageStyle"
        />
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
import { __webCallTqlWrapper } from "commons/req.js";

import mobBar from "components/mob-bar.vue";
import mobSplit from "components/mob-split.vue";
  
export default {

  mixins: [mixins],
  components: {
    mobBar,
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

    moreClick: function(line) {
      if(line.urlParam) {
        __webCallTqlWrapper("tdxOpenUrl", line.urlParam, () => {}, this.data);
      }
    },

    showLine: function(line) {
      let rt = true;
      if(line.urlParam && line.urlParam.queryParams) {
        
        let params = line.urlParam.queryParams;
        for(let i = 0; i < params.length; i++) {

          /*

            如果跳转的 url 是配置的，但是配置的 url 没有返回，那么需要隐藏掉

          */
          if(params[i].key == "url") {

            if(this.data && !this.data[params[i].value]) {
              rt = false;
              break;
            }
          }
        }
      }

      return line.show || this.data && rt;
    }
  },
  computed: {

    _size: function() {
      return this.tdxSize.mobListJjxq || {};
    },

    _color: function() {
      return this.tdxColor.mobListJjxq || {};
    },

    lineStyle: function() {
      let { line } = this._size;
      let color = this._color.line;
      return $.extend(
        {},
        line,
        color,
        this.item.lineStyle
      );
    },

    titleStyle: function() {
      let { title } = this._size;
      let color = this._color.title;
      return $.extend({}, title, color, this.item.titleStyle);
    },

    valueStyle: function() {
      let { value } = this._size;
      let color = this._color.value;
      return $.extend({}, value, color);
    },

    subTitleStyle: function() {
      let { subTitle } = this._size;
      let color = this._color.subTitle;
      return $.extend({}, subTitle, color);
    },

    imageStyle: function() {
      let { image } = this._size;
      let color = this._color.image;
      return $.extend({}, image, color, this.item.image.style);
    },

    imagePath: function() {
      return getImagePathSimple(this.item.image.url);
    }
  },
  updated: function() {

    // logger.debug(`${JSON.stringify(this.data)}`);
  }
}

</script>