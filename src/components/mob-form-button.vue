<style scoped>

.btn-wrapper {
  display: flex;
}

.btn {
  flex: 1 1 auto;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

</style>

<template>

<div
  v-if="show"
>
  <div 
    class="btn-wrapper"
    :style="btnWrapperStyle"
  >
    <div
      v-for="(btn, index) in item.btns"
      :key="`btn-${index}`"
      class="btn"
      :style="getBtnStyle(btn)"
      @click.stop.prevent="btnClick(btn)"
    >{{getBtnName(btn)}}</div>
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
      ckParams: {},
      show: true
    };
  },

  methods: {

    getBtnName: function(btn) {
      let { getBtnName } = btn;
      if(typeof getBtnName == "function") {
        return getBtnName(this.data, this.ckParams);
      }
      else {
        return btn.name;
      }
    },

    getBtnStyle: function(btn) {

      let { checkDisabledFunc } = btn;
      let isDisabled = false;
      if(typeof checkDisabledFunc == "function") {
        isDisabled = checkDisabledFunc(this.ckParams);
      }
      
      let disabledStyle;
      if(isDisabled) {
        disabledStyle = $.extend({}, this.btnDisabledStyle, btn.disabledStyle);
      }

      return $.extend({}, this.btnStyle, btn.style, disabledStyle);
    },

    onBtnCheck: function(params) {
      // console.log(`mob-form-button-check: \n` + params);
      this.ckParams = $.extend({}, this.ckParams, params);
    },

    btnClick: function(btn) {
      
      let { checkDisabledFunc, urlFunc, urlParam } = btn;
      let isDisabled = false;
      if(typeof checkDisabledFunc == "function") {
        isDisabled = checkDisabledFunc(this.ckParams);
      }

      if(isDisabled) return;

      if(typeof urlFunc == "function") {
        urlFunc(this.data, this.ckParams, this);
      }
      else {
        __webCallTqlWrapper("tdxOpenUrl", urlParam, () => {}, $.extend(this.data, this.ckParams));
      }
    },

    onCheckShow: function(show) {

      let { showFunc } = this.item;
      if(typeof showFunc == "function") {
        this.show = showFunc(show);
      }
      else {
        this.show = true;
      }      
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobFormButton || {};
    },

    _color: function() {
      return this.tdxColor.mobFormButton || {};
    },

    btnWrapperStyle: function() {
      let { btnWrapper } = this._size;
      let color = this._color.btnWrapper;
      return $.extend({}, btnWrapper, color, this.item.style);
    },
    
    btnStyle: function() {
      let { btn } = this._size;
      let color = this._color.btn;
      return $.extend({}, btn, color);
    },

    btnDisabledStyle: function() {
      let { btnDisabled } = this._size;
      let color = this._color.btnDisabled;
      return $.extend({}, btnDisabled, color);
    }
  },

  created: function() {
    event.$on("mob-form-button-check", this.onBtnCheck);
    event.$on("mob-form-button-show", this.onCheckShow);
  },

  mounted: function() {
    this.onCheckShow();
  }
}

</script>