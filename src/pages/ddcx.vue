<style scoped>

</style>

<template>
  
  <div 
    class="app" 
    :id="`app${rn}`"
  >
    <div class="fix">
      <component
        v-if="isShow(query)"
        v-for="(query, index) in querys"
        :class="getComponentClass(query)"
        :key="`cc-${rn}-${index}`"
        :is="getItem(query)"
        :style="getComponentStyle(query)"
        :item="query"
      />
    </div>
    <div class="flx">
      <component
        v-if="isShow(item)"
        v-for="(item, index) in items"
        :class="getComponentClass(item)"
        :key="`cc-${rn}-${index}`"
        :is="getItem(item)"
        :style="getComponentStyle(item)"
        :item="item"
        :data="dataCache[item.index]"
      />
    </div>
  </div>

</template>

<script>

import logger from "commons/logger.js";
import mixins from "commons/mixins.js";
import { callTqlWrapper } from "commons/req.js";
import getComponent from "commons/components.js";
import event from "commons/event.js";
import { getConf } from "commons/transconf.js";

// 获取默认的查询参数
const getQueryParam = () => {
  
  if(typeof getDefQueryParam == "function") {
    return getDefQueryParam(getConf());
  }
}
  
export default {

  mixins: [mixins],
  props: [],
  data() {
    return {
      dataCache: [],
      queryParam: getQueryParam() || {},
    };
  },

  methods: {

    isShow: function(item) {
      return !item.toggleShow || this.dataCache[item.index];
    },

    getItem: function(item) {
      return getComponent(item.tplid);
    },

    queryData: function() {

      this.items.map( item => {

        let { index } = item;

        if(index == undefined) {
          return;
        }

        this.sendData(index);
      });
    },

    sendData: function(index) {
      
      let param = GetSendData(index, this.queryParam);
      if(param[0]) {

        callTqlWrapper(param[0], param[1], data => {

          if(param[1].valueOfJson()[0].F19471 != 1) {
            data = FormatResult(data);
            if(data.ErrorCode != 0) {
              tdxAlert(data.ErrorInfo);
              return;
            }
          }

          if(typeof SetDataField == "function") {
            data = SetDataField(data, index, this);
          }

          this.dataCache[index] = data;
          this.$forceUpdate();
        });
      }
    },

    queryParamChange: function(param) {
      $.extend(this.queryParam, param);
      this.queryParamChangeReq();
    },

    queryParamChangeReq: function() {
      this.dataCache = [];
      this.$nextTick(this.queryData);
    }
  },

  computed: {

    items: function() {
      return this.tdxConf.items || [];
    },
    querys: function() {
      return this.tdxConf.querys || [];
    }
  },

  created: function() {

    event.$on("mob-bar-tab-item-click", this.queryParamChange);
    event.$on("mob-query-date-change", this.queryParamChange)
  },

  mounted: function() {
    this.htmlColor();
    this.autoHeight();
    this.queryData();
  }
}

</script>