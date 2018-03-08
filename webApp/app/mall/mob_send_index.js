var GetSendData = function(n, json) {
  
  var funcid;
  var ix = new IXContent();
  switch(n) {

    case 1:
      funcid = "HQ.TSTC.10038";
      ix.Set("F19471", "1");
      break;
    default:
      break;
  }

  return [funcid, ix];
}

var SetDataField = function(data, n, vm) {

  if(n == 1) {
    
    var res = data.match(/{[^}]+}/);
    if(res) {
      res = res[0];
      res = JSON.parse(res);

      // 获取一元起投，稳健收益，热门的数据
      var wjsy = res.wjsy;
      var hot = res.hot;

      getWjsyData(wjsy, vm);
      getHotData(hot, vm);

      data = undefined;
    }
  }

  return data;
}

// 获取单支产品的信息
var getSingleCpInfo = function(code, callback) {

  if(!code) {
    callback({});
    return;
  }

  var product = {
    code: code
  };

  __hqCallTql.send("TAS.product_info_query", [{
    "pro_code": code,
    "pro_type1": "",
    "pro_type2": ""
  }], function(res) {
    res = FormatResult(res);
    var row;

    if(res.ErrorCode != 0) {
      tdxAlert(res.ErrorInfo);
    }
    else {
      row  = res.rows && res.rows[0];
      if(row) {
        $.extend(product, row);
      }
    }
    __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
      "callno": "100",
      "pro_code": code,
      "pro_type": ""
    }], function(res) {

      res = FormatResult(res);
      if(res.ErrorCode != 0) {
        tdxAlert(res.ErrorInfo);
      }
      else {
        row = res.rows && res.rows[0];
        if(row) {
          $.extend(product, row);
        }
      }

      // 处理风险等级
      product["risk_level_name"] = product["risk_level_name"] && product["risk_level_name"].replace(/等级/g, "");
      callback(product);
    });
  });
} 

// 获取稳健收益内容
var getWjsyData = function(codeList, vm) {

  if(codeList && codeList.length == 0) {
    vm.dataCache[0] = undefined;
    return;
  }

  getSingleCpInfo(codeList[0], function(product) {
    vm.dataCache[0] = product;
    vm.$forceUpdate();
  });
}

var getHotData = function(codeList, vm) {

  var sum = codeList.length;
  var reccnt = 0;
  var list = [];
  codeList.map(function(code, index) {
    getSingleCpInfo(code, function(product) {
      reccnt ++;
      // list.push(product);
      list[index] = product;
      if(reccnt == sum) {
        // debugger;
        vm.dataCache[1] = list;
        vm.$forceUpdate();
      }
    });
  });
}

var tdxActivity = function() {
  // alert(2);
  console.log("tdxActivity");
}