// 列表组件，带分页
<style scoped>

.list {
  height: 100%;
}

.head {
  border-bottom: 1px solid #ddd;
}

.head-col {
  display: flex;
  align-items: center;
}

.body-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tr {
  border-bottom: 1px solid #ddd;
}

</style>

<template>

<div>
  <div
    class="app list"
    :id="`app${rn}`"
  >
    <table
      style="width: 100%"
      class="fix head"
      :style="headStyle"
    >
      <tr>
        <td
          v-for="(col, index) in item.cols"
          :key="`head-col-${index}`"
          :style="getTdStyle(col)"
          @click.stop.prevent="headColClick(col)"
        >
          <div
            :style="getHeadColStyle(col)"
            class="head-col"
          >
            <span>{{col.title}}</span>
            <span :class="getSortClass(col)"></span>
          </div>
        </td>
      </tr>
    </table>
    <div v-if="!data" class="tdx-loading"></div>
    <div v-else-if="data.length == 0" class="tdx-nodata">暂无查询数据!</div>
    <div
      class="flx"
      v-else
      :id="`body${rn}`"
      @scroll="onScroll"
    >
      <table 
        style="width: 100%"
        :style="bodyStyle"
        cellspacing="0"
      >
        <tr
          v-for="(row, rowIndex) in data"
          :key="`row-tr-${rowIndex}`"
          @click.stop.prevent="trClick(row)"
        >
          <td
            v-for="(col, colIndex) in item.cols"
            :key="`row-${rowIndex}-td-${colIndex}`"
            :style="[getTdStyle(col), trStyle]"
            class="tr"
          >
            <div
              :style="getBodyColStyle(col)"
              class="body-col"
            >
              <span
                :style="getTd0Style(row, col)"
              >{{getFieldValue(row, col.field, col)}}</span>
              <span 
                v-if="col.subField"
                :style="getTd1Style(row, col)"
              >{{getFieldValue(row, col.subField, col)}}</span>
            </div>
          </td>
        </tr>
        <tr v-if="loading">
          <td :colspan="item.cols.length" class="tdx-loading"></td>
        </tr>
        <tr v-else-if="!hasNextPage">
          <td 
            :colspan="item.cols.length" 
            style="text-align: center;line-height: 40px;"
          >没有数据了!</td>
        </tr>
      </table>
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
import event from "commons/event.js";
import { getColStyleLine, getColStyleColumn } from "commons/list.js";
import { __webCallTqlWrapper } from "commons/req.js";

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
    },
    loading: {
      require: false
    },
    hasNextPage: {
      require: false
    }
  },
  data() {
    return {};
  },

  methods: {

    trClick: function(rowdata) {

      if(this.item.urlParam) {
        __webCallTqlWrapper("tdxOpenUrl", this.item.urlParam, () => {}, rowdata);
      }
    },

    onScroll: function() {

      if(this.loading || !this.hasNextPage) return;

      console.log("page");

      let el = document.getElementById(`body${this.rn}`);
      let top = el.scrollTop;
      let h = $(`#body${this.rn}`).height();
      let sh = el.scrollHeight;

      if(top + h > sh - 40) {
        logger.debug(`-----------------page------------------`);
        this.loading = true;
        event.$emit("mob-list-page-nextpage");
      }
    },

    getTd0Style: function(row, col) {
      let fieldColor = this.getFieldColor(row, col.field, 1);
      let { td0 } = this._size;
      let color = this._color.td0;
      return $.extend(
        {},
        td0,
        color,
        { color: fieldColor },
        col.style
      );
    },

    getTd1Style: function(row, col) {
      let fieldColor = this.getFieldColor(row, col.subField, 1);
      let { td1 } = this._size;
      let color = this._color.td1;
      return $.extend(
        {},
        td1,
        color,
        { color: fieldColor },
        col.style
      );
    },

    getTdStyle: function(col) {

      if(col && col.width) {

        col.width = col.width.indexOf("px") >= 0 ? `${col.width}px` : col.width;
        return {
          width: col.width
        };
      }

    },

    getBodyColStyle: function(col) {
      let colStyle = getColStyleColumn(col);
      let { bodyCol } = this._size;
      let color = this._color.bodyCol;
      return $.extend({}, bodyCol, color, colStyle);
    },

    getHeadColStyle: function(col) {
      
      let colStyle = getColStyleLine(col);
      let { headCol } = this._size;
      let color = this._color.headCol;
      return $.extend({}, headCol, color, colStyle);
    },

    headColClick: function(col) {

      if(!col.sort) return;

      this.listToTop();

      let param = {};
      let footField = this.queryParam["foot_field"];
      let sortField = this.queryParam["sortField"] || footField;
      let sortType = this.queryParam["sortType"] || "2";
      
      if(col.field != sortField) {
        sortType = "2";
        sortField = col.field;
      }
      else {
        sortType = sortType == "2" ? "1" : "2";
      }

      event.$emit("mob-list-page-sort-click", { sortType, sortField });
    },

    listToTop: function() {

      // 重新查询数据，回到顶部
      let el = document.getElementById(`body${this.rn}`);
      if(el) {
        el.scrollTop = 0;
      }
    },

    getSortClass: function(col) {

      let footField = this.queryParam["foot_field"];
      let sortField = this.queryParam["sortField"] || footField;
      let sortType = this.queryParam["sortType"] || "2";

      if(!col.sort || col.field != sortField) {
        return;
      }

      if(sortType == 2) {
        return "sort-desc";
      }
      else {
        return "sort-asc";
      }
    },

    // 做个定时器，保证其他组件渲染完成，然后获得列表父组件的实际高度
    timerAutoHeight: function() {

      let $el = $(`#list${this.rn}`);
      $el.css("height", $el.parent().height());
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobListPage || {};
    },

    _color: function() {
      return this.tdxColor.mobListPage || {};
    },

    queryParam: function() {
      return this.item.queryParam || {};
    },

    headStyle: function() {
      let { head } = this._size;
      let color = this._color.head;
      return $.extend({}, head, color);
    },

    bodyStyle: function() {
      let { body } = this._size;
      let color = this._color.body;
      return $.extend({}, body, color);
    },

    trStyle: function() {

      if(this._color.bodyCol && this._color.bodyCol.borderColor) {
        return {
          borderColor: this._color.bodyCol.borderColor
        }
      }
    }
  },

  created: function() {

    // 切换的时候，表格到最顶部
    event.$on("mob-list-page-to-top", this.listToTop);
  },

  updated: function() {
    setTimeout(this.timerAutoHeight, 500);
  },

  mounted: function() {
    if(this.item.simpleList) {
      this.autoHeight();
    }
  }
}

</script>