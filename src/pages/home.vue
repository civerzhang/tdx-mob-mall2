<style scoped>

</style>

<template>
  
  <div 
    class="app" 
    :id="`app${rn}`"
  >
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

</template>

<script>

import mixins from "commons/mixins.js";
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
      
      let param = GetSendData(index, {});
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
    }
  },

  computed: {

    items: function() {
      return this.tdxConf.items || [];
    }
  },

  mounted: function() {
    this.htmlColor();
    this.autoHeight();
    this.queryData();
  }
}

</script>