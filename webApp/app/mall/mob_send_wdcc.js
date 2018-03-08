var getDefQueryParam = function(tdxConf) {

  var param = {};
  tdxConf.querys.map(function(query) {
    var sel = localStorage[query.localStorageKey] || 0;
    $.extend(param, query.tabs[sel].param);
  });
  return param;
}

var GetSendData = function(n, json) {
  
  var funcid;
  var ix = new IXContent();

  switch(n) {

    case 0:
      funcid = "FW2.TSTC." + json["funcid"];
      break;
  }

  return [funcid, ix];
}

var SetDataField = function(data, n, vm) {

  if(n == 0) {

    data.rows.map(function(row) {
      // 测试，默认都给 12，货币基金的 type
      row["pro_type1"] = "1";
      row["pro_type2"] = "12";
    });
    data = data.rows;
  }

  return data;
}