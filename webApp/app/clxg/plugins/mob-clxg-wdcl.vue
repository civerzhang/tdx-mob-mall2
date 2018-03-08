<template>
  
  <div>
    <div v-if="loading" class="tdx-loading"></div>
    <div v-else>
      <div
        class="wdcl-bar" 
        :style="wdclBarStyle"
      >
        <span>我的方案</span>
        <span
          class="edit-color"
          @click="editSave"
          v-if="rows.length > 0 || edit"
          :style="editTextStyle"
        >{{ edit ? "保存" : "编辑" }}</span>
      </div>
      <div
        v-if="rows.length == 0 && !edit"
        class="wdcl-empty"
      >
        <div 
          class="wdcl-empty-img"
          :style="emptyImageStyle"
        ></div>
        <button 
          class="tdx-btn-lg wdcl-btn-create"
          :style="newBtnStyle"
          @click.stop.prevent="newCl"
        >创建新方案</button>
      </div>
      <div v-else class="wdcl-cl-items">
        <div
          v-for="(row, index) in rows"
          :key="'row-' + index"
          v-if="row.id != 'op'"
          class="wdcl-cl-item"
          :style="clItemStyle"
          @click.stop.prevent="clDetail(row)"
        >
          <div 
            v-if="edit"
            class="wdcl-item-del"
            @click.stop.prevent="delCl(index)"
          ></div>
          <span>{{row.title}}</span>
        </div>
        <div
          v-else
          class="wdcl-cl-item-op"
          :style="clItemOpStyle"
          @click.stop.prevent="newCl"
        ></div>
      </div>
    </div>
  </div>

</template>

<script>

return {
  
  data: function() {
    return {
      edit: false,
      clList: [],
      loading: true
    }
  },

  methods: {

    delCl: function(index) {
      var clObj = this.clList.splice(index, 1)[0];
      var clListObj = JSON.parse(localStorage.clListObj);
      delete clListObj[clObj.id];
      localStorage.clListObj = JSON.stringify(clListObj);
    },

    editSave: function() {
      this.edit = !this.edit;
    },

    clDetail: function(cl) {

      // 设置选股条件
      localStorage.xgtj = JSON.stringify(cl.xgtj);

      __webCallTql.send("tdxOpenUrl", {
        OpenName: cl.title,
        OpenType: "native",
        OpenUrl: "./result.html?clid=" + cl.id,
        OpenParam: {
          UrlType: "Relative",
          WebViewType: __tdxMobSystem == "Android" ? "JyURL" : "LocalURL"
        }
      }, function() {});
    },

    // 创建新策略
    newCl: function() {

      if(this.edit) return;

      localStorage.xgtj = "[]";
      __webCallTql.send("tdxOpenUrl", {
        OpenName: "选股方案",
        OpenType: "native",
        OpenUrl: "./create.html",
        OpenParam: {
          UrlType: "Relative",
          WebViewType: __tdxMobSystem == "Android" ? "JyURL" : "LocalURL"
        }
      }, function() {});
    },

    initClList: function() {

      var clListObj = { num: 0 };
      try {
        clListObj = JSON.parse(localStorage.clListObj);
      }
      catch(e) {
      }

      /* 
        这里为了兼容老的策略选股数据结构，需要把原来的转下
      */
      var clList = [];
      // alert(JSON.stringify(clListObj));
      for(var clid in clListObj) {
        if(clid == "num") continue;
        var clObj = clListObj[clid];
        
        // 老的策略结构
        if(clObj.selNum != undefined) {

          // 转成新的策略结构
          var newClObj = {};
          newClObj.id = clObj.id;
          newClObj.title = clObj.title;
          
          var xgtj = [];

          // 市场
          if(clObj.selSc != undefined && clObj.selSc != -1) {

            var i = parseInt(clObj.selSc / 3);
            var j = clObj.selSc % 3;
            var item = zb.sczb[i][j];
            xgtj.push(item.index);
          }

          // alert(JSON.stringify(xgtj));

          // 财务，行情，技术
          for(var index in clObj.selObj) {
            var cw = clObj.selObj[index];
            if(cw != -1) {
              var h = parseInt(index / 400);
              var tmp = index % 400;
              var m = parseInt(tmp / 20);
              var t = index % 20;
              // alert(h + "|" + m + "|" + t);
              var keys = ["cwzb", "hqzb", "jszb"];
              var item = zb[keys[h]][m][t][cw];
              // alert(JSON.stringify(item));
              xgtj.push(item.index);
            }
          }

          // alert(JSON.stringify(xgtj));

          // 形态
          for(var index in clObj.selXt) {
            var xt = clObj.selXt[index];
            if(xt) {
              var h = parseInt(index / 3);
              var m = index % 3;
              var item = zb.xtzb[h][m];
              xgtj.push(item.index);
            }
          }

          clObj.xgtj = xgtj;
          delete clObj.selNum;
          delete clObj.selSc;
          delete clObj.selObj;
          delete clObj.selXt;

          clList.push(clObj);
        }
        else {
          clList.push(clObj);
        }
      }

      // 重写策略数据缓存
      var newClListObj = {};
      newClListObj.num = clListObj.num;
      clList.map(function(cl) {
        newClListObj[cl.id] = cl;
      });

      // alert(JSON.stringify(newClListObj));
      localStorage.clListObj = JSON.stringify(newClListObj);
      this.clList = clList;
      this.loading = false;
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobClxgWdcl || {};
    },

    _color: function() {
      return this.tdxColor.mobClxgWdcl || {};
    },

    wdclBarStyle: function() {
      var bar = this._size.bar;
      var color = this._color.bar;
      return $.extend({}, bar, color);
    },

    editTextStyle: function() {
      var size = this._size.editText;
      var color = this._color.editText;
      return $.extend({}, size, color);
    },

    newBtnStyle: function() {
      var size = this._size.newBtn;
      var color = this._color.newBtn;
      return $.extend({}, size, color);
    },

    emptyImageStyle: function() {
      var size = this._size.emptyImage;
      var color = this._color.emptyImage;
      return $.extend({}, size, color);
    },

    clItemsStyle: function() {
      var size = this._size.clItems;
      var color = this._color.clItems;
      return $.extend({}, size, color);
    },

    clItemStyle: function() {
      var size = this._size.clItem;
      var color = this._color.clItem;
      return $.extend({}, size, color, this.rect);
    },

    clItemOp: function() {
      var size = this._size.clItemOp;
      var color = this._color.clItemOp;
      return $.extend({}, size, color);
    },

    clItemOpDis: function() {
      var size = this._size.clItemOpDis;
      var color = this._color.clItemOpDis;
      return $.extend({}, size, color);
    },

    clItemOpStyle: function() {
      if(this.edit) {
        return $.extend({}, this.clItemOpDis, this.rect);;
      }
      else {
        return $.extend({}, this.clItemOp, this.rect);;
      }
    },

    rect: function() {
      var winWidth = window.innerWidth;
      var clItemWidth = winWidth / 5;
      var clItemMargin = clItemWidth / 10;
      return {
        width: clItemWidth + "px",
        height: clItemWidth + "px",
        marginLeft: clItemMargin + "px",
        marginRight: clItemMargin + "px"
      }
    },

    rows: function() {

      var clList = JSON.parse(JSON.stringify(this.clList || []));
      if(clList.length != 0) {
  
        // 这里添加一个操作按钮
        clList.push({id: "op"});
      }

      return clList;
    }
  },

  mounted: function() {
    this.initClList();
  }
}

</script>
