/*
  这里定义 Vue 组件的一些 mixin 操作
*/
import { getRnHex } from "commons/random.js";
import { getFieldColor } from "commons/color.js";             // 颜色
import { getFontSize } from "commons/font-size.js";           // 大小
import { getConf } from "commons/transconf.js";               // 配置
import { getValue } from "commons/transvalue.js";       // 内容
import { color } from "commons/url.js";
import event from "commons/event.js";

export default {

  methods: {

    /*
      获取字段的 style 样式

      1. 字段颜色
      2. 字段对齐
      3. 字段宽度

      @param { Object } row 行记录
      @param { String } field 字段内容
      @param { Object } col 列记录配置（列表查询时用到）
      @param { Number } type 是弹出框的样式，
                          空|0 - 详情弹出框，
                          1 - 普通列表，
                          2 - 持仓列表,
                          3 - 资金股份资金区域
      @param { Number } fieldRow 列表记录中的第几行 1 - 第0行，2 - 第1行
    */
    getFieldStyle: function(row, field, col, type, fieldRow) {

      let color = getFieldColor(row, field, type, fieldRow);
      let fontSize = getFontSize(row, field, col && col.width, type, fieldRow);
      let align = col && col.align;
      let width = col && col.width;

      let obj = {};
      if(color) {
        obj.color = color;
      }
      if(width) {
        obj.width = `${width}px`;
        obj.minWidth = `${width}px`;
      }
      if(align) {
        obj.textAlign = align;
      }
      if(fontSize) {
        obj.fontSize = `${fontSize}px`;
      }

      return obj;
            
    },

    /*
      获取字段的内容
      
      @param { Object } row 行记录
      @param { String } field 字段id
      @param { Object } col 字段配置
    */
    getFieldValue: function(row, field, col) {
      return getValue(row, field, col);
    },

    /*
      获取字段颜色
    */
    getFieldColor: function(row, field, type) {
      return getFieldColor(row, field, type);
    },

    /*
      计算界面高度
    */
    autoHeight: function() {
      
      let { body } = this.tdxSize || {};
      let bh = parseInt(body && body.margin) || 0;

      // 兼容 ios 下拉刷新，高度不对的情形
      setTimeout(() => {
        let wht = $(window).height() - bh * 2;
        $(`#app${this.rn}`).css("height", wht);
        this.$nextTick( () => {
          event.$emit("window-resize");
        });
      }, 500);
    },

    // 处理总体背景颜色
    htmlColor: function() {

      let { html, body } = this.tdxSize;
      let color = this.tdxColor.html;
      let color2 = this.tdxColor.body;
      $("html").css($.extend({}, html, color));
      $("body").css($.extend({}, body, color2));
    },

    getComponentClass: function(item) {
      return item.flx ? "flx" : "fix";
    },

    getComponentStyle: function(item) {
      return item.style;
    }

  },

  computed: {

    noDataInfo: function() {
      return "暂无查询数据!";
    },

    rn: function() {
      return getRnHex();
    },

    skin: function() {
      return color || "white";
    },

    // 组件配置
    tdxConf: function() {
      return getConf();
    },

    // 颜色配置
    tdxColor: function() {
      return window[`tdx_color_${this.skin}`] || window["tdx_color"] || {};
    },

    // 大小配置
    tdxSize: function() {
      return window["tdx_size"] || {};
    },

    event: function() {
      return event;
    },

    // 加载效果
    tdxLoadingStyle: function() {
      let { tdxLoading } = this.tdxSize;
      let color = this.tdxColor.tdxLoading;
      return $.extend({}, tdxLoading, color);
    },

    // 无数据样式
    tdxNoDataStyle: function() {
      let { tdxNoData } = this.tdxSize;
      let color = this.tdxColor.tdxNoData;
      return $.extend({}, tdxNoData, color);
    }
  }
};