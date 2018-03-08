<template>

  <div
    class="wdcl-zb-box"
    id="wdcl-zb-box"
  >
    <div 
      class="wdcl-zb-detail"
      v-if="detailShow"
      :style="detailBoxStyle"
    >
      <div 
        class="wdcl-zb-detail-arrow"
        :style="zbDetailStyle"
      ></div>
      <table 
        :style="tableStyle"
      >
        <tr
          v-for="(tr, index) in zbDetail"
          :key="'zb-tr-' + index"
        >
          <td
            v-for="(td, tdIndex) in tr"
            :key="'zb-td-' + tdIndex"
          >
            <div
              class="wdcl-zb-detail-item"
              :style="getZbDetailItemStyle(td)"
              @click.stop.prevent="zbTjAdd(td)"
            >{{td.type == "zdy" ? td.text : td.value}}</div>
          </td>
        </tr>
      </table>
    </div>
    <div 
      v-if="zdyShow" 
      class="wdcl-dialog-wrapper"
      :id="'dlg' + rn"
      @touchmove.stop.prevent="doNothing"
      @click.stop.prevent="zdyTjCaBtnClick"
    >
      <div 
        class="wdcl-dialog"
        :style="wdclDlgStyle"
        @click.stop.prevent="doNothing"
      >
        <div class="wdcl-dialog-title"
          :style="wdclDlgTitleStyle">{{zdyTj.title}}</div>
        <div class="wdcl-dialog-content">
          <div class="wdcl-dialog-row">自定义区间</div>
          <div class="wdcl-dialog-row2">
            <span class="fix">大于(&gt;)</span>
            <input 
              type="text"
              class="wdcl-dialog-input2"
              v-model="zdyDataLow"
              @focus="onInputFocus"
            >
            <span class="fix">{{zdyTj.dw}}</span>
          </div>
          <div class="wdcl-dialog-row2">
            <span class="fix">小于(&lt;)</span>
            <input 
              type="text"
              class="wdcl-dialog-input2"
              v-model="zdyDataHigh"
              @focus="onInputFocus(1)"
            >
            <span class="fix">{{zdyTj.dw}}</span>
          </div>
          <div 
            class="wdcl-dialog-row wdcl-dialog-alert"
            v-if="zdyAlertInfo"
          >
            <span class="wdcl-dialog-info">提示：</span>
            <span>{{zdyAlertInfo}}</span>
          </div>
        </div>
        <div class="wdcl-dialog-foot">
          <span 
            class="wdcl-dialog-btnca"
            :style="wdclDlgBtnCaStyle"
            @click.stop.prevent="zdyTjCaBtnClick"
          >取消</span>
          <span 
            class="wdcl-dialog-btnok"
            :style="wdclDlgBtnOkStyle"
            @click.stop.prevent="zdyTjOkBtnClick"
          >确定</span>
        </div>
      </div>
    </div>
    <div 
      class="wdcl-zb-title"
      :style="titleStyle"
    >市场范围</div>
    <table :style="tableStyle">
      <tr 
        v-for="(sctr, index) in zb.sczb"
        :key="getKey('sc-tr-', index)"
      >
        <td
          v-for="(sctd, tdIndex) in sctr"
          :key="getKey('sc-td-', tdIndex)"
        >
          <div
            class="wdcl-zb-item"
            :style="getZbItemStyle(sctd)"
            @click.stop.prevent="zbTjAdd(sctd)"
          >{{sctd.title}}</div>
        </td>
      </tr>
    </table>
    <div 
      class="wdcl-zb-title"
      :style="titleStyle"
    >财务指标</div>
    <table :style="tableStyle">
      <tr
        v-for="(cwtr, index) in zb.cwzb"
        :key="getKey('cw-tr-', index)"
      >
        <td
          v-for="(cwtd, tdIndex) in cwtr"
          :key="getKey('cw-td-', tdIndex)"
        >
          <div
            class="wdcl-zb-item"
            :style="[getCwzbItemStyle(index * 20, tdIndex), getCwzbItemStyle2(cwtd)]"
            @click.stop.prevent="zbDetailShow($event, cwtd, index * 20, tdIndex)"
          >
            <span>{{cwtd[0].title}}</span>
            <span
              class="wdcl-zb-value"
              :style="zbValueStyle"
            >{{getZbValue(cwtd)}}</span>
          </div>
        </td>
      </tr>
    </table>
    <div 
      class="wdcl-zb-title"
      :style="titleStyle"
    >行情指标</div>
    <table :style="tableStyle">
      <tr
        v-for="(hqtr, index) in zb.hqzb"
        :key="getKey('hq-tr-', index)"
      >
        <td
          v-for="(hqtd, tdIndex) in hqtr"
          :key="getKey('hq-td-', tdIndex)"
        >
          <div
            class="wdcl-zb-item"
            :style="[getCwzbItemStyle(index * 20 + 400, tdIndex), getCwzbItemStyle2(hqtd)]"
            @click.stop.prevent="zbDetailShow($event, hqtd, index * 20 + 400, tdIndex)"
          >
            <span>{{hqtd[0].title}}</span>
            <span
              class="wdcl-zb-value"
              :style="zbValueStyle"
            >{{getZbValue(hqtd)}}</span>
          </div>
        </td>
      </tr>
    </table>
    <div 
      class="wdcl-zb-title"
      :style="titleStyle"
    >技术指标</div>
    <table :style="tableStyle">
      <tr
        v-for="(jstr, index) in zb.jszb"
        :key="getKey('js-tr-', index)"
      >
        <td
          v-for="(jstd, tdIndex) in jstr"
          :key="getKey('js-td-', tdIndex)"
        >
          <div
            class="wdcl-zb-item"
            :style="[getCwzbItemStyle(index * 20 + 800, tdIndex), getCwzbItemStyle2(jstd)]"
            @click.stop.prevent="zbDetailShow($event, jstd, index * 20 + 800, tdIndex)"
          >
            <span>{{jstd[0].title}}</span>
            <span
              class="wdcl-zb-value"
              :style="zbValueStyle"
            >{{getZbValue(jstd)}}</span>
          </div>
        </td>
      </tr>
    </table>
    <div 
      class="wdcl-zb-title"
      :style="titleStyle"
    >形态指标</div>
    <table :style="tableStyle">
      <tr
        v-for="(xttr, index) in zb.xtzb"
        :key="getKey('xt-tr-', index)"
      >
        <td
          v-for="(xttd, tdIndex) in xttr"
          :key="getKey('xt-td-', tdIndex)"
        >
          <div
            class="wdcl-zb-item"
            :style="getZbItemStyle(xttd)"
            @click.stop.prevent="zbTjAdd(xttd)"
          >{{xttd.title}}</div>
        </td>
      </tr>
    </table>
  </div>

</template>

<script>

var getRealOffset = function(target) {

  var offsetLeft = target.offsetLeft;
  var offsetTop = target.offsetTop;
  var current = target.offsetParent;

  while(current && current.id != "wdcl-zb-box") {
    offsetLeft += current.offsetLeft;
    offsetTop += current.offsetTop;
    current = current.offsetParent;
  }

  return {
    offsetLeft: offsetLeft,
    offsetTop: offsetTop
  };
};

return {

  data: function() {
    return {
      xgtj: [],
      detailShow: false,
      detailRows: [],
      detailIndexX: -1,
      detailIndexY: -1,
      detailTop: 0,
      zdyShow: false,
      zdyTj: "",
      zdyDataHigh: "",
      zdyDataLow: ""
    }
  },

  watch: {

  },

  methods: {

    onInputFocus: function(index) {

      setTimeout(function() {
        $(window).scrollTop(150);
      });
    },

    doNothing: function() {
      // alert(1);
    },

    zdyTjCaBtnClick: function() {
      this.zdyDataHigh = "";
      this.zdyDataLow = "";
      this.zdyShow = false;
    },

    zdyTjOkBtnClick: function() {

      if(this.zdyAlertInfo) {
        tdxAlert(this.zdyAlertInfo);
        return;
      }

      // alert(this.zdyDataLow + "|" + this.zdyDataHigh);
      if(this.zdyDataLow != "" || this.zdyDataHigh != "") {
        // alert(1);
        var low = this.zdyDataLow == "" ? "#" : this.zdyDataLow;
        var high = this.zdyDataHigh == "" ? "#" : this.zdyDataHigh;
        var tjIndex = this.zdyTj.index + low + "|" + high;
        this.doTjAdd(tjIndex);
      }

      this.zdyTjCaBtnClick();
    },

    onXgtjUpdate: function() {
      
      localStorage.xgtj = JSON.stringify(this.xgtj);
      this.event.$emit("mob-wdcl-zb-add", this.xgtj);
      this.event.$emit("mob-form-button-check", { xgtj: this.xgtj });
    },

    doTjAdd: function(tjIndex) {

      // 如果是市场
      if(tjIndex.indexOf("domain") >= 0) {

        for(var i = 0; i < this.xgtj.length; i++) {
          if(this.xgtj[i].indexOf("domain") >= 0) {
            break;
          }
        }
        if(i < this.xgtj.length) {
          this.xgtj.splice(i, 1);
        }
        this.xgtj.push(tjIndex);
      }
      // 形态
      else if(tjIndex.indexOf("xt") >= 0) {

        this.xgtj.push(tjIndex);
      }
      else {

        var tj = tjIndex.split(":")[0];
        for(var i = 0; i < this.xgtj.length; i++) {
          var tjj = this.xgtj[i].split(":")[0];
          if(tj == tjj) {
            break;
          }
        }

        if(i < this.xgtj.length) {
          this.xgtj.splice(i, 1);
        }
        
        this.xgtj.push(tjIndex);
      }

      // this.xgtj = JSON.parse(JSON.stringify(this.xgtj));
      
      this.detailShow = false;
      this.detailIndexX = -1;
      this.detailIndexY = -1;

      this.onXgtjUpdate();
    },

    hasTjSel: function(zbRows) {

      var row;
      for(var i = 0; i < this.xgtj.length; i++) {
        
        var xgtj = this.xgtj[i];
        // 自定义条件
        if(xgtj.indexOf("|") >= 0) {
          var lastRow = zbRows[zbRows.length - 1];
          if(xgtj.indexOf(lastRow.index) >= 0) {
            row = lastRow;
          }
        }
        else {
          
          for(var j = 0; j < zbRows.length; j++) {
            if(xgtj == zbRows[j].index) {
              row = zbRows[j];
              break;
            }
          }
        }

        if(row) {
          break;
        }
      }

      return row;
    },

    getZbValue: function(zbRows) {

      var row = this.hasTjSel(zbRows);
      if(row) {
        return row.value;
      }
    },

    getZbDetailItemStyle: function(tj) {
      if(this.xgtj.indexOf(tj.index) >= 0) {
        return this.zbDetailItemSelStyle;
      }
      else {
        return this.zbDetailItemStyle;
      }
    },

    getCwzbItemStyle: function(x, y) {
      // console.log("x: " + x + "|indexX: " + this.detailIndexX);
      if(!this.detailShow) return;
      if(x == this.detailIndexX) {
        return {
          marginBottom: this.detailBoxHeight + "px"
        }
      }
    },

    getCwzbItemStyle2: function(cwtd) {

      var row = this.hasTjSel(cwtd);
      if(row) {
        return this.zbItemSelStyle;
      }
      else {
        return this.zbItemStyle;
      }
    },

    zbDetailShow: function(event, zbRows, x, y) {

      var target = event.currentTarget || event.srcElement || event.target;
      var top = getRealOffset(target).offsetTop;
      console.log("top: " + top + "|clientHeight: " + target.clientHeight);
      this.detailTop = top + target.clientHeight;

      // 这个地方，如果详情弹出来了，并且点击的 x 大于 this.detailIndexX，就是说 detailTop 要重新计算
      if(x > this.detailIndexX && this.detailShow) {
        this.detailTop -= this.detailBoxHeight;
      }

      if(this.detailIndexX != x || this.detailIndexY != y) {
        this.detailShow = true;
        this.detailIndexX = x;
        this.detailIndexY = y;
        this.detailRows = zbRows;
      }
      else {
        this.detailShow = false;
        this.detailIndexX = -1;
        this.detailIndexY = -1;
      }
    },

    getZbItemStyle: function(tj) {
      var index = tj.index;
      var zbIndex = this.xgtj.indexOf(index);
      if(zbIndex >= 0) {
        return this.zbItemSelStyle;
      }
      else {
        return this.zbItemStyle;
      }
    },

    zbTjAdd: function(tj) {

      if(tj.type == "zdy") {

        this.zdyShow = true;
        this.zdyTj = tj;
        return;
      }

      var index = tj.index;
      var zbIndex = this.xgtj.indexOf(index);

      // 如果已经选中了
      if(zbIndex >= 0) {
        return;
      }

      this.doTjAdd(index);
    },

    onWdclTjDel: function(xgtj) {
      // console.log(xgtj);
      this.xgtj = xgtj;
      this.event.$emit("mob-form-button-check", { xgtj: this.xgtj });
    },

    getKey: function(pref, index) {
      return pref + index;
    },

    tjInit: function() {
      try {
        var clid = tdx.getParam("clid");
        if(clid) {
          var clListObj = JSON.parse(localStorage.clListObj);
          var clObj = clListObj[clid];
          this.xgtj = clObj.xgtj || [];
        }
        else {
          this.xgtj = JSON.parse(localStorage.xgtj) || [];
        }
      }
      catch(e) {
        this.xgtj = [];
      }
      this.event.$emit("mob-form-button-check", { xgtj: this.xgtj });
    }
  },

  created: function() {
    // console.log("created: " + typeof this.onWdclTjDel);
    this.event.$on("mob-clxg-tj-del", this.onWdclTjDel);
    this.event.$on("tdxActivity", this.tjInit);
  },
  
  computed: {

    _size: function() {
      return this.tdxSize.mobClxgZb || {};
    },

    _color: function() {
      return this.tdxColor.mobClxgZb || {};
    },

    tableStyle: function() {
      return {
        width: "100%"
      };
    },

    titleStyle: function() {
      var size = this._size.title;
      var color = this._color.title;
      return $.extend({}, size, color);
    },

    zbItemStyle: function() {
      var size = this._size.zbItem;
      var color = this._color.zbItem;
      return $.extend({}, size, color);
    },

    zbValueStyle: function() {
      var size = this._size.zbValue;
      var color = this._color.zbValue;
      return $.extend({}, size, color);
    },

    zbItemSelStyle: function() {
      var size = this._size.zbItemSel;
      var color = this._color.zbItemSel;
      return $.extend({}, size, color);
    },

    zbDetailItemStyle: function() {
      var size = this._size.zbDetailItem;
      var color = this._color.zbDetailItem;
      return $.extend({}, size, color);
    },

    zbDetailItemSelStyle: function() {
      var size = this._size.zbDetailItemSel;
      var color = this._color.zbDetailItemSel;
      return $.extend({}, size, color);
    },

    zb: function() {
      return zb || {};
    },

    // 重新计算详情指标
    zbDetail: function() {
      var zbDetail = [];
      var rows = JSON.parse(JSON.stringify(this.detailRows));
      while(rows.length > 3) {
        zbDetail.push(rows.splice(0, 3));
      }
      zbDetail.push(rows);
      return zbDetail;
    },

    // 根据指标 detail 的长度，来计算高度
    detailBoxHeight: function() {
      var metaHeight = 45;
      if(this.zbDetail.length == 1) {
        return 55;
      }
      
      return metaHeight * this.zbDetail.length;
    },   

    zbDetailStyle: function() {
      var size = this._size.detailArrow;
      var color = this._color.detailArrow;
      var index = this.detailIndexY;
      var o = {};
      // o.top = this.detailTop;
      if(index == 0) {
        o.backgroundPosition = "15%";
      }
      else if(index == 2) {
        o.backgroundPosition = "85%";
      }

      return $.extend({}, size, color, o);
    },

    detailBoxStyle: function() {
      var size = this._size.detailBox;
      var color = this._color.detailBox;
      return $.extend({}, size, color, { top: this.detailTop + "px" });
    },

    wdclDlgStyle: function() {
      var size = this._size.wdclDlg;
      var color = this._color.wdclDlg;
      return $.extend({}, size, color);
    },

    wdclDlgTitleStyle: function() {
      var size = this._size.wdclDlgTitle;
      var color = this._color.wdclDlgTitle;
      return $.extend({}, size, color);
    },

    wdclDlgBtnCaStyle: function() {
      var size = this._size.wdclDlgBtnCa;
      var color = this._color.wdclDlgBtnCa;
      return $.extend({}, size, color);
    },

    wdclDlgBtnOkStyle: function() {
      var size = this._size.wdclDlgBtnOk;
      var color = this._color.wdclDlgBtnOk;
      return $.extend({}, size, color);
    },

    zdyAlertInfo: function() {
      
      var reg = /^-?[1-9]\d*\.?\d{0,2}$/;  // x > 1 || x < -1
      var reg2 = /^-?0\.\d{0,2}$/; // -1 < x < 1 && x != 0
      var reg3 = /^-?0$/; // x == 0
      var numInfo = "请输入数字，最多2位小数";
      var cpInfo = "区间上限数值需大于区间下限数值";

      // 下限值格式判断
      if( this.zdyDataLow != "" && !(!!reg.test(this.zdyDataLow) || !!reg2.test(this.zdyDataLow) || !!reg3.test(this.zdyDataLow) )) {
        return numInfo;
      }

      // 上限值格式判断
      if( this.zdyDataHigh != "" && !(!!reg.test(this.zdyDataHigh) || !!reg2.test(this.zdyDataHigh) || !!reg3.test(this.zdyDataHigh) )) {
        return numInfo;
      }

      // 大小比较
      var low = parseFloat(this.zdyDataLow);
      var high = parseFloat(this.zdyDataHigh);
      if(low > high) {
        return cpInfo;
      }

      return "";
    }
  },

  mounted: function() {
    this.tjInit();
  }
}

</script>
