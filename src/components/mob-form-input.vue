/* 
  表单输入框
*/
<style scoped>

.row {
  padding: 0 15px;
  display: flex;
  align-items: center;
  height: 35px;
}

.row-name {
  flex-shrink: 0;
}

.row-input {
  border: 0;
  flex: 1 1 auto;
  height: 100%;
}

</style>

<template>

<div>
  <div>
    <div
      class="row"
      :style="titleStyle"
    >{{newItem.title.name}}</div>
    <div 
      class="row"
      :style="inputStyle"
    >
      <span
        class="row-name"
      >{{newItem.input.name}}</span>
      <input
        class="row-input"
        :style="inputTextStyle"
        :type="newItem.input.type ? newItem.input.type : 'text'"
        :placeholder="newItem.input.placeholder"
        v-model="inputValue"
      >
    </div>
  </div>
  <mob-split 
    v-if="newItem.split"
    :item="newItem.split"
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
      inputValue: ""
    };
  },

  watch: {

    inputValue: function(newValue, oldValue) {
      if(newValue != oldValue) {
        let o = {};
        o[this.newItem.input.field] = newValue;
        event.$emit("mob-form-input-change", o);
      }
    }
  },

  computed: {

    newItem: function() {

      let { getItem } = this.item;
      if(typeof getItem == "function") {
        return $.extend(true, {}, this.item, getItem(this.data));
      }
      else {
        return this.item;
      }
    },

    _size: function() {
      return this.tdxSize.mobFormInput || {};
    },

    _color: function() {
      return this.tdxColor.mobFormInput || {};
    },

    boxStyle: function() {
      let { box } = this._size;
      let color = this._color.box;
      return $.extend({}, box, color);
    },

    titleStyle: function() {
      let { title } = this._size;
      let color = this._color.title;
      return $.extend({}, this.boxStyle, title, color, this.newItem.title.style);
    },

    inputStyle: function() {
      let { input } = this._size;
      let color = this._color.input;
      return $.extend({}, this.boxStyle, input, color, this.newItem.input.style);
    },

    inputTextStyle: function() {

      if(!this.inputValue || this.inputValue == "") {
        return;
      }

      return this.newItem.input.style;
    }
  }
}

</script>