var GetSendData = function(n, json) {
  
  var funcid;
  var ix = new IXContent();

  switch(n) {

  }

  return [funcid, ix];
}

var SetDataField = function(data, n, vm) {

  if(n == 0) {
    // data = doWdcl(data);
  }

  return data;
}

window["tdxActivity"] = function() {
  
  if(localStorage.notFresh != 0) {
    localStorage.notFresh = 0;
  }
  else {
    window.location.href = window.location.href;
  }
}