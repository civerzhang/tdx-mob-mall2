var GetSendData = function(n, json) {
  
  var funcid;
  var ix = new IXContent();
  switch(n) {

    case 0:
      funcid = "HQ.TSTC.10038";
      ix.Set("F19471", "1");
      break;
    default:
      break;
  }

  return [funcid, ix];
}

var SetDataField = function(data, n, vm) {

  if(n == 0) {
    
    var res = data.match(/{[^}]+}/);
    if(res) {
      res = res[0];
      res = JSON.parse(res);

      var jj = res.jj;
      getJjData(jj, vm);

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
      product["risk_level_name"] = product["risk_level_name"].replace(/等级/g, "");
      callback(product);
    });
  });
} 

var getJjData = function(codeList, vm) {

  var sum = codeList.length;
  var reccnt = 0;
  var list = [];
  codeList.map(function(code, index) {
    getSingleCpInfo(code, function(product) {
      reccnt ++;
      // list.push(product);
      list[index] = product;
      if(reccnt == sum) {
        vm.dataCache[0] = list;
        vm.$forceUpdate();
      }
    });
  });
}