<template>

  <div
    class="wdcl-tj-box"
    v-if="xgShow"
    :style="boxStyle"
  >
    <div
      class="wdcl-tj-title"
      :style="titleStyle"
    >
      已添加筛选条件 <span style="color: #ff2222; fontSize: 14px;">{{xgtj.length}}</span> 个
    </div>
    <div 
      class="wdcl-tj-items"
    >
      <div
        v-for="(tj, index) in xgtj"
        :key="'wdcl-tj-' + index"
        class="wdcl-tj-item"
        :style="tjItemStyle"
      >
        <div 
          class="wdcl-tj-del"
          @click.stop.prevent="delTj(tj)"
        ></div>
        <div>{{getTjName(tj)}}</div>
      </div>
      <div
        v-if="item.op"
        class="tdx-btn-md tdx-btn-add"
        :style="tjAddBtnStyle"
        @click.stop.prevent="tjAddBtnClick"
      >+添加条件</div>
    </div>
    <div
      v-if="item.op" 
      class="wdcl-tj-op-btns"
    >
      <div 
        class="tdx-btn-md tdx-btn-tj" 
        @click.stop.prevent="clAddClick"
        :style="btnStyle">保存方案</div>
      <div 
        class="tdx-btn-md tdx-btn-tj" 
        @click.stop.prevent="zxBtnClick"
        :style="btnStyle"
      >{{ edit ? "取消" : "添加至自选" }}</div>
    </div>

    <div
      v-if="dialogConfirm"
      class="wdcl-dialog-wrapper"
      @touchmove.stop.prevent="doNothing"
      :id="'dlg' + rn"
    >
      <div
        class="wdcl-dialog"
        :style="wdclDlgStyle"
      >
        <div 
          class="wdcl-dialog-title"
          :style="wdclDlgTitleStyle"
        >请为新方案输入名称</div>
        <div class="wdcl-dialog-content">
          <input 
            type="text" 
            class="wdcl-dialog-input"
            placeholder="请输入方案名称"
            v-model="clName"
            @focus="onInputFocus"
          >
        </div>
        <div class="wdcl-dialog-foot">
          <span
            class="wdcl-dialog-btnca"
            :style="wdclDlgBtnCaStyle"
            @click.stop.prevent="caBtnClick"
          >取消</span>
          <span
            class="wdcl-dialog-btnok"
            :style="wdclDlgBtnOkStyle"
            @click.stop.prevent="okBtnClick"
          >确定</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

/* 

  选股条件缓存格式

  ["cw00:1", "hq00:2", ...]

*/

// 从财务，市场，技术指标中获取对应的条件值
var getTjNameCw = function(left, tj) {
  
  var oZb = zb[left.substr(0, 2) + "zb"];
  var rtTj;
  for(var i = 0; i < oZb.length; i++) {
    for(var j = 0; j < oZb[i].length; j++) {
      for(var k = 0; k < oZb[i][j].length; k++) {
        var item = oZb[i][j][k];
        // 自定义指标
        if(tj.indexOf("|") >= 0) {
          var arr = tj.split(":");
          if(item.index == (arr[0] + ":")) {
            var numArr = arr[1].split("|");
            var low = numArr[0];
            var high = numArr[1];
            if(low == "#") {
              item.value = "< " + high + (item.dw || "");
            }
            else if(high == "#") {
              item.value = "> " + low + (item.dw || "");
            }
            else {
              item.value = low + "~" + high + (item.dw || "");
            }
            rtTj = item;
            break;
          }
        }
        else {

          if(item.index == tj) {
            rtTj = item;
            break;
          }
        }
      }
      if(rtTj) {
        break;
      }
    }
    if(rtTj) {
      break;
    }
  }

  // alert(JSON.stringify(rtTj));
  return rtTj;
}

var getTjNameXt = function(left, tj) {

  var oZb;
  if(left == "domain") {
    oZb = zb.sczb;
  }
  else {
    oZb = zb.xtzb;
  }

  var rtTj;
  for(var i = 0; i < oZb.length; i++) {
    for(var j = 0; j < oZb[i].length; j++) {
      if(oZb[i][j].index == tj) {
        rtTj = oZb[i][j];
        break;
      }
    }
    if(rtTj) {
      break;
    }
  }

  return rtTj;
}

return {

  data: function() {

    return {
      xgtj: [],
      edit: false,
      dialogConfirm: false,
      clName: ""
    };
  },

  methods: {

    onInputFocus: function() {

      setTimeout(function() {
        $(window).scrollTop(150);
      });
    },

    doNothing: function() {},

    caBtnClick: function() {
      this.clName = "";
      this.dialogConfirm = false;
    },

    /* 
    
      localStorage.clListObj = {
        num: 1,
        cl1: {
          title: "",
          xgtj: [xxx]
        }
      }
    
    */
    okBtnClick: function() {

      if(!this.clName || this.clName == "") {
        tdxAlert("请输入方案名称");
        return;
      }
      
      var clListObj = { num: 0 };
      try {
        clListObj = JSON.parse(localStorage.clListObj);
      }
      catch(e) {}
      
      var clid = "cl" + (++clListObj.num);
      var clObj = {
        id: clid,
        title: this.clName,
        xgtj: this.xgtj
      };

      clListObj[clid] = clObj;
      localStorage.clListObj = JSON.stringify(clListObj);
      __webCallTql.send("tdxSetTopbarTitle", { Title: this.clName }, function() {});
      this.dialogConfirm = false;
      window.location.href = "./result.html?clid=" + clid + "&color=" + tdx.getParam("color");
    },

    clAddClick: function() {
      
      if(this.xgtj.length == 0) {
        tdxAlert("请选择选股条件");
        return;
      }

      this.dialogConfirm = true;
    },

    zxBtnClick: function() {
      this.edit = !this.edit;
      this.event.$emit("mob-clxg-tj-zx", this.edit);
      this.event.$emit("mob-form-button-show", this.edit);
      this.event.$emit("mob-clxg-list-fzname", this.edit);
    },

    tjAddBtnClick: function() {

      localStorage.xgtj = JSON.stringify(this.xgtj);

      // 如果是具体的选股策略
      var clid = tdx.getParam("clid");
      if(clid) {

        var clListObj = JSON.parse(localStorage.clListObj);
        var clObj = clListObj[clid]
        __webCallTql.send("tdxOpenUrl", {
          OpenName: clObj.title,
          OpenType: "native",
          OpenUrl: "./create.html?clid=" + clid,
          OpenParam: {
            UrlType: "Relative",
            WebViewType: __tdxMobSystem == "Android" ? "JyURL" : "LocalURL"
          }
        }, function() {});
      }
      else {
        window.history.go(-1);
      }
    },

    delTj: function(tj) {
      var index = this.xgtj.indexOf(tj);
      this.xgtj.splice(index, 1);

      // 如果是在某个策略中
      var clid = tdx.getParam("clid");
      if(clid) {
        var clListObj = JSON.parse(localStorage.clListObj);
        clListObj[clid].xgtj = this.xgtj;
        localStorage.clListObj = JSON.stringify(clListObj);
      }

      this.event.$emit("mob-clxg-tj-del", this.xgtj);
      // this.$forceUpdate();
    },

    getTjName: function(tj) {

      var tjArr = tj.split(":");
      var left = tjArr[0], right = parseInt(tjArr[1]);

      // 市场
      if(left == "domain" || left.indexOf("xt") >= 0) {
        var zbDetail = getTjNameXt(left, tj);
        return zbDetail.title;
      }

      // 财务，行情，技术
      if(
        left.indexOf("cw") >= 0 
        || left.indexOf("hq") >= 0
        || left.indexOf("js") >= 0
      ) {
        var zbDetail = getTjNameCw(left, tj);
        return zbDetail.title + ":" + zbDetail.value;
      }
    },

    onWdclZbAdd: function(xgtj) {
      this.xgtj = xgtj;
    },

    tjInit: function() {
      try {

        var clid = tdx.getParam("clid");
        if(clid) {
          var clListObj = JSON.parse(localStorage.clListObj);
          this.xgtj = clListObj[clid].xgtj;
        }
        else {
          this.xgtj = JSON.parse(localStorage.xgtj);
        }

      }
      catch(e) {
        this.xgtj = [];
      }
    }
  },

  created: function() {
    this.event.$on("mob-wdcl-zb-add", this.onWdclZbAdd);
    this.event.$on("tdxActivity", this.tjInit);
    this.event.$on("mob-clxg-tj-tjzx", this.zxBtnClick);
  },

  computed: {

    xgShow: function() {

      if(this.item.op) {
        return true;
      }
      else {
        return this.xgtj && this.xgtj.length > 0;
      }
    },

    _size: function() {
      return this.tdxSize.mobClxgTj || {};
    },

    _color: function() {
      return this.tdxColor.mobClxgTj || {};
    },

    tjAddBtnStyle: function() {
      var size = this._size.tjAddBtn;
      var color = this._color.tjAddBtn;
      return $.extend({}, size, color);
    },

    titleStyle: function() {
      var size = this._size.title;
      var color = this._color.title;
      return $.extend({}, size, color);
    },

    boxStyle: function() {
      var size = this._size.box;
      var color = this._color.box;
      return $.extend({}, size, color);
    },

    tjItemStyle: function() {
      var size = this._size.tjItem;
      var color = this._color.tjItem;
      return $.extend({}, size, color);
    },

    btnStyle: function() {
      var size = this._size.btn;
      var color = this._color.btn;
      return $.extend({}, size, color);
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

  },

  mounted: function() {
    this.tjInit();
  }
}

</script>
