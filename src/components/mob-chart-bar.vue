// 柱状图

<style scoped>

.chart {
  display: flex;
  flex-direction: column;
}

</style>

<template>

  <div
    class="chart"
    v-if="data"
    :style="chartStyle"
  >
    <mob-bar 
      v-if="item.bar"
      :item="item.bar"
      class="fix"
    />
    <div
      v-if="!data"
      class="tdx-loading flx"
    ></div>
    <div
      v-else
      :id="`chart${rn}`"
      class="flx"
    ></div>
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
import { getRnHex } from "commons/random.js";
import { hcDefConf2 } from "commons/chart.js";

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
      rn: getRnHex()
    };
  },

  methods: {

    drawChart: function() {

      if(!this.data) return;

      let xLine;
      let sLine;
      if(this.line) {
        xLine = [];
        sLine = {
          name: this.line.title,
          type: "line",
          yAxis: 1,
          data: []
        }
        this.data.map( row => {
          xLine.push(row[this.line.xAxis]);
          sLine.data.push(parseFloat(row[this.line.yAxis]));
        });
      }

      let xColumn;
      let sColumn;
      if(this.column) {
        xColumn = [];
        sColumn = [];
        this.column.yAxis.map( (field, index) => {
          xColumn[index] = [];
          sColumn[index] = {
            tooltip: {
              valueSuffix: "%"
            },
            name: this.column.title[index],
            data: []
          };
          this.data.map( row => {
            xColumn[index].push(row[this.column.xAxis]);
            sColumn[index].data.push(parseFloat(row[this.column.yAxis[index]]) || 0);
          });
        });
      }

      let series = [];
      if(sLine) {
        series = [sLine];
      }
      if(sColumn) {
        series = [...series, ...sColumn];
      }

      let conf = {

        chart: {
          type: "column"
        },
        xAxis: {
          categories: xLine || (xColumn && xColumn[0]),
          labels: {
            enabled: true,
            align: "center"
          }
        },
        yAxis: [
          {
            tickAmount: 5,
            labels: {
              formatter: function() {
                return `${this.value}%`;
              }
            }
          },
          {
            tickAmount: 5,
            labels: {
              formatter: function() {
                return `${(this.value / 100000000).toFixed(1)}亿`;
              }
            }
          }
        ],
        series
      };

      new Highcharts.Chart(`chart${this.rn}`, $.extend(true, {}, hcDefConf2, conf));
    }
  },

  computed: {

    line: function() {
      return this.item.chart && this.item.chart.line;
    },

    column: function() {
      return this.item.chart && this.item.chart.column;
    },

    _size: function() {
      return this.tdxSize.mobChartBar || {};
    },

    _color: function() {
      return this.tdxColor.mobChartBar || {};
    },

    chartStyle: function() {
      let { chart } = this._size;
      let color = this._color.chart;
      return $.extend({}, chart, color, this.item.chart.style);
    }
  },

  mounted: function() {
    this.drawChart();
  },

  updated: function() {
    this.drawChart();
  }
}

</script>