var GetSendData = function(n, json) {
  
  var funcid;
  var ix = new IXContent();

  switch(n) {

    case 0: 
      funcid = "local.localstorage";
      ix.Set("key", "hello");
      ix.Set("F19471", 1);
      break;
  }

  return [funcid, ix];
}

var doClick = function() {
  tdxAlert("你点击了我!");
}

var SetDataField = function(data, n, vm) {

  data = {
    dgms: 0
  };

  vm.dataCache[1] = data;
  vm.dataCache[2] = data;
  return data;
}