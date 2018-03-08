var getOpUrlParam = function(data) {
  var status = data["pro_status"];
  var urlParam = [
    {
      OpenName: "申购",
      OpenUrl: "jjsg.html?fromsc=1&PageID=Mobile.OTC.OTCSGTRD",
      queryParams: [
        { key: "F402", value: "pro_code" }
      ],
      requireLogin: 1
    },
    {
      OpenName: "认购",
      OpenUrl: "jjrg.html?fromsc=1&PageID=Mobile.OTC.OTCSGTRD",
      ueryParams: [
        { key: "F402", value: "pro_code" }
      ],
      requireLogin: 1
    }
  ];

  if(status == "1") {
    return urlParam[0];
  }
  else if(status == "2") {
    return urlParam[1];
  }

  return urlParam[0];
}

var mob_list_index = {
  
  items: [
    {
      tplid: "mob-slider-image",
      images: [
        { url: "http://img.ishequ360.com/images/test/banner1@1x.jpeg" },
        { url: "http://img.ishequ360.com/images/test/banner6@1x.jpeg" },
        { url: "http://img.ishequ360.com/images/test/banner3@1x.jpeg" },
      ],
      style: {}
    },
    {
      tplid: "mob-nav-icon",
      navs: [
        {
          url: "nav-dq.png",
          title: "定期",
          urlParam: {
            OpenName: "定期",
            OpenUrl: "dqlc.html"
          }
        },
        {
          url: "nav-hq.png",
          title: "活期"
        },
        {
          url: "nav-jj.png",
          title: "基金",
          urlParam: {
            OpenName: "基金",
            OpenUrl: "jjlc.html"
          }
        }
      ],
      split: {}
    },
    {
      tplid: "mob-card-op",
      split: {},
      index: 0,
      toggleShow: 1,                          // 可选，是否根据数据请求，有隐藏的需求
      split: {},                              // 可选，是否带分隔
      bar: {
        tplid: "mob-bar",
        icon: {
          style: {
            backgroundColor: "#2E6BB1"
          }
        },
        title: "稳健收益",
        subTitle: "安心理财，稳定回报"
      },
      card: {                                 // 卡片区域
        title: {                              // 卡片标题
          field: "pro_name",
          style: {}
        },
        cards: [                              // label 部分配置
          {
            field: "pro_type2_name",
            class: "card-blue",
            style: {}
          },
          {
            field: "risk_level_name",
            class: "card-gray",
            style: {}
          }
        ],
        sy: {
          name: "七日年化收益",
          nameStyle: {},
          field: "qrnhsy",
          fieldStyle: {},
          format: "2%"
        },
        op: {
          name: "立即购买",
          style: {},
          urlParam: getOpUrlParam
        },
        urlParam: {                           // 点击卡片部分跳转配置
          OpenName: "产品详情",
          OpenUrl: "jjxq.html",
          queryParams: [
            { key: "code", value: "pro_code" },
            { key: "pro_type1", value: "pro_type1"},
            { key: "pro_type2", value: "pro_type2"},
          ]
        }
      }
    },
    {
      tplid: "mob-ad",
      url: "banner.png",
      split: {}
    },
    {
      tplid: "mob-list",
      index: 1,
      bar: {
        title: "大家都在看",
        subTitle: "最热门产品"
      },
      card: {
        tplid: "mobCard",
        typeField: "pro_type2",
        cardItems: [
          {
            typeValue: ["12"],
            title: {
              field: "pro_name",
              style: {}
            },
            cards: [
              {
                value: "基金",
                field: "pro_type2_name",
                class: "card-blue",
                style: {}
              },
              {
                field: "risk_level_name",
                class: "card-gray",
                style: {}
              }
            ],
            cols: [
              { field: "jnzf", title: "今年以来涨幅", format: "2%" },
              { field: "nav", title: "最新净值", format: ".4f" },
              { field: "qgje", title: "起购金额", format: ".0f", surfix: "元" }
            ]
          }
        ],
        urlParam: {
          OpenName: "产品详情",
          OpenUrl: "jjxq.html",
          queryParams: [
            { key: "code", value: "pro_code" },
            { key: "pro_type1", value: "pro_type1" },
            { key: "pro_type2", value: "pro_type2" }
          ]
        }
      }
    },
    // {
    //   tplid: "mob-form-input2",
    //   index: 1
    // }
  ],
}