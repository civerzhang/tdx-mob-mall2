var getDefQueryParam = function(tdxConf) {
  
    var querys = tdxConf.querys;
    var param = {};

    // 第一个 tab
    var query = querys[0];
    var sel = localStorage[query.localStorageKey] || 0;
    $.extend(param, query.tabs[sel].param);

    // 日期
    var type = querys[1].query[0];
    var edate = getDateStringByDay(0);
    var sdate;
    if(type == 0) {
      sdate = getDateStringByDay(-7);
    }
    else if(type == 1) {
      sdate = getDateStringByMonth(-1);
    }
    else if(type == 2) {
      sdate = getDateStringByMonth(-3);
    }
    else if(type == 3) {
      sdate = edate;
    }
    param.sdate = sdate;
    param.edate = edate;

    return param;
  }
  
  var GetSendData = function(n, json) {
    
    var funcid;
    var ix = new IXContent();
  
    switch(n) {
  
      case 0:
        funcid = "FW2.TSTC." + json["funcid"];
        ix.Set("126", json.sdate);
        ix.Set("127", json.edate);
        break;
    }
  
    return [funcid, ix];
  }
  
  var SetDataField = function(data, n, vm) {
  
    if(n == 0) {
      data = data.rows;
    }
  
    return data;
  }