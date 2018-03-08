// 简单线图

<style scoped>

.box {
  display: flex;
  flex-direction: column;
}

.bar-item-wrapper {
  display: flex;
}

.bar-item {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ddd;
}

</style>

<template>

<div
  :style="chartStyle"
  class="box"
>
  <mob-bar 
    v-if="item.bar"
    :item="item.bar"
    class="fix"
  />
  <div v-if="!data" class="tdx-loading flx"></div>
  <div v-else :id="`chart${rn}`" class="flx"></div>
  <div 
    class="fix bar-item-wrapper"
    v-if="item.chartBar"
  >
    <div
      v-for="(barItem, index) in item.chartBar"
      :key="`chartBar-${index}`"
      class="bar-item"
      :style="getChartBarStyle(barItem, index)"
      @click.stop.prevent="barItemClick(index)"
    >{{barItem.title}}</div>
  </div>
  <mob-split 
    v-if="item.split"
    :item="item.split"
    class="fix"
  />
</div>

</template>

<script>

import logger from "commons/logger.js";
import mixins from "commons/mixins.js";
import { hcDefConf } from "commons/chart.js";
import { getParams } from "commons/url.js";
import { callTqlWrapper } from "commons/req.js";
import { getRnHex } from "commons/random.js";

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
      require: false
    }
  },
  data() {
    return {
      barItemSel: this.item.chartBarSel,
      rn: getRnHex()
    };
  },

  methods: {

    barItemClick: function(index) {

      if(this.barItemSel == index) return;
      this.barItemSel = index;
      this.data = undefined;

      let json = getParams();
      json["pro_mm"] = this.item.chartBar[index].value;
      let param = GetSendData(this.item.index, json);
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
            data = SetDataField(data, this.item.index, this);
          }

          this.data = data;
        });
      }
    },

    getChartBarStyle: function(bar, index) {

      let { barItem } = this._size;
      let color = this._color.barItem;
      let color2, barItem2;
      if(index == this.barItemSel) {
        color2 = this._color.barItemSel;
        barItem2 = this._size.barItemSel;
      }

      return $.extend(
        {},
        barItem,
        barItem2,
        color,
        color2
      );
    },

    drawChart: function() {

      if(!this.data) return;

      let cw = $(`#chart${this.rn}`).width();
      let ch = $(`#chart${this.rn}`).height();
      let x = [], y = [];

      this.data.map( d => {
        x.push(d[this.xAxis]);
        y.push(parseFloat(d[this.yAxis]));
      });

      let conf = {

        labels: {

          items: [
            {
              html: this.data[0][this.xAxis],
              style: {
                top: `${ch - 26}`,
                left: "0"
              }
            },
            {
              html: this.data[this.data.length - 1][this.xAxis],
              style: {
                top: `${ch - 26}`,
                left: `${cw - 120}`
              }
            }
          ]
        },

        xAxis: {
          categories: x,
          labels: {
            step: this.data.length - 1
          }
        },

        series: [
          {
            data: y,
            name: this.title
          }
        ]
      };

      new Highcharts.Chart(`chart${this.rn}`, $.extend(true, {}, hcDefConf, conf));
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobChart || {};
    },

    _color: function() {
      return this.tdxColor.mobChart || {};
    },

    chartStyle: function() {
      let { chart } = this._size;
      let color = this._color.chart;
      return $.extend(
        {}, 
        chart, 
        color, 
        this.item.chart.style
      );
    },

    xAxis: function() {

      if(!this.data) return;

      let x = this.item.chart.xAxis;
      if(typeof x == "function") {
        return x(this.data);
      }
      else {
        return x;
      }
    },

    yAxis: function() {

      if(!this.data) return;
      
      let y = this.item.chart.yAxis;
      if(typeof y == "function") {
        return y(this.data);
      }
      else {
        return y;
      }
    },

    title: function() {
      if(!this.data) return;

      let { title } = this.item.chart;
      if(typeof title == "function") {
        return title(this.data);
      }
      else {
        return title;
      }
    }
  },

  mounted: function() {
    // logger.debug(`-mobChart-\n${this.data}`);
    this.drawChart();
  },

  updated: function() {
    // logger.debug(`-mobChart-\n${this.data}`);
    this.drawChart();
  }
}

</script>