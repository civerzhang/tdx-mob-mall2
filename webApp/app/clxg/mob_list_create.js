var mob_list_create = {
  top: [
    {
      tplid: "mob-clxg-tj"
    }
  ],
  items: [
    {
      tplid: "mob-clxg-zb",
      style: {
        "-webkit-overflow-scrolling": "auto"
      }
    }
  ],
  bottom: [
    {
      tplid: "mob-form-button",
      btns: [
        {
          name: "执行选股",
          style: {
            height: "44px",
            color: "#fff",
            fontSize: "18px",
            lineHeight: "44px",
            textAlign: "center"
          },
          urlFunc: function(data, form) {

            // alert(JSON.stringify(form.xgtj));
            // debugger;
            var xgtj = form.xgtj;
            if(!Array.isArray(xgtj) || xgtj.length == 0) {
              tdxAlert("请选择筛选条件");
              return;
            }

            var clid = tdx.getParam("clid");
            if(clid) {

              // 如果在策略中，更新策略
              var clListObj = JSON.parse(localStorage.clListObj);
              clListObj[clid].xgtj = xgtj;
              localStorage.clListObj = JSON.stringify(clListObj);

              __webCallTql.send("ReturnToSuperior", {}, function() {});
            }
            else {
              localStorage.xgtj = JSON.stringify(xgtj);
              window.location.href = "./result.html?color=" + tdx.getParam("color");
            }
          }
        }
      ]
    }
  ]
}