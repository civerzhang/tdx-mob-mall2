var GetSendData = function(n, json) {
  
    var funcid;
    var ix = new IXContent();
  
    switch(n) {
  
      case 0:
        funcid = "FW2.TSTC.104";
        ix.Set("1230", "1");
        break;
      case 1:
        funcid = "FW2.TSTC.2606";
        break;
    }
  
    return [funcid, ix];
  }

  var zjYhlc = 0, zjJj = 0;
  
  var SetDataField = function(data, n, vm) {
  
    if(n == 0) {
      data = data.rows && data.rows[0];
    }

    else if(n == 1) {

      zjYhlc = 0;
      data.rows.map(function(row) {
        zjYhlc += parseFloat(row["10001"]);
      });
      data = undefined;
      getJjzj(vm);
    }
    
    return data;
  }
  
  var getJjzj = function(vm) {
    
    zjJj = 0;
    hqJyCallTql.send("TSTC.2258", [], function(data) {
      
      data = FormatResult(data);
      if(data.ErrorCode != 0) {
        tdxAlert(data.ErrorInfo);
        return;
      }
      data.rows.map(function(row) {
        zjJj += parseFloat(row["10025"]);
      });

      vm.dataCache[1] = {
        zjYhlc: zjYhlc,
        zjJj: zjJj
      };
      vm.$forceUpdate();
    });
  }
