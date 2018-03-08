var getDefQueryParam = function(tdxConf) {
  
  var param = {};
  tdxConf.querys.map(function(query) {
    var sel = localStorage[query.localStorageKey] || 0;
    $.extend(param, query.tabs[sel].param);
  });

  return param;
}

var reqFlag;

var GetSendData = function(n, json) {
  
  var funcid;
  var ix = new IXContent();

  switch(n) {

    case 0:
      funcid = "FW2.TSTC." + json["funcid"];
      if(json["funcid"] == "2616") {
        reqFlag = 2616;
        ix.Set("113", "-1");
        ix.Set("234", "0");
      }
      else if(json["funcid"] == "2260") {
        reqFlag = 2260;
        ix.Set("113", "0");
      }
      break;
  }

  return [funcid, ix];
}

var SetDataField = function(data, n, vm) {

  if(n == 0) {

    if(reqFlag != vm.queryParam.funcid) return;

    data.rows.map(function(row) {
      // 测试，默认都给 12，货币基金的 type
      row["pro_type1"] = "1";
      row["pro_type2"] = "12";
      
      // 标记类别
      row["funcid"] = reqFlag;
    });
    data = data.rows;
  }

  return data;
}