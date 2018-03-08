<style scoped>

.query {
  display: flex;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #ddd;
}

.query-col {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
}

.query-date-input {
  border: 0;
  width: 80px;
  color: #161616;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
}

.query-date-exchange {
  flex-shrink: 0;
  background: url(../res/date-exchange.png) center center no-repeat;
  background-size: 100% 100%;
  height: 28px;
  width: 28px;
}

.query-info {
  color: #848484;
  font-size: 12px;
  line-height: 20px;
}

</style>

<template>

<div>
  <div 
    class="query"
    :style="boxStyle"
  >
    <div class="query-col">
      <span 
        class="query-info"
        :style="nameStyle"  
      >起始日期</span>
      <input 
        type="text" 
        class="query-date-input" 
        :id="`sdate${rn}`"
        :style="dateStyle"
      >
    </div>
    <div 
      class="query-date-exchange"
      :style="imageStyle"
    ></div>
    <div class="query-col">
      <span 
        class="query-info"
        :style="nameStyle"
      >结束日期</span>
      <input 
        type="text" 
        class="query-date-input" 
        :id="`edate${rn}`"
        :style="dateStyle"
      >
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
import {
  getDateStringByDay,
  getDateStringByMonth,
  getSpanDay
} from "commons/date.js";
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
      sdate: "",
      edate: ""
    };
  },

  methods: {

    initDate: function() {

      let conf = {
        "theme": "android-ics light",
        "display": "modal",
        "mode": "scroller",
        "dateOrder": "yymmdd",
        "dateFormat": "yymmdd",
        "lang": "zh",
        "setText": "确定",
        "cancelText": "取消",
        "minDate": new Date(1990, 0, 1),
        "maxDate": new Date((new Date()).getFullYear() + 20, 11, 31),
        "onSelect": this.onSdateChange
      };

      let d1 = $(`#sdate${this.rn}`).mobiscroll().date(conf);
      conf.onSelect = this.onEdateChange;
      let d2 = $(`#edate${this.rn}`).mobiscroll().date(conf);

      if(this.item && this.item.direction) {

        let dateS, dateE;
        dateS = this.now;
        switch(this.item.query[0]) {
          case 0:
            dateE = this.days71;
            break;
          case 1:
            dateE = this.months11;
            break;
          case 2:
            dateE = this.months31;
            break;
          case 3:
            dateE = this.now;
            break;
        }

        $(`#sdate${this.rn}`).val(dateS);
        $(`#edate${this.rn}`).val(dateE);
        this.sdate = dateS;
        this.edate = dateE;        
      }
      else {

        let dateS, dateE;
        dateE = this.now;
        switch(this.item.query[0]) {
          case 0:
            dateS = this.days7;
            break;
          case 1:
            dateS = this.months1;
            break;
          case 2:
            dateS = this.months3;
            break;
          case 3:
            dateS = this.now;
            break;
        }

        $(`#sdate${this.rn}`).val(dateS);
        $(`#edate${this.rn}`).val(dateE);
        this.sdate = dateS;
        this.edate = dateE;
      }
    },

    onSdateChange: function(valueText, inst) {
      if(this.sdate != valueText) {
        this.sdate = valueText;
        event.$emit("mob-query-date-change", { sdate: this.sdate, edate: this.edate });
      }
    },

    onEdateChange: function(valueText, inst) {
      if(this.edate != valueText) {
        this.edate = valueText;
        event.$emit("mob-query-date-change", { sdate: this.sdate, edate: this.edate });
      }
    }
  },
  computed: {

    days7: function() {
      return getDateStringByDay(-7);
    },
    days71: function() {
      return getDateStringByDay(7);
    },
    now: function() {
      return getDateStringByDay(0);
    },
    months1: function() {
      return getDateStringByMonth(-1);
    },
    months11: function() {
      return getDateStringByMonth(1);
    },
    months3: function() {
      return getDateStringByMonth(-3);
    },
    months31: function() {
      return getDateStringByMonth(3);
    },

    _size: function() {
      return this.tdxSize.mobQueryDate || {};
    },

    _color: function() {
      return this.tdxColor.mobQueryDate || {};
    },

    boxStyle: function() {

      let { box } = this._size;
      let color = this._color.box;
      return $.extend({}, box, color, this.item.style);
    },

    nameStyle: function() {

      let { name } = this._size;
      let color = this._color.name;
      return $.extend({}, name, color);
    },

    dateStyle: function() {

      let { date } = this._size;
      let color = this._color.date;
      return $.extend({}, date, color);
    },

    imageStyle: function() {

      let { image } = this._size;
      let color = this._color.image;
      return $.extend({}, image, color);
    }
  },

  mounted: function() {
    this.initDate();
  }
}

</script>