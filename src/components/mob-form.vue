/* 

  表单组件

*/

<style scoped>


</style>

<template>

<div class="app" :id="`app${rn}`">
  <div class="flx">
    <component
      v-for="(row, index) in item.rows"
      :key="`form-row-${index}`"
      :is="getItem(row)"
      :item="row"
      :data="data"
    />
  </div>
  <div class="fix">
    <component
      v-for="(row, index) in item.foot"
      :key="`form-row-${index}`"
      :is="getItem(row)"
      :item="row"
      :data="data"
    />
  </div>
</div>

</template>

<script>

import logger from "commons/logger.js";
import mixins from "commons/mixins.js";
import { getFormItem } from "commons/components.js";
import event from "commons/event.js";

import mobSplit from "components/mob-split.vue";
  
export default {

  mixins: [mixins],
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
      formParams: {}
    };
  },

  methods: {

    getItem: function(row) {
      return getFormItem(row.tplid);
    },

    // 表单中有内容变化时
    formChange: function(params) {
      this.formParams = $.extend({}, this.formParams, params);
      event.$emit("mob-form-button-check", this.formParams);
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobBarTab || {};
    },

    _color: function() {
      return this.tdxColor.mobBarTab || {};
    }
  },

  mounted: function() {

    if(this.item.foot) {
      this.autoHeight();
    }
  },

  created: function() {
    event.$on("mob-form-input-change", this.formChange);
    event.$on("mob-form-xys-check", this.formChange);
  }
}

</script>