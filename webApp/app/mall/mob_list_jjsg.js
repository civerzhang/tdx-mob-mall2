var jumpYzzz = function(row) {

  __webCallTql.send("tdxOpenNativeModule", {
    OpenID: "Stock.yzzz",
    OpenParam: {}
  }, function() {});
}

var btnCaClick = function(row, form) {
  __webCallTql.send("ReturnToSuperior", {}, function() {});
}

var btnOkClick = function(row, form) {
  
  var info = "<div style='line-height: 26px;'>" +
                "<span>请确认交易！</span><br>" +
              "</div style='line-height: 26px;'><div>" +
                "<span>操作类别：</span><span>申购</span>" +
              "</div><div style='line-height: 26px;'>" +
                "<span>购买金额：</span><span>" + form.gmje + "</span>" +
              "</div>";
  tdxConfirm({
    content: info,
    ok: function() {
      onSgSdx(row, form);
    }
  });
}

var onSgSdx = function(row, form) {

  __webCallTql.send("tdxSdxCheckUp", {
    "F1217": "SDX.CHECK_RISK_PRODUCTCODE",
    "F125": "",
    "F123": "",
    "F391": row["402"],
    "F393": row["393"],
    "F362": "Mobile.OTC.OTCSGTRD"
  }, function(data) {
    data = FormatResult(data);
    console.log(data);
    if(data.ErrorCode == 0) {
      onSgSend(row, form, data.rows[0]);
    }
  });
}

var onSgSend = function(row, form, sdxResult) {

  // debugger;
  hqJyCallTql.send("TSTC.2600", [{
    "F362": "Mobile.OTC.OTCSGTRD",
    "400": "1",
    "402": row["402"] || "000647",
    "405": form.gmje,
    "417": row["417"],
    "426": row["393"],
    "1217": "SDX.ORDER",
    "1223": "1",
    "1284": sdxResult["F1284"]
  }], function(data) {
    // debugger;
    data = FormatResult(data);

    // 缓存结果
    localStorage.sgResult = JSON.stringify(data);
    localStorage.sgCode = JSON.stringify(row);

    // 跳转到委托结果界面
    __webCallTql.send("tdxOpenUrl", {
      OpenName: "申购",
      OpenType: "native",
      OpenUrl: "result.html",
      OpenParam: {
        WebViewType: "JyUrl",
        UrlType: "Relative"
      }
    }, function() {});
  });
}

var checkDisabledFunc = function(ckParams) {
  var isDisabled = false;
  if(!ckParams.gmje || ckParams.gmje == "") {
    isDisabled = true;
  }

  if(!ckParams.xysCheck) {
    isDisabled = true;
  }

  return isDisabled;
}

var getUrls = function(data) {

  // console.log("-------------");
  // console.log(data);
  // console.log("-------------");

  var urls = [];
  var urlParam = {
    OpenName: "",
    OpenUrl: "",
    OpenType: "browser",
    OpenParam: {
      WebViewType: __tdxMobSystem == "Android" ? "JyURL" : "LcoalURL",
      UrlType: "Remote"
    }
  };

  // 招募书
  if(data.cpzms) {
    urls.push({
      title: "《产品招募书》",
      style: {},
      checkStyle: {},
      urlParam: $.extend({}, urlParam, {
        "OpenName": "产品招募书",
        "OpenUrl": data.cpzms
      })
    });
  }

  // 电子合同
  if(data.cpht) {
    urls.push({
      title: "《产品合同》",
      style: {},
      checkStyle: {},
      urlParam: $.extend({}, urlParam, {
        "OpenName": "产品合同",
        "OpenUrl": data.cpht
      })
    });
  }

  if(data.fxjss) {
    urls.push({
      title: "《产品风险揭示书》",
      style: {},
      checkStyle: {},
      urlParam: $.extend({}, urlParam, {
        "OpenName": "产品风险揭示书",
        "OpenUrl": data.fxjss
      })
    });
  }

  return urls;
}

var getInputItem = function(data) {

  if(!data) return;

  // 显示购买提示
  // open_share           个人首次最低        434
  // min_share            个人最低认购金额    481
  // allot_limitshare     个人追加认购金额    483
  // min_share2           个人最低申购金额    480
  // allot_limitshare2    个人追加申购金额    482
  var openShare = data["434"];
  var minShare = data["480"];
  var allotShare = data["482"];

  return {
    input: {
      placeholder: "首次最低" + openShare + "元，最低" + minShare + "元，最低追加" + allotShare + "元"
    }
  };
}

var mob_list_jjsg = {
  items: [
    {
      tplid: "mob-form",
      style: {},
      index: 0,
      rows: [
        {
          tplid: "mob-form-span",
          style: {
            height: "25px",
            marginTop: "20px"
          },
          cols: [
            {
              field: "403",
              style: {
                fontSize: "18px",
                fontWeight: "bold"
              }
            },
            {
              field: "402",
              style: {
                marginLeft: "10px",
                fontSize: "12px",
                color: "rgba(0, 0, 0, 0.5)"
              }
            }
          ]
        },
        {
          tplid: "mob-form-span",
          cols: [
            {
              name: "基金净值",
              style: {
                fontWeight: "bold"
              }
            },
            {
              field: "406",
              style: {}
            }
          ],
          split: {},
          style: {
            fontSize: "12px"
          }
        },
        {
          cols: [
            {
              name: "可用资金",
              style: {}
            },
            {
              field: "301",
              style: {},
              format: "2m"
            }
          ],
          op: {
            name: "资金不足?",
            style: {},
            urlFunc: jumpYzzz
          },
          style: {}
        },
        {
          cols: [
            {
              name: "资金账号",
              style: {}
            },
            {
              field: "zjzh",
              style: {}
            }
          ],
          style: {
            borderBottom: "1px solid #ddd"
          }
        },
        {
          tplid: "mob-form-input",
          title: {
            name: "购买金额",
            style: {
              color: "rgba(0,0,0,0.5)"
            }
          },
          input: {
            placeholder: "请输入购买金额",
            name: "￥",
            style: {
              fontSize: "26px",
              fontWeight: "bold",
              height: "30px",
              marginBottom: "5px"
            },
            field: "gmje",
          },
          split: {},
          getItem: getInputItem
        },
        {
          tplid: "mob-form-xys",
          field: "xysCheck",
          title: "我已知悉如下协议",
          urls: [],
          getUrls: getUrls,
          style: {},
          checkStyle: {},
          checkImage: ["uncheck.png", "check.png"],
        }
      ],
      foot: [
        {
          tplid: "mob-form-button",
          btns: [
            {
              name: "以后再说",
              style: {
                borderTop: "1px solid #ddd",
                borderRight: "1px solid #ddd",
                height: "40px",
              },
              disabledStyle: {},
              urlFunc: btnCaClick
            },
            {
              name: "马上申购",
              style: {
                borderTop: "1px solid #ddd",
                height: "40px",
                color: "#fff",
                backgroundColor: "#2E6BB1",
                borderColor: "#2E6BB1"
              },
              disabledStyle: {
                color: "#ddd",
                backgroundColor: "#fff",
                borderColor: "#ddd"
              },
              urlFunc: btnOkClick,
              checkDisabledFunc: checkDisabledFunc
            }
          ],
          style: {
            color: "#ddd",
            fontWeight: "bold",
            // borderBottom: "1px solid #ddd",
            // marginBottom: "10px",
          }
        }
      ]
    }
  ]
}