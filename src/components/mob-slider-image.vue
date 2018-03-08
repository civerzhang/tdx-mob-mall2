<style scoped>

.slider-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
}


.slider-item-wrapper {
  display: flex;
  transition: transform 0.3s ease-out;
}

.slider-spot-wrapper {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
}

.slider-image-wrapper {
  flex-shrink: 0;
  width: 100%;
}

.slider-spot {
  display: inline-block;
  margin: 0 3px;
}

.slider-spot-sel {
  background-color: #ddd;
}

</style>

<template>
<div>
  <div 
    class="slider-wrapper"
    :style="getComponentStyle(item)"
    @touchstart="swipeStart"
    @touchmove="swipeMove"
    @touchend="swipeEnd"
    @mousedown="swipeStart"
    @mousemove="swipeMove"
    @mouseup="swipeEnd"
  >
    <div 
      class="slider-item-wrapper"
      :style="getStyleItem()"
    >
      <div 
        v-for="(image, index) in images"
        :key="`slider-image-${index}`"
        class="slider-image-wrapper"
        :style="styleImageWrapper"
        @click="imageClick(image, $event)"
      >
        <img 
          :src="getImagePathSimple(image.url)" 
          :style="styleImage">
      </div>
    </div>
    <div 
      class="slider-spot-wrapper"
      v-if="images.length > 1"
    >
      <span 
        v-for="(image, index) in images"
        :key="`slider-spot-${index}`"
        class="slider-spot"
        :class="index == sliderIndex ? 'slider-spot-sel' : ''"
        :style="getStyleSpot(index, image)"
      ></span>
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
import { __webCallTqlWrapper, tdxOpenUrlParamDef } from "commons/req.js";

import mobSplit from "components/mob-split.vue";

// 判断是否手机环境
const isMobile = 'ontouchstart' in window;

// 获取 clientX
const getClientX = e => {

  if(!isMobile) {
    return e.clientX;
  }

  if(e.touches || e.changedTouches) {
    return (e.touches[0] || e.changedTouches[0]).clientX;
  }

  return ;
}
  
export default {

  mixins: [mixins],
  props: {
    item: {
      type: Object,
      require: true
    },
    data: {
      type: Object,
      require: false,
      default: {}
    }
  },
  components: {
    mobSplit
  },
  data() {
    return {
      sliderIndex: 0,
      startX: 0,
      manualOffset: 0,
      winWidth: window.innerWidth,
      timer: ""
    };
  },

  methods: {

    imageClick: function(imageObj, event) {
      if(imageObj.openParam) {
        __webCallTqlWrapper("tdxOpenUrl", $.extend({}, tdxOpenUrlParamDef, imageObj.openParam), () => {});
      }
    },

    getStyleItem: function() {
      let offset = -1 * this.winWidth * this.sliderIndex + this.manualOffset;
      let transform = `translate3d(${offset}px, 0, 0)`;
      let obj = {
        "-webkit-transform": transform,
        "transform": transform
      };
      if(this.manualOffset != 0) {
        obj.transition = "none";
      }

      return obj;
    },

    swipeStart: function(e) {

      if(!isMobile) {
        e.preventDefault();
        e.stopPropagation();
      }

      this.stopPlay();
      this.startX = getClientX(e);
    },

    swipeMove: function(e) {
      e.preventDefault();
      e.stopPropagation();
      if(!this.startX) {
        return;
      }
      let moveX = getClientX(e);
      this.manualOffset = moveX - this.startX;
    },

    swipeEnd: function(e) {
      if(!isMobile) {
        e.preventDefault();
        e.stopPropagation();
      }

      let endX = getClientX(e);
      let moveDistance = endX - this.startX;
      let moveDistanceAbs = Math.abs(moveDistance);
      if(moveDistanceAbs > this.winWidth * 0.15) {
        moveDistance > 0 ? this.sliderPrev() : this.sliderNext();
      }
      this.autoPlay();
      this.startX = 0;
      this.manualOffset = 0;
    },

    sliderPrev: function() {
      if(this.sliderIndex == 0) {
        return;
      }
      this.sliderIndex--;
    },

    sliderNext: function() {

      if(this.sliderIndex == this.count - 1) {
        return;
      }

      this.sliderIndex++;
    },

    getImagePathSimple: function(imageUrl) {
      return getImagePathSimple(imageUrl);
    },

    getStyleSpot: function(index) {
      
      if(index != this.sliderIndex) {
        let { spot } = this._size;
        let color = this._color.spot;
        return $.extend({}, spot, color);
      }
      else {
        let { spotSel } = this._size;
        let color = this._color.spotSel;
        return $.extend({}, spotSel, color);
      }
    },

    autoPlay: function() {
      this.stopPlay();
      if(this.count <= 1) {
        return;
      }
      this.timer = setInterval(() => {
        this.sliderIndex ++;
        if(this.sliderIndex == this.count) {
          this.sliderIndex = 0;
        }
      }, this.delay);
    },

    stopPlay: function() {
      if(this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  },

  computed: {

    delay: function() {
      return this.item.delay || 2000;
    },

    count: function() {
      return this.images.length || 0;
    },

    images: function() {
      return this.data && this.data.rows || this.item.images;
    },

    styleImage: function() {
      return {
        width: "100%",
        height: "100%"
      }
    },

    styleImageWrapper: function() {
      return {
        width: `${this.winWidth}px`
      }
    },

    _size: function() {
      return this.tdxSize.mobSliderImage || {};
    },

    _color: function() {
      return this.tdxColor.mobSliderImage || {};
    }
  },

  mounted: function() {

    this.autoPlay();
  }
}

</script>