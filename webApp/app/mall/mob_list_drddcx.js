var mob_list_drddcx = {
  querys: [
    {
      tplid: "mob-bar-tab",
      tabs: [
        { title: "基金", param: { "funcid": "2616" } },
        { title: "银行理财", param: { "funcid": "2260" } }
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
          field: "392",
          // style: {
          //   color: "#4696F5"
          // }
        },
        // urlParam: {
        //   OpenName: "基金详情",
        //   OpenUrl: "jjxq.html",
        //   queryParams: [
        //     { key: "code", value: "391" },
        //     { key: "pro_type1", value: "pro_type1" },
        //     { key: "pro_type2", value: "pro_type2" }
        //   ]
        // },
        code: {
          field: "391"
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