<template>

  <div 
    :id="'app' + rn"
    class="wdcl-list"
  >
    <div 
      class="fix wdcl-list-info"
      :style="infoStyle"
    >
      <div>
        入选个股(
        <span
          :style="codeNumStyle"
        >{{count}}</span>只)
      </div>
      <div 
        v-if="fzName && fzNameShow"
        class="wdcl-list-zxg"
        :style="zxgStyle"
        @click.stop.prevent="fzShowClick"
      >{{fzName}}</div>
    </div>
    <div 
      class="fix wdcl-list-head"
      :style="listHeadStyle"
    >
      <div 
        class="wdcl-list-head-col0"
        :style="listBodyStyle"
      >
        <div 
          class="wdcl-list-check"
          :style="allCkStyle"
          v-if="hasCheck"
          @click.stop.prevent="allCheckClick"
        ></div>
        <div
          class="wdcl-list-col"
          :style="colStyle"
        >股票简称</div>
      </div>
      <div 
        class="wdcl-list-head-col1"
        :id="'headcol1' + rn"
      >
        <div
          class="wdcl-list-col"
          :style="colStyle"
          v-for="(col, index) in cols2"
          :key="'head-col-' + index"
        >{{col.title}}</div>
      </div>
    </div>
    <div
      v-if="loading && rows.length == 0"
      class="tdx-loading"
    ></div>
    <div
      v-else-if="rows.length == 0"
      class="tdx-nodata"
    >暂无查询数据!</div>
    <div
      v-else
      class="flx wdcl-list-body"
      :style="listBodyStyle"
      :id="'listbody' + rn"
      @scroll.prevent.stop="onListBodyScroll"
    >
      <div 
        class="wdcl-list-body-col0"
        :id="'bodycol0' + rn"
      >
        <div
          v-for="(row, index) in rows"
          :key="'row-col0-' + index"
          class="wdcl-list-row"
          :style="listRowStyle"
          @click.stop.prevent="rowClick(index)"
        >
          <div
            class="wdcl-list-check"
            v-if="hasCheck"
            :style="getCkStyle(index)"
            @click.stop.prevent="checkClick(index)"
          ></div>
          <div
            class="wdcl-list-col"
            :style="colStyle"
          >
            <span>{{row.name}}</span>
            <span 
              class="wdcl-list-code"
              :style="listCodeStyle"
            >{{row.code}}</span>
          </div>
        </div>
      </div>
      <div 
        class="wdcl-list-body-col1"
        :id="'bodycol1' + rn"
        @scroll="bodyCol1Scroll"
      >
        <div
          v-for="(row, index) in rows"
          :key="'row-col1-' + index"
          class="wdcl-list-row wdcl-list-row2"
          :style="listRowStyle"
          @click.stop.prevent="rowClick(index)"
        >
          <div
            v-for="(col, colIndex) in cols2"
            :key="'row-col-' + colIndex"
            class="wdcl-list-col"
            :style="colStyle"
          >{{getFieldValue(row, col.field, col)}}</div>
        </div>
      </div>
    </div>
    <div
      class="wdcl-dialog-wrapper"
      v-if="fzShow"
      @click.stop.prevent="fzClose"
      @touchmove.stop.prevent="doNothing"
    >
      <div 
        class="wdcl-dialog"
        :style="dialogStyle"
      >
        <div 
          class="wdcl-dialog-title"
          :style="dialogTitleStyle"
        >我的自选分组</div>
        <div class="wdcl-dialog-content">
          <div
            v-for="(fz, fzIndex) in fzList"
            :key="'fz-' + fzIndex"
            class="wdcl-fz-item"
            @click.stop.prevent="fzChooseClick(fzIndex)"
          >
            <div 
              class="wdcl-fz-check"
              :style="getFzCheckStyle(fzIndex)"
            ></div>
            <div
              :style="getFzCheckTextStyle(fzIndex)"
            >{{fz.Name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

// 市场
function getDomainTjCol(tj) {
  return {
    title: "市场",
    field: "setCodeName",
    type: 0
  };
}

// 财务，行情，技术
function getCCTjCol(cc, tj) {
  var arr = tj.split(":");
  var left = parseInt(arr[0].substr(2));
  var right = parseInt(arr[1]);
  var i = parseInt(left / 3);
  var j = left % 3;

  var col;
  // 自定义条件
  if(arr[1].indexOf("|") >= 0) {
    col = cc[i][j][cc[i][j].length - 1];
  }
  else {
    col = cc[i][j][right];
  }

  return {
    title: col.subTitle || col.title,
    field: col.index.split(":")[0],
    format: col.format,
    value: col.value,
    type: arr[0].indexOf("js") >= 0 ? 2 : 1
  }
}

// 形态
function getXtTjCol(tj) {

  var left = parseInt(tj.split(":")[0].substr(2));
  var i = parseInt(left / 3);
  var j = left % 3;
  var cc = zb.xtzb;

  return {
    title: cc[i][j].title,
    value: "是",
    field: "xt",
    type: 3
  }
}

/* 
  通过条件获取列配置

  tj: "cw00:1"

  {
    title: "",
    field: "",
    format: ""
  }
*/
function getTjCol(tj) {

  if(tj.indexOf("domain") >= 0) {
    return getDomainTjCol(tj);
  }
  else if(tj.indexOf("cw") >= 0) {
    return getCCTjCol(zb.cwzb, tj);
  }
  else if(tj.indexOf("hq") >= 0) {
    return getCCTjCol(zb.hqzb, tj);
  }
  else if(tj.indexOf("js") >= 0) {
    return getCCTjCol(zb.jszb, tj);
  }
  else if(tj.indexOf("xt") >= 0) {
    return getXtTjCol(tj);
  }
}

return {
  
  data: function() {
    return {
      count: 0,
      allCheck: false,
      ckList: [],
      xgtj: [],
      rows: [],
      page: 1,
      pagesize: 20,
      hasNextPage: true,
      loading: true,
      hasCheck: false,
      fzShow: false,
      originFzList: [],
      fzSel: 0,
      fzNameShow: false
    }
  },

  created: function() {
    this.event.$on("mob-clxg-tj-del", this.initTj);
    this.event.$on("mob-clxg-tj-zx", this.showCheck);
    this.event.$on("mob-clxg-list-fzname", this.onFzNameShow);
  },

  mounted: function() {
    this.initTj();
    this.getFzList();
  },

  updated: function() {
    this.autoListHeight();
  },

  methods: {

    doNothing: function() {},

    rowClick: function(index) {

      if(this.hasCheck) {
        this.checkClick(index);
        return;
      }

      var rowIndex, stkRows = [];
      var count = 20, len = this.rows.length;
      if(this.rows.length <= count) {
        rowIndex = index;
        stkRows = this.rows;
      }
      else if(index + count <= this.rows.length) {
        rowIndex = 0;
        stkRows = this.rows.slice(index, index + count);
      }
      else {
        var start = len - count;
        stkRows = this.rows.slice(start, start + count);
        rowIndex = index - start;
      }

      // console.log("rowIndex: " + rowIndex);
      stkRows = stkRows.map(function(row) {
        return [row.setcode, row.code];
      });
      // console.log(stkRows);
      localStorage.notFresh = 1;
      __webCallTql.send("tdxOpenNativeModule", {
        OpenID: "HQGG2",
        OpenParam: {
          "Index": rowIndex,
          "StkInfo": stkRows
        }
      }, function() {});
    },

    onFzNameShow: function(show) {
      this.fzNameShow = show;
      this.event.$emit("mob-form-button-check", { fz: this.fzList[this.fzSel] });
    },

    fzClose: function() {
      this.fzShow = false;
    },

    fzChooseClick: function(index) {
      if(index != this.fzSel) {
        this.fzSel = index;
        this.event.$emit("mob-form-button-check", { fz: this.fzList[index] });
      }
      this.fzShow = false;
    },

    getFzCheckStyle: function(index) {
      return this.fzSel == index ? this.fzCheckStyle : this.fzUncheckStyle;
    },
    
    getFzCheckTextStyle: function(index) {
      return this.fzSel == index ? this.fzCheckTextStyle : this.fzUncheckTextStyle;
    },

    getFzList: function() {

      var self = this;
      __webCallTql.send("tdxGetZxgFzInfo", {}, function(data) {

        data = FormatResult(data);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        try {
          var result = data.rows && data.rows[0].RESULT;
          if(typeof result == "string") {
            result = JSON.parse(result);
          }
        }
        catch(e) {
          alert(e);
        }

        self.originFzList = result.tdxZxgFz;
        self.fzSel = result.CurNo;
      });
    },

    fzShowClick: function() {
      this.fzShow = true;
    },

    checkClick: function(index) {
      this.$set(this.ckList, index, !this.ckList[index]);
      var flag = true;
      for(var i = 0; i < this.rows.length; i++) {
        if(!this.ckList[i]) {
          flag = false;
          break;
        }
      }
      this.allCheck = flag;
      this.event.$emit("mob-form-button-check", { ckList: this.ckList });
    },

    allCheckClick: function() {
      var self = this;
      self.allCheck = !self.allCheck;
      var ckList = [];
      self.rows.map(function(row, index) {
        ckList.push(self.allCheck);
      });
      self.ckList = ckList;
      self.event.$emit("mob-form-button-check", { ckList: this.ckList });
    },

    showCheck: function(hasCheck) {
      this.hasCheck = hasCheck;
      this.allCheck = false;
      this.ckList = [];
      this.event.$emit("mob-form-button-check", { rows: this.rows });
    },

    onListBodyScroll: function(event) {
      
      if(this.loading || !this.hasNextPage) {
        return;
      }

      var top = event.target.scrollTop;
      var elListBody = document.getElementById("listbody" + this.rn);
      
      if(!elListBody) return;

      var clientHeight = elListBody.clientHeight;
      var scrollHeight = elListBody.scrollHeight;
      var bottom = 40;
      if(top + bottom + clientHeight > scrollHeight) {
        this.page ++;
        this.queryData();
      }
    },

    bodyCol1Scroll: function(event) {

      var scrollLeft = event.currentTarget.scrollLeft;
      var elHeadCol1 = "#headcol1" + this.rn;
      $(elHeadCol1).scrollLeft(scrollLeft);
      // console.log(elHeadCol1 + ":" + scrollLeft);
    },

    autoListHeight: function() {

      var elId = "#app" + this.rn;
      var elIdCol0 = "#bodycol0" + this.rn;
      var elIdCol1 = "#bodycol1" + this.rn;
      var timer;

      var elIdAutoHeight = function() {
        if($(elId).length > 0) {
          $(elId).css("height", $(elId).parent().height());
        }
      }

      var autoHeight = function() {

        clearTimeout(timer);
        // if($(elId).length > 0) {
        //   $(elId).css("height", $(elId).parent().height());
        // }
        if($(elIdCol1).length > 0) {
          $(elIdCol1).css("height", $(elIdCol0)[0].scrollHeight);
          $(".wdcl-list-row2").css("width", $(elIdCol1)[0].scrollWidth);
        }
      }

      autoHeight();
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(elIdAutoHeight, 500);
    },

    getCkStyle: function(index) {

      if(this.ckList[index]) {
        return this.boxCheckStyle;
      }
      else {
        return this.boxUnCheckStyle;
      }
    },

    queryData: function() {

      var self = this;
      var param = JSON.parse(JSON.stringify(self.xgtj));
      param.push("page:" + self.page);
      param.push("pagesize:" + self.pagesize);
      
      self.loading = true;
      __hqCallTql.send("HQServ.ZNXG", [{
        "reqid": "1200",
        "xgtj": param.join(",")
      }], function(data) {

        self.loading = false;
        data = JSON.parse(data);

        if(!data.codes) {
          data.codes = [];
          data.totalnum = self.count;
        }

        // debugger;
        self.count = data.totalnum;
        var codes = data.codes;

        if(codes.length < self.pagesize) {
          self.hasNextPage = false;
        }
        else {
          self.hasNextPage = true;
        }

        var rows = [];
        codes.map( function(row) {
          var o = {};
          var dIndex = 0;
          var dd = row.data;
          self.cols2.map( function(col, colIndex) {

            // 市场
            if(col.type == 0) {
              if(row.setcode == 0) o.setCodeName = "深A";
              if(row.setcode == 1) o.setCodeName = "沪A";
            }

            // 财务，行情
            else if(col.type == 1) {
              o[col.field] = dd[dIndex];
              dIndex++;
            }

            // 技术
            else if(col.type == 2) {
              o[col.field] = col.value;
            }

            else if(col.type == 3) {
              o.xt = "是";
            }

          });
          o.code = row.code;
          o.name = row.name;
          o.setcode = row.setcode;

          rows.push(o);
        });

        self.rows = self.rows.concat(rows);
        self.$emit("mob-form-button-check", { rows: self.rows });
      });
    },

    initTj: function(xgtj) {
      try {
        var clid = tdx.getParam("clid");
        if(clid) {
          var clListObj = JSON.parse(localStorage.clListObj);
          this.xgtj = clListObj[clid].xgtj;
        }
        else {
          this.xgtj = xgtj || JSON.parse(localStorage.xgtj);
        }
      }
      catch(e) {
        this.xgtj = [];
      }

      this.page = 1;
      this.pagesize = 20;
      this.rows = [];
      this.count = 0;

      if(this.xgtj.length > 0) {
        this.queryData();
      }
      else {
        tdxAlert("请选择选股条件");
      }
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobClxgList || {};
    },

    _color: function() {
      return this.tdxColor.mobClxgList || {};
    },

    listBodyStyle: function() {

      if(!this.hasCheck) {
        return {
          marginLeft: "22px"
        }
      }
    },

    infoStyle: function() {
      var size = this._size.info;
      var color = this._color.info;
      return $.extend({}, size, color);
    },

    codeNumStyle: function() {
      var size = this._size.codeNum;
      var color = this._color.codeNum;
      return $.extend({}, size, color);
    },

    boxUnCheckStyle: function() {
      var size = this._size.boxUnCheck;
      var color = this._color.boxUnCheck;
      return $.extend({}, size, color);
    },

    boxCheckStyle: function() {
      var size = this._size.boxCheck;
      var color = this._color.boxCheck;
      return $.extend({}, size, color);
    },

    colStyle: function() {
      return {
        width: this.colWidth + "px"
      }
    },

    allCkStyle: function() {
      return this.allCheck ? this.boxCheckStyle : this.boxUnCheckStyle;
    },

    colWidth: function() {
      var winWidth = window.innerWidth;
      return (winWidth - 42) / 4;
    },

    // 动态获取表头
    cols2: function() {

      var cols = [];
      this.xgtj.map( function(tj) {
        cols.push(getTjCol(tj));
      });

      return cols;
    },

    zxgStyle: function() {

    },

    fzList: function() {
      console.log(this.originFzList);
      return this.originFzList || [];
    },

    fzName: function() {
      return this.originFzList[this.fzSel] && this.originFzList[this.fzSel].Name;
    },

    fzCheckStyle: function() {
      var size = this._size.fzCheck;
      var color = this._color.fzCheck;
      return $.extend({}, size, color);
    },

    fzUncheckStyle: function() {
      var size = this._size.fzUncheck;
      var color = this._color.fzUncheck;
      return $.extend({}, size, color);
    },

    fzCheckTextStyle: function() {
      var size = this._size.fzCheckText;
      var color = this._color.fzCheckText;
      return $.extend({}, size, color);
    },

    fzUncheckTextStyle: function() {
      var size = this._size.fzUncheckText;
      var color = this._color.fzUncheckText;
      return $.extend({}, size, color);
    },

    listHeadStyle: function() {
      var size = this._size.listHead;
      var color = this._color.listHead;
      return $.extend({}, size, color);
    },

    listCodeStyle: function() {
      var size = this._size.listCode;
      var color = this._color.listCode;
      return $.extend({}, size, color);
    },

    listRowStyle: function() {
      var size = this._size.listRow;
      var color = this._color.listRow;
      return $.extend({}, size, color);
    },

    dialogStyle: function() {
      var size = this._size.dialog;
      var color = this._color.dialog;
      return $.extend({}, size, color);
    },

    dialogTitleStyle: function() {
      var size = this._size.dialogTitle;
      var color = this._color.dialogTitle;
      return $.extend({}, size, color);
    },
  }
}

</script>
