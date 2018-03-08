var getKFreshTabs = function(vm) {
  getCommonTabs({ SetType: "#GetFxtRefreshTime#" }, vm, kFreshClick);
}

var kFreshClick = function(index, vm) {
  tabCommonClick({ SetType: "#GetFxtRefreshTime#", CurNo: index }, vm);
}

var getHqFresh = function(vm) {
  getXtSet({ SetType: "#GetHqRefreshTime#", origin: 1}, function(result) {
    vm.inputShow = result;
  });
}

var setHqFresh = function(value, vm) {
  setXtSet({ SetType: "#GetHqRefreshTime#", SetValue: value }, function(result) {
    window.location.href = window.location.href;
  });
}

var getJyLockTime = function(vm) {
  getXtSet({ SetType: "#GetJYLockTime#", origin: 1}, function(result) {
    vm.inputShow = result;
  });
}
  
var setJyLockTime = function(value, vm) {
  setXtSet({ SetType: "#GetJYLockTime#", SetValue: value }, function(result) {
    window.location.href = window.location.href;
  });
}

var mob_list_wd_time = {

  items: [
    {
      tplid: "mob-wd-list",
      style: {
        marginTop: "10px"
      },
      rows: [
        {
          tplid: "mob-wd-input",
          title: "行情刷新时间(秒)",
          getValue: getHqFresh,
          setValue: setHqFresh
        },
        {
          tplid: "mob-wd-input",
          title: "交易锁屏时间(分)",
          getValue: getJyLockTime,
          setValue: setJyLockTime
        },
        {
          tplid: "mob-wd-tab",
          title: "K线刷新时间(秒)",
          getTabs: getKFreshTabs
        }
      ]
    }
  ]
}