/* 
  这里放置我的设置中的一些公共操作和样式
*/

var tabLeftStyle = {
  borderTopLeftRadius: "5px",
  borderBottomLeftRadius: "5px"
};

var tabRightStyle = {
  borderTopRightRadius: "5px",
  borderBottomRightRadius: "5px",
  borderRightWidth: "1px"
};

var tabLeftStyle3 = {
  borderTopLeftRadius: "5px",
  borderBottomLeftRadius: "5px",
  width: "53px"
};

var tabMiddleStyle3 = {
  width: "53px"
};

var tabRightStyle3 = {
  width: "53px",
  borderTopRightRadius: "5px",
  borderBottomRightRadius: "5px",
  borderRightWidth: "1px"
};

// 格式化结果
var formatTab = function(option, click) {
  var tabs = [];
  var len = option.length;
  option.map(function(op, index) {
    var o = {
      title: op,
      click: click
    };

    if(len == 2) {

      if(index == 0) {
        o.style = tabLeftStyle;
      }
      else if(index == option.length - 1) {
        o.style = tabRightStyle;
      }
    }
    else if(len == 3) {

      if(index == 0) {
        o.style = tabLeftStyle3;
      }
      else if(index == option.length - 1) {
        o.style = tabRightStyle3;
      }
      else {
        o.style = tabMiddleStyle3;
      }
    }

    // 4个字以上
    if(op.length >= 4) {
      o = JSON.parse(JSON.stringify(o));
      o.style.fontSize = "12px";
      o.click = click;
    }

    tabs.push(o);
  });

  return tabs;
}

// 获取配置
var getXtSet = function(param, callback) {

  __webCallTql.send("tdxGetXTSet", param, function(data) {

    data = FormatResult(data);
    if(data.ErrorCode != 0) {
      tdxAlert(data.ErrorInfo);
      return;
    }

    var result = data.rows[0]["RESULT"];
    
    if(param.origin != 1 && typeof result == "string") {
      result = JSON.parse(result);
    }

    callback(result);
  });
}

// 设置配置
var setXtSet = function(param, callback) {
  __webCallTql.send("tdxSetXTSet", param, function(data) {
    data = FormatResult(data);
    if(data.ErrorCode != 0) {
      tdxAlert(data.ErrorInfo);
      return;
    }

    var result = data.rows[0]["RESULT"];
    // if(typeof result == "string") {
    //   result = JSON.parse(result);
    // }

    callback(result);
  });
}

var getCommonTabs = function(param, vm, click) {
  getXtSet(param, function(result) {
    vm.tabs = formatTab(result.Option, click);
    vm.tabSel = result.CurNo;
  })
}

var tabCommonClick = function(param, vm, callback) {
  setXtSet(param, function(result) {
    vm.tabSel = param.CurNo;
    if(typeof callback == "function") {
      callback();
    }
  });
}