var mob_list_lsddcx = {
  querys: [
    {
      tplid: "mob-bar-tab",
      tabs: [
        { title: "基金", param: { "funcid": "2620" } },
        { title: "银行理财", param: { "funcid": "2260" } },
      ],
      split: {},
      localStorageKey: "lsddcx",
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
    },
    {
      tplid: "mob-query-date",
      query: [0],
      style: {
        "border": "0"
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
        style: {},
        title: {
          field: "392",
          style: {}
        },
        code: {
          field: "391",
          style: {}
        },
        table: {
          style: {},
          cols: [
            [
              {
                title: "订单状态",
                field: "147"
              },
              {
                title: "委托数量",
                field: "414"
              }
            ],
            [
              {
                title: "交易金额",
                field: "405"
              },
              {
                title: "委托时间",
                field: "143"
              }
            ],
          ]
        }
      }
    }
  ]
}