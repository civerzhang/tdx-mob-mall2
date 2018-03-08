// 饼图

<style scoped>

.chart {
  display: flex;
}

.chart-left {
  flex: 0 0 50%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}

.chart-right {
  flex: 1 1 auto;
}

.rect {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
}

.row-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  line-height: 26px;
  color: #333;
}

</style>

<template>

<div>
  <mob-bar 
    v-if="item.bar"
    :item="item.bar"
  />
  <div 
    class="chart"
    :style="chartStyle"
  >
    <div class="chart-right" :id="`chart${rn}`"></div>
    <div class="chart-left">
      <div
        v-for="(c, index) in item.chart.cc"
        :key="`chart-c-${index}`"
        class="row-info"
      >
        <div>
          <span
            class="rect"
            :style="getRectStyle(c)"
          ></span>
          <span
            class="title"
            :style="nameStyle"
          >{{c.name}}</span>
        </div>
        <span
          :style="valueStyle"
        >{{getFieldValue(data, c.field, c)}}</span>
      </div>
    </div>
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
import { defChartConf } from "commons/chart.js";

import mobSplit from "components/mob-split.vue";
import mobBar from "components/mob-bar.vue";
  
export default {

  mixins: [mixins],
  components: {
    mobSplit,
    mobBar
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
    return {};
  },

  methods: {

    getRectStyle: function(cc) {
      return {
        backgroundColor: cc.color
      };
    },

    drawChart: function() {

      if(!this.data) return;

      let { cc } = this.item.chart;
      let seriesY = {
        type: "pie",
        innerSize: this.item.chart.innerSize,
        name: this.item.chart.name,
        data: []
      };
      cc.map( c => {
        seriesY.data.push({
          name: c.name,
          y: parseFloat(this.data[c.field]),
          color: c.color
        });
      });

      let conf = {
        title: {
          floating: true,
          text: this.item.chart.title
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false
            }
          }
        },
        series: [seriesY]
      };

      new Highcharts.Chart(
        `chart${this.rn}`, 
        $.extend(true, {}, defChartConf, conf),
        function(c) {
          // 环形图圆心
          var centerY = c.series[0].center[1],
              titleHeight = parseInt(c.title.styles.fontSize);
          c.setTitle({
              y:centerY + titleHeight/2
          });
        }
      );
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobChartPie || {};
    },

    _color: function() {
      return this.tdxColor.mobChartPie || {};
    },

    chartStyle: function() {
      let { chart } = this._size;
      let color = this._color.chart;
      return $.extend({}, chart, color, this.item.chart.style);
    },

    nameStyle: function() {
      let { name } = this._size;
      let color = this._color.name;
      return $.extend({}, name, color);
    },

    valueStyle: function() {
      let { value } = this._size;
      let color = this._color.value;
      return $.extend({}, value, color);
    },
  },

  mounted: function() {
    this.drawChart();
  },

  updated: function() {
    this.drawChart();
  }
}

</script>