var checkDisabledFunc = function(ckParams) {
  var isDisabled = false;
  if(!ckParams.shfe || ckParams.shfe == "") {
    isDisabled = true;
  }

  return isDisabled;
}

var btnOkClick = function(row, form) {
  // tdxAlert("你点击了我");
  var info = "<div style='line-height: 26px;'>" +
                "<span>请确认交易！</span><br>" +
              "</div style='line-height: 26px;'><div>" +
                "<span>操作类别：</span><span>赎回</span>" +
              "</div><div style='line-height: 26px;'>" +
                "<span>赎回份额：</span><span>" + form.shfe + "</span>" +
              "</div>";
  tdxConfirm({
    content: info,
    ok: function() {
      onSh(row, form);
    }
  });
}

var onSh = function(row, form) {

  hqJyCallTql.send("TSTC.2600", [{
    "402": row["402"],
    "400": "2",
    "404": form.shfe,
    "417": row["417"],
    "426": row["393"]
  }], function(data) {
    data = FormatResult(data);
    if(data.ErrorCode != 0) {
      tdxAlert("委托失败，失败原因：" + data.ErrorInfo);
      return;
    }
  });
}

var mob_list_jjsh = {
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
              name: "可赎",
              style: {}
            },
            {
              field: "410",
              style: {}
            }
          ],
          split: {}
        },
        {
          tplid: "mob-form-input",
          title: {
            name: "赎回份额",
            style: {
              color: "rgba(0,0,0,0.5)"
            }
          },
          input: {
            placeholder: "请输入赎回份额",
            name: "￥",
            style: {
              fontSize: "26px",
              fontWeight: "bold",
              height: "30px",
              marginBottom: "5px"
            },
            field: "shfe",
          },
          split: {}
        }
      ],
      foot: [
        {
          tplid: "mob-form-button",
          btns: [
            {
              name: "赎回",
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
            fontWeight: "bold"
          }
        }
      ]
    }
  ]
}