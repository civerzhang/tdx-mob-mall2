var code;
var count = 3;
var reccnt = 0;
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
    data["zjzh"] = uinfo.ZJZH[0];

    // 获取基金账户
    getJjzh(data, vm);

    reccnt = 0;
    getXys("zms", data, vm);
    getXys("ht", data, vm);
    getXys("jss", data, vm);
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
        break;
      }
    }
    
  });
}

var getXys = function(type, row, vm) {

  __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
    "callno": "105",
    "pro_type": type,
    "pro_code": code,
    "pro_mm": "1"
  }], function(data) {
    reccnt ++;
    data = FormatResult(data);
    var url = data.rows && data.rows[0] && data.rows[0].url;
    if(type == "zms") {
      row["cpzms"] = url;
    }
    else if(type == "ht") {
      row["cpht"] = url;
    }
    else if(type == "jss") {
      row["fxjss"] = url;
    }

    if(reccnt == count) {
      vm.dataCache[0] = $.extend({}, row);
      vm.$forceUpdate();
    }
  });
}