var code;
var GetSendData = function(n, json) {
  
  var funcid;
  var ix = new IXContent();
  switch(n) {

    case 0:
      code = json["F402"] || "000647";
      funcid = "FW2.TSTC.2602";
      ix.Set("400", "1");
      ix.Set("402", code);
      break;
    default:
      break;
  }

  return [funcid, ix];
}

var SetDataField = function(data, n, vm) {

  if(n == 0) {
    data = data.rows && data.rows[0];
    
    // 获取基金账户
    getJjzh(data, vm);

    // 获取可赎份额
    getKsfe(data, vm); 
  }

  return data;
}

var getJjzh = function(row, vm) {

  hqJyCallTql.send("TSTC.2636", [{}], function(data) {

    data = FormatResult(data);
    var rows = data.rows || [];
    for(var i = 0; i < rows.length; i++) {
      if(row["393"] == rows[i]["426"]) {
        row["417"] = row[i]["417"];
        vm.dataCache[0] = row;
        break;
      }
    }
    
  });
}

var getKsfe = function(row, vm) {

  hqJyCallTql.send("TSTC.2606", [{}], function(data) {

    data = FormatResult(data);
    if(data.ErrorCode == 0) {

      for(var i = 0; i < data.rows.length; i++) {

        if(code == data.rows[i][391]) {
          row["410"] = data.rows[i]["410"];
          vm.dataCache[0] = $.extend({}, row);
          vm.$forceUpdate();
          break;
        }
      }
    }
  });
}