var mob_list_jjlc = {
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
      tplid: "mob-list",
      index: 0,
      bar: {
        icon: {
          style: {
            backgroundColor: "#2E6BB1"
          }
        },
        title: "热销基金",
        more: {
          title: "查看更多",
          urlParam: {
            OpenName: "热销基金",
            OpenUrl: "jjlist.html"
          }
        },
      },
      card: {
        typeField: "pro_type2",
        cardItems: [
          {
            tplid: "mob-card",
            title: {
              field: "pro_name",
              style: {}
            },
            cards: [
              {
                value: "基金",
                class: "card-orange",
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
            { key: "pro_type1", value: "pro_type1"},
            { key: "pro_type2", value: "pro_type2"},
          ]
        }
      }
    }
  ]
};