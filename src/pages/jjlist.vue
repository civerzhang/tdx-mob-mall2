<style scoped>

</style>

<template>
  
  <div 
    class="app" 
    :id="`app${rn}`"
  >
    <component 
      class="fix"
      :is="getItem(item.top.tplid)"
      :item="item.top"
    />
    <component 
      class="flx"
      :is="getItem(item.body.tplid)"
      :item="listItem"
      :data="rows"
      :loading="loading"
      :hasNextPage="hasNextPage"
    />
    <component 
      class="fix"
      v-if="showItem(item.foot)"
      :is="getItem(item.foot.tplid)"
      :item="item.foot"
    />
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
const tdxConf = getConf();
  
export default {

  mixins: [mixins],
  props: [],
  data() {
    return {
      queryParam: getDefQueryParam(tdxConf),
      rows: undefined,
      laoding: false,
      hasNextPage: true
    };
  },

  methods: {

    onQueryNextPage: function() {
      
      this.queryParam["@POS"] = parseInt(this.queryParam["@POS"]) + parseInt(this.listItem.pageSize || 20);
      this.queryData(1);
    },

    queryData: function(page) {

      let param = GetSendData(0, this.queryParam);
      if(param[0]) {
        
        this.loading = true;
        this.hasNextPage = false;
        callTqlWrapper(param[0], param[1], data => {

          this.loading = false;
          if(param[1].valueOfJson()[0].F19471 != 1) {
            data = FormatResult(data);
            if(data.ErrorCode != 0) {
              tdxAlert(data.ErrorInfo);
              return;
            }
          }

          if(typeof SetDataField == "function") {
            data = SetDataField(data, 0, this);
          }
          
          if(data.length < (this.listItem.pageSize || 20)) {
            this.hasNextPage = false;
          }
          else {
            this.hasNextPage = true;
          }
          
          if(page) {
            this.rows = [...this.rows, ...data];
          }
          else {
            this.rows = data;
          }
        });
      }
    },

    getItem: function(tplid) {
      return getComponent(tplid);
    },

    onBarItemClick: function(param) {

      // 清空数据，重新查询
      this.rows = undefined;

      if(typeof this.item.sortClick == "function") {
        this.queryParam = this.item.sortClick(param, this.queryParam);
      }

      event.$emit("mob-list-page-to-top");
      this.$nextTick(() => { this.queryData() });
    },

    showItem: function(item) {

      if(typeof item.toggleShow == "function") {
        return item.toggleShow(this.queryParam);
      }
      else {
        return item.toggleShow || true;
      }
    }

  },

  computed: {

    item: function() {
      return this.tdxConf || {};
    },

    listItem: function() {

      let item = this.item.body;
      if(typeof item.getCols == "function") {
        item.cols = item.getCols(this.queryParam);
      }

      item.queryParam = this.queryParam;
      return $.extend({}, item);
    }
  },

  created: function() {
    event.$on("mob-bar-tab-item-click", this.onBarItemClick);
    event.$on("mob-list-page-sort-click", this.onBarItemClick);
    event.$on("mob-list-page-nextpage", this.onQueryNextPage);
  },

  updated: function() {

  },

  mounted: function() {
    this.htmlColor();
    this.autoHeight();
    this.queryData();
  }
}

</script>