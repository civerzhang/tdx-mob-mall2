var cdClick = function(json) {
  
  tdxConfirm({
    content: "确认撤单?",
    ok: function() {

      var param = {
        "402": json["391"], // 基金代码
        "405": json["405"], // 交易金额
        "404": json["414"], // 委托数量
        "146": json["146"], // 委托编号
        "142": getDateStringByDay(), //委托日期
        "113": "1", //操作标志
        "1217": "CANCLE", //备注
      };
      if(json["type"] == "0") {
        param["397"] = "3";
      }

      var cdFuncid = {
        "0": "2600",
        "1": "2102"
      };

      hqJyCallTql.send("TSTC." + cdFuncid[json["type"]], [param], function(data) {
        
        data = FormatResult(data);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        tdxAlert({
          content: "撤单委托已提交，委托编号：" + data.rows[0]["146"],
          ok: function() {
            window.location.href = window.location.href;
          }
        });

      });
    }
  });
}

var mob_list_cd2 = {
  querys: [
    {
      tplid: "mob-bar-tab",
      tabs: [
        { title: "基金", param: { "funcid": "2616", type: 0 } },
        { title: "银行理财", param: { "funcid": "2260", type: 1 } }
      ],
      split: {},
      localStorageKey: "cctab0",
      style: {
        justifyContent: "space-around"
      },
      tabItemStyle: {
        "fontSize": "14px",
        "width": "100%"
      },
      tabItemSelStyle: {
        "height": "38px"
      }
    }
  ],
  items: [
    {
      tplid: "mob-list",
      index: 0,
      card: {
        tplid: "mob-card-dd",
        split: {},
        style: {
          padding: "10px 15px"
        },
        title: {
          field: "392"
        },
        code: {
          field: "391"
        },
        opBtn: {
          name: "撤单",
          style: {
            color: "#4696F5",
            borderColor: "#4696F5"
          },
          urlFunc: cdClick
        },
        table: {
          style: {
            marginTop: "5px"
          },
          cols: [
            [
              {
                title: "业务名称",
                field: "306"
              },
              {
                title: "订单状态",
                field: "147"
              }
            ],
            [
              {
                title: "委托数量",
                field: "414"
              },
              {
                title: "交易金额",
                field: "405"
              }
            ]
          ]
        }
      }
    }
  ]
}