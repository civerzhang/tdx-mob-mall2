> 订单查询逻辑

## mob_list_xxx.js

```
{
  querys: [
    {
      tplid: "mob-bar-tab",
      tabs: [
        { title: "基金", param: { "funcid": "2606" } },
        { title: "银行理财", param: { "funcid": "2258" } }
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
          style: {
            color: "#4696F5"
          }
        },
        urlParam: {
          OpenName: "基金详情",
          OpenUrl: "jjxq.html",
          queryParams: [
            { key: "code", value: "391" }
          ]
        },
        code: {
          field: "391",
          style: {}
        },
        opBtn: {
          name: "赎回",
          style: {
            color: "#4696F5",
            borderColor: "#4696F5"
          },
          urlParam: {
            "OpenName": "基金赎回",
            "OpenType": "native",
            "OpenUrl": "jyhtml/works123/lcsc/otcsh.html?fromsc=1",
            "OpenParam": {
              UrlType: "Absolute",
              WebViewType: "JyURL"
            },
            queryParams: [
              { key: "F402", value: "391" }
            ]
          }
        },
        table: {
          style: {
            marginTop: "5px"
          },
          cols: [
            [
              {
                title: "当前数量",
                field: "10010"
              },
              {
                title: "可用份额",
                field: "410"
              }
            ],
            [
              {
                title: "浮动盈亏",
                field: "204"
              },
              {
                title: "最新市值",
                field: "205"
              }
            ]
          ]
        }
      }
    }
  ]
}
```

`querys` 顶部查询栏目

`items` 显示查询内容部分

## mob_send_xxx.js

类似一般的 `send` 文件操作。