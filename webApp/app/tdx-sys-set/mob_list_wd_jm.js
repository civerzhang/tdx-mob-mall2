var getLangTabs = function(vm) {
  getCommonTabs({ SetType: "#GetLanguage#" }, vm, langClick);
}

var langClick = function(index, vm) {
  tabCommonClick({ SetType: "#GetLanguage#", CurNo: index }, vm, function() {
    window.location.href = window.location.href;
  });
}

var getColorTabs = function(vm) {
  getCommonTabs({ SetType: "#GetColor#" }, vm, colorClick);
}

var colorClick = function(index, vm) {
  tabCommonClick({ SetType: "#GetColor#", CurNo: index }, vm);
}

var getZsBarTabs = function(vm) {
  getCommonTabs({ SetType: "#GetZsBarFlag#" }, vm, zsBarClick);
}

var zsBarClick = function(index, vm) {
  tabCommonClick({ SetType: "#GetZsBarFlag#", CurNo: index }, vm);
}

var getScreenTabs = function(vm) {
  getCommonTabs({ SetType: "#GetScreenMode#" }, vm, screenClick);
}

var screenClick = function(index, vm) {
  tabCommonClick({ SetType: "#GetScreenMode#", CurNo: index }, vm);
}

var getKLineTabs = function(vm) {
  getCommonTabs({ SetType: "#GetKLineStyle#" }, vm, kLineClick);
}

var kLineClick = function(index, vm) {
  tabCommonClick({ SetType: "#GetKLineStyle#", CurNo: index }, vm);
}

var mob_list_wd_jm = {
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
          title: "线宽设置",
          imageName: "set_line.png",
          click: function() {
            __webCallTql.send("tdxOpenNativeModule", { OpenID: "ZBXTSZ", OpenParam: {} }, function() {});
          }
        },
        {
          tplid: "mob-wd-tab",
          title: "语言设置",
          imageName: "set_lang.png",
          getTabs: getLangTabs
        },
        {
          tplid: "mob-wd-tab",
          title: "涨跌颜色",
          imageName: "set_updown.png",
          getTabs: getColorTabs
        },
        {
          tplid: "mob-wd-tab",
          title: "指数显隐",
          imageName: "set_zsxy.png",
          getTabs: getZsBarTabs
        },
        {
          tplid: "mob-wd-tab",
          title: "屏幕长亮",
          imageName: "set_light.png",
          getTabs: getScreenTabs
        },
        {
          tplid: "mob-wd-tab",
          title: "K线类型",
          imageName: "set_kxlx.png",
          getTabs: getKLineTabs
        },
      ]
    }
  ]
}