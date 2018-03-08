<style scoped>

</style>

<template>
  
  <div 
    class="app" 
    :id="`app${rn}`"
  >
    <div class="fix">
      <component
        v-for="(item, index) in top"
        :class="getComponentClass(item)"
        :key="`cc0-${rn}-${index}`"
        :is="getItem(item)"
        :style="getComponentStyle(item)"
        :item="item"
        :data="dataCache[item.index]"
      />
    </div>
    <div 
      class="flx" 
      :id="`flx${rn}`"
      :style="itemStyle"
    >
      <component
        v-for="(item, index) in items"
        :class="getComponentClass(item)"
        :key="`cc-${rn}-${index}`"
        :is="getItem(item)"
        :style="getComponentStyle(item)"
        :item="item"
        :data="dataCache[item.index]"
      />
    </div>
    <div class="fix">
      <component
        v-for="(item, index) in bottom"
        :class="getComponentClass(item)"
        :key="`cc2-${rn}-${index}`"
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
import { getParams } from "commons/url.js";
import { callTqlWrapper } from "commons/req.js";
import getComponent from "commons/components.js";
  
export default {

  mixins: [mixins],
  props: [],
  data() {
    return {
      dataCache: []
    };
  },

  methods: {

    getItem: function(item) {
      return getComponent(item.tplid);
    },

    queryData: function() {

      let json = getParams();

      this.items.map( item => {

        let { index } = item;

        if(index == undefined) {
          return;
        }

        // 判断 chartBar 的取值
        if(item.chartBar) {
          json["pro_mm"] = item.chartBar[item.chartBarSel].value;
        }

        this.sendData(index, json);
      });
    },

    sendData: function(index, json) {
      
      let param = GetSendData(index, json);
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

    autoFlxHeight: function() {
      setTimeout(() => {
        let ht = $(`#flx${this.rn}`).css("height");
        console.log(`flxheight: ${ht}`)
        $(`#flx${this.rn}`).css("height", ht);
      }, 200);
    }
  },

  computed: {

    items: function() {
      return this.tdxConf.items || [];
    },

    bottom: function() {
      return this.tdxConf.bottom || [];
    },

    top: function() {
      return this.tdxConf.top || [];
    },

    itemStyle: function() {
      return this.tdxConf.itemsStyle;
    }
  },

  updated: function() {

    // this.autoFlxHeight();
    // logger.debug(`${JSON.stringify(this.dataCache[1])}`);
  },

  mounted: function() {
    this.htmlColor();
    this.autoHeight();
    this.queryData();
    // this.autoFlxHeight();
  }
}

</script>