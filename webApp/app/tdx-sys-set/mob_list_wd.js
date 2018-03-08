// 多股切换
var dgClick = function(index, vm) {

  setXtSet({
    SetType: "#GetHQDGMode#",
    CurNo: index
  }, function(result) {
    vm.tabSel = index;
  });
}

var skinClick = function(index, vm) {

  setXtSet({
    SetType: "#GetColorSet#",
    CurNo: index
  }, function(result) {
    vm.tabSel = index;
  });
}

// 清除缓存
var qchcClick = function() {
  
  // tdxAlert("你点击了我！");
  __webCallTql.send("tdxQCHC", {}, function(data) {
    data = FormatResult(data);
    if(data.ErrorCode != 0) {
      tdxAlert(data.ErrorInfo);
      return;
    }
    tdxAlert(data.rows[0]["RESULT"]);
  });
}

// 获取多股的 tab 内容
var getDgTabs = function(vm) {
  getXtSet({ SetType: "#GetHQDGMode#" }, function(result) {
    vm.tabs = formatTab(result.Option, dgClick);
    vm.tabSel = result.CurNo;
  });
}

var getSkinTabs = function(vm) {
  getXtSet({ SetType: "#GetColorSet#" }, function(result) {
    vm.tabs = formatTab(result.Option, skinClick);
    vm.tabSel = result.CurNo;
  });
}

var getQdxRows = function(vm) {
  getXtSet({ SetType: "#GetFrameMenuName#" }, function(result) {
    
    var rows = [];
    result.Option.map(function(op, index) {
      rows.push({
        value: index,
        name: op
      });
    });
    rows.push({ value: -1, name: "上次退出记录" });
    vm.rows = rows;
    if(result.CurNo >= 0) {
      vm.row = rows[result.CurNo];
    }
    else {
      vm.row = rows[rows.length - 1];
    }
  });
}

var getQdxName = function(row) {
  return row["name"];
}

var setQdxName = function(row, vm) {
  setXtSet({ SetType: "#GetFrameMenuName#", CurNo: row.value }, function(result) {
    window.location.href = window.location.href;
  });
}

var mob_list_wd = {
  items: [
    {
      tplid: "mob-wd-list",
      index: 0,
      style: {
        marginTop: "10px"
      },
      rows: [
        {
          tplid: "mob-wd-bar",
          imageName: "set_zz.png",
          title: "主站设置",
          // urlParam: {
          //   OpenName: "主站设置",
          //   OpenUrl: "wd_zz.html"
          // },
          click: function() {
            __webCallTql.send("tdxOpenNativeModule", { OpenID: "ZZSZ", OpenParam: {} }, function() {});
          }
        },
        {
          tplid: "mob-wd-bar",
          imageName: "set_time.png",
          title: "时间设置",
          urlParam: {
            OpenName: "时间设置",
            OpenUrl: "wd_time.html"
          }
        }
      ],
      split: {}
    },
    {
      tplid: "mob-wd-list",
      index: 3,
      split: {},
      rows: [
        {
          tplid: "mob-wd-bar",
          imageName: "set_jmsz.png",
          title: "界面设置",
          urlParam: {
            OpenName: "界面设置",
            OpenUrl: "wd_jm.html"
          }
        },
        {
          tplid: "mob-wd-zz",
          imageName: "set_mrqdx.png",
          title: "启动页面",
          getRows: getQdxRows,
          rowFields: ["name"],
          subTitle: {
            getValue: getQdxName
          },
          setValue: setQdxName
        },
        {
          tplid: "mob-wd-tab",
          title: "多股模式",
          field: "dgms",
          imageName: "set_dgms.png",
          getTabs: getDgTabs
        },
        {
          tplid: "mob-wd-tab",
          title: "换肤设置",
          imageName: "set_skin.png",
          getTabs: getSkinTabs
        },
      ]
    },
    {
      tplid: "mob-wd-list",
      index: 1,
      split: {},
      rows: [
        {
          tplid: "mob-wd-bar",
          imageName: "set_qchc.png",
          title: "清除缓存",
          click: qchcClick
        },
        {
          tplid: "mob-wd-bar",
          imageName: "set_sjbf.png",
          title: "数据备份",
          urlParam: {
            OpenName: "数据备份",
            OpenUrl: "../tdx-sync-my/cloudSync.html?type=BACKUP"
          }
        }
      ]
    },
    {
      tplid: "mob-wd-list",
      index: 2,
      rows: [
        {
          tplid: "mob-wd-bar",
          imageName: "set_bbxx.png",
          title: "版本信息",
          click: function() {
            __webCallTql.send("tdxOpenNativeModule", { OpenID: "BBXX", OpenParam: {} }, function() {});
          }
        },
        {
          tplid: "mob-wd-bar",
          imageName: "set_help.png",
          title: "帮助说明",
          click: function() {
            __webCallTql.send("tdxOpenNativeModule", { OpenID: "BZSM", OpenParam: {} }, function() {});
          }
        },
        {
          tplid: "mob-wd-bar",
          imageName: "set_fk.png",
          title: "用户反馈",
          click: function() {
            __webCallTql.send("tdxOpenNativeModule", { OpenID: "YHFK", OpenParam: {} }, function() {});
          }
        }
      ]
    }
  ]
}