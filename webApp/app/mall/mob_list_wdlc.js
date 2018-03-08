var jumpYzzz = function() {

  __webCallTql.send(
    "tdxOpenNativeModule", 
    {
      OpenID: "Stock.yzzz"
    }, 
    function() {}
  );
}

var mob_list_wdlc = {
  loginPage: "login.html",
  items: [
    {
      tplid: "mob-card-zj",
      index: 0,
      title: {
        name: "理财总资产",
        style: {}
      },
      zj: {
        field: "205",
        style: {},
        format: "2m"
      },
      btn: {
        name: "银证转账",
        style: {},
        urlFunc: jumpYzzz
      },
      style: {}
    },
    {
      tplid: "mob-chart-pie",
      split: {},
      index: 1,
      chart: {
        cc: [
          {
            name: "银行理财",
            color: "#f26a55",
            field: "zjYhlc",
            format: "2m"
          },
          {
            name: "基金",
            color: "#fba62e",
            field: "zjJj",
            format: "2m"
          }
        ],
        style: {
          height: "160px"
        },
        title: "各类资产",
        name: "占比",
        innerSize: "80%"
      }
    },
    {
      tplid: "mob-list-jjxq",
      lines: [
        {
          show: true,
          title: "我的持仓",
          urlParam: {
            OpenName: "我的持仓",
            OpenUrl: "wdcc.html"
          }
        },
        { 
          show: true,
          title: "我的撤单", 
          urlParam: {
            OpenName: "我的撤单",
            OpenUrl: "cd2.html"
          }
        },
        { 
          show: true,
          title: "当日订单查询", 
          subTitle: "普通认申购赎回订单",
          urlParam: {
            OpenName: "当日订单查询",
            OpenUrl: "drddcx.html"
          }
        },
        { 
          show: true,
          title: "历史订单查询", 
          urlParam: {
            OpenName: "历史订单查询",
            OpenUrl: "lsddcx.html"
          }
        },
      ],
      lineStyle: {
        borderBottom: "1px solid #ddd"
      },
      titleStyle: {
        color: "#333"
      },
      image: {
        url: "arrow.png",
        style: {}
      }
    }
  ]
}