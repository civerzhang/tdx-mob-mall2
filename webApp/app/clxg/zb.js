!function() {

// 市场指标
var sczb = [
  [
    { title: "全部", index: "domain:0" },
    { title: "沪A", index: "domain:1" },
    { title: "深A", index: "domain:2" },
  ],
  [
    { title: "主板", index: "domain:3" },
    { title: "中小", index: "domain:4" },
    { title: "创业", index: "domain:5" }
  ]
];

// 财务指标
var cwzb = [
  [
    [
      { title: "市盈率", value: "小于0", index: "cw00:0", format: ".2f" },
      { title: "市盈率", value: "0~10", index: "cw00:1", format: ".2f" },
      { title: "市盈率", value: "10~20", index: "cw00:2", format: ".2f" },
      { title: "市盈率", value: "20~50", index: "cw00:3", format: ".2f" },
      { title: "市盈率", value: "50~100", index: "cw00:4", format: ".2f" },
      { title: "市盈率", value: "大于100", index: "cw00:5", format: ".2f" },
      { title: "市盈率", value: "自定义", index: "cw00:", format: ".2f", type: "zdy", text: "自定义" }
    ],
    [
      { title: "市净率", value: "小于0", index: "cw01:0", format: ".2f" },
      { title: "市净率", value: "0~1", index: "cw01:1", format: ".2f" },
      { title: "市净率", value: "1~3", index: "cw01:2", format: ".2f" },
      { title: "市净率", value: "3~5", index: "cw01:3", format: ".2f" },
      { title: "市净率", value: "5~10", index: "cw01:4", format: ".2f" },
      { title: "市净率", value: "大于10", index: "cw01:5", format: ".2f" },
      { title: "市净率", value: "自定义", index: "cw01:", format: ".2f", type: "zdy", text: "自定义" }
    ],
    [
      { title: "每股净资产", value: "破净股", index: "cw02:0", format: ".2f" },
      { title: "每股净资产", value: "1~3元", index: "cw02:1", format: ".2f" },
      { title: "每股净资产", value: "3~5元", index: "cw02:2", format: ".2f" },
      { title: "每股净资产", value: "5~10元", index: "cw02:3", format: ".2f" },
      { title: "每股净资产", value: "10~20元", index: "cw02:4", format: ".2f" },
      { title: "每股净资产", value: "大于20元", index: "cw02:5", format: ".2f" },
      { title: "每股净资产", value: "", index: "cw02:", format: ".2f", type: "zdy", dw: "元", text: "自定义" }
    ]
  ],
  [
    [
      { title: "市销率", value: "小于1", index: "cw03:0", format: ".2f" },
      { title: "市销率", value: "1~3", index: "cw03:1", format: ".2f" },
      { title: "市销率", value: "3~10", index: "cw03:2", format: ".2f" },
      { title: "市销率", value: "10~20", index: "cw03:3", format: ".2f" },
      { title: "市销率", value: "20~50", index: "cw03:4", format: ".2f" },
      { title: "市销率", value: "大于50", index: "cw03:5", format: ".2f" },
      { title: "市销率", value: "", index: "cw03:", format: ".2f", type: "zdy", text: "自定义" }
    ],
    [
      { title: "每股收益", value: "小于0元", index: "cw04:0", format: ".2f" },
      { title: "每股收益", value: "0~0.5元", index: "cw04:1", format: ".2f" },
      { title: "每股收益", value: "0.5~1元", index: "cw04:2", format: ".2f" },
      { title: "每股收益", value: "1~3元", index: "cw04:3", format: ".2f" },
      { title: "每股收益", value: "3~5元", index: "cw04:4", format: ".2f" },
      { title: "每股收益", value: "大于5元", index: "cw04:5", format: ".2f" },
      { title: "每股收益", value: "", index: "cw04:", format: ".2f", type: "zdy", dw: "元", text: "自定义" }
    ],
    [
      { title: "每股现金流", value: "小于0元", index: "cw05:0", format: ".2f" },
      { title: "每股现金流", value: "0~0.25元", index: "cw05:1", format: ".2f" },
      { title: "每股现金流", value: "0.25~0.5元", index: "cw05:2", format: ".2f" },
      { title: "每股现金流", value: "0.5~1元", index: "cw05:3", format: ".2f" },
      { title: "每股现金流", value: "1~3元", index: "cw05:4", format: ".2f" },
      { title: "每股现金流", value: "大于2元", index: "cw05:5", format: ".2f" },
      { title: "每股现金流", value: "", index: "cw05:", format: ".2f", type: "zdy", dw: "元", text: "自定义" }
    ],
  ],
  [
    [
      { title: "净利润率", value: "小于0", index: "cw06:0", format: "2%%" },
      { title: "净利润率", value: "0~25%", index: "cw06:1", format: "2%%" },
      { title: "净利润率", value: "25%~50%", index: "cw06:2", format: "2%%" },
      { title: "净利润率", value: "50%~100%", index: "cw06:3", format: "2%%" },
      { title: "净利润率", value: "100%~200%", index: "cw06:4", format: "2%%" },
      { title: "净利润率", value: "大于200%", index: "cw06:5", format: "2%%" },
      { title: "净利润率", value: "", index: "cw06:", format: "2%%", type: "zdy", dw: "%", text: "自定义" }
    ],
    [
      { title: "净资产收益率", value: "小于0", index: "cw07:0", format: "2%%" },
      { title: "净资产收益率", value: "0~3%", index: "cw07:1", format: "2%%" },
      { title: "净资产收益率", value: "3%~10%", index: "cw07:2", format: "2%%" },
      { title: "净资产收益率", value: "10%~20%", index: "cw07:3", format: "2%%" },
      { title: "净资产收益率", value: "20%~50%", index: "cw07:4", format: "2%%" },
      { title: "净资产收益率", value: "大于50%", index: "cw07:5", format: "2%%" },
      { title: "净资产收益率", value: "", index: "cw07:", format: "2%%", type: "zdy", dw: "%", text: "自定义" }
    ],
    [
      { title: "资产负债率", value: "小于10%", index: "cw08:0", format: "2%%" },
      { title: "资产负债率", value: "10%~20%", index: "cw08:1", format: "2%%" },
      { title: "资产负债率", value: "20%~30%", index: "cw08:2", format: "2%%" },
      { title: "资产负债率", value: "30%~50%", index: "cw08:3", format: "2%%" },
      { title: "资产负债率", value: "50%~75%", index: "cw08:4", format: "2%%" },
      { title: "资产负债率", value: "大于75%", index: "cw08:5", format: "2%%" },
      { title: "资产负债率", value: "", index: "cw08:", format: "2%%", type: "zdy", dw: "%", text: "自定义" }
    ],
  ],
  [
    [
      { title: "净利润增长率", value: "小于0", index: "cw09:0", format: "2%%" },
      { title: "净利润增长率", value: "0%~10%", index: "cw09:1", format: "2%%" },
      { title: "净利润增长率", value: "10%~30%", index: "cw09:2", format: "2%%" },
      { title: "净利润增长率", value: "30%~100%", index: "cw09:3", format: "2%%" },
      { title: "净利润增长率", value: "100%~200%", index: "cw09:4", format: "2%%" },
      { title: "净利润增长率", value: "大于200%", index: "cw09:5", format: "2%%" },
      { title: "净利润增长率", value: "", index: "cw09:", format: "2%%", type: "zdy", dw: "%", text: "自定义" }
    ],
    [
      { title: "营业收入增长率", value: "小于0", index: "cw10:0", format: "2%%" },
      { title: "营业收入增长率", value: "0%~10%", index: "cw10:1", format: "2%%" },
      { title: "营业收入增长率", value: "10%~30%", index: "cw10:2", format: "2%%" },
      { title: "营业收入增长率", value: "30%~100%", index: "cw10:3", format: "2%%" },
      { title: "营业收入增长率", value: "100%~200%", index: "cw10:4", format: "2%%" },
      { title: "营业收入增长率", value: "大于200%", index: "cw10:5", format: "2%%" },
      { title: "营业收入增长率", value: "", index: "cw10:", format: "2%%", type: "zdy", dw: "%", text: "自定义" }
    ],
    [
      { title: "每股未分配利润", value: "小于0", index: "cw11:0", format: ".2f" },
      { title: "每股未分配利润", value: "0-1元", index: "cw11:1", format: ".2f" },
      { title: "每股未分配利润", value: "1-3元", index: "cw11:2", format: ".2f" },
      { title: "每股未分配利润", value: "3-5元", index: "cw11:3", format: ".2f" },
      { title: "每股未分配利润", value: "5-10元", index: "cw11:4", format: ".2f" },
      { title: "每股未分配利润", value: "大于10元", index: "cw11:5", format: ".2f" },
      { title: "每股未分配利润", value: "", index: "cw11:", format: ".2f", type: "zdy", dw: "元", text: "自定义" }
    ],
  ],
  [
    [
      { title: "每股股利", value: "小于0.2元", index: "cw12:0", format: ".2f" },
      { title: "每股股利", value: "0.2-0.5元", index: "cw12:1", format: ".2f" },
      { title: "每股股利", value: "0.5-1元", index: "cw12:2", format: ".2f" },
      { title: "每股股利", value: "大于1元", index: "cw12:3", format: ".2f" },
      { title: "每股股利", value: "", index: "cw12:", format: ".2f", type: "zdy", dw: "元", text: "自定义" }
    ]
  ]
];

// 行情指标
var hqzb = [
  [
    [
      { title: "现价", value: "1~3元", index: "hq00:0", format: ".2f" }, 
      { title: "现价", value: "3~5元", index: "hq00:1", format: ".2f" },
      { title: "现价", value: "5~10元", index: "hq00:2", format: ".2f" },
      { title: "现价", value: "10~20元", index: "hq00:3", format: ".2f" },
      { title: "现价", value: "20~50元", index: "hq00:4", format: ".2f" },
      { title: "现价", value: "大于50元", index: "hq00:5", format: ".2f" },
      { title: "现价", value: "", index: "hq00:", format: ".2f", type: "zdy", dw: "元", text: "自定义" }
    ],
    [
      { title: "涨幅", subTitle: "日涨幅", value: "日涨幅3%~5%", index: "hq01:0", format: "2%%" },
      { title: "涨幅", subTitle: "日涨幅", value: "日涨幅5%~7%", index: "hq01:1", format: "2%%" },
      { title: "涨幅", subTitle: "日涨幅", value: "日涨幅大于7%", index: "hq01:2", format: "2%%" },
      { title: "涨幅", subTitle: "3日涨幅", value: "3日涨幅大于10%", index: "hq01:3", format: "2%%" }
    ],
    [
      { title: "跌幅", value: "日跌幅3%~5%", index: "hq02:0", format: "2%%" }, 
      { title: "跌幅", value: "日跌幅3%~5%", index: "hq02:1", format: "2%%" },
      { title: "跌幅", value: "日跌幅大于7%", index: "hq02:2", format: "2%%" },
      { title: "跌幅", value: "3日跌幅大于10%", index: "hq02:3", format: "2%%" }
    ],
  ],
  [
    [
      { title: "换手", value: "日换手小于3%", index: "hq03:0", format: "2%%" }, 
      { title: "换手", value: "日换手3%~10%", index: "hq03:1", format: "2%%" },
      { title: "换手", value: "日换手大于10%", index: "hq03:2", format: "2%%" }
    ],
    [
      { title: "量比", value: "小于1", index: "hq04:0", format: ".2f" }, 
      { title: "量比", value: "1~3", index: "hq04:1", format: ".2f" },
      { title: "量比", value: "3~5", index: "hq04:2", format: ".2f" },
      { title: "量比", value: "5~10", index: "hq04:3", format: ".2f" },
      { title: "量比", value: "10~20", index: "hq04:4", format: ".2f" },
      { title: "量比", value: "大于20", index: "hq04:5", format: ".2f" },
      { title: "量比", value: "", index: "hq04:", format: ".2f", type: "zdy", text: "自定义" }
    ],
    [
      { title: "涨速", value: "5分钟涨速小于负3%", index: "hq05:0", format: "2%%" }, 
      { title: "涨速", value: "5分钟涨速负3%~3%", index: "hq05:1", format: "2%%" },
      { title: "涨速", value: "5分钟涨速大于3%", index: "hq05:2", format: "2%%" },
      { title: "涨速", value: "", index: "hq05:", format: "2%%", type: "zdy", dw: "%", text: "自定义" }
    ],
  ],
  [
    [
      { title: "资金流入", value: "当日净流入", index: "hq06:0", format: ".2bp" }, 
      { title: "资金流入", subTitle: "3日净流入", value: "3日净流入", index: "hq06:1", format: ".2bp" },
      { title: "资金流入", subTitle: "5日净流入", value: "5日净流入", index: "hq06:2", format: ".2bp" },
      { title: "资金流入", subTitle: "10日净流入", value: "10日净流入", index: "hq06:3", format: ".2bp" },
      { title: "资金流入", value: "", index: "hq06:", format: ".2bp", type: "zdy", dw: "亿", text: "自定义" },
    ],
    [
      { title: "股东人数", value: "小于0.5万", index: "hq07:0", format: ".2bp" }, 
      { title: "股东人数", value: "0.5~1万", index: "hq07:1", format: ".2bp" },
      { title: "股东人数", value: "1~5万", index: "hq07:2", format: ".2bp" },
      { title: "股东人数", value: "大于5万", index: "hq07:3", format: ".2bp" },
      { title: "股东人数", value: "", index: "hq07:", format: ".2bp", type: "zdy", dw: "万", text: "自定义" }
    ],
    [
      { title: "流通比", value: "小于20%", index: "hq08:0", format: "2%%" }, 
      { title: "流通比", value: "20%~50%", index: "hq08:1", format: "2%%" },
      { title: "流通比", value: "大于50%", index: "hq08:2", format: "2%%" },
      { title: "流通比", value: "全流通", index: "hq08:3", format: "2%%" },
      { title: "流通比", value: "", index: "hq08:", format: "2%%", type: "zdy", dw: "%", text: "自定义" }
    ],
  ],
  [
    [
      { title: "流通市值", value: "小于5亿", index: "hq09:0", format: ".2bp" }, 
      { title: "流通市值", value: "5~10亿", index: "hq09:1", format: ".2bp" },
      { title: "流通市值", value: "10~20亿", index: "hq09:2", format: ".2bp" },
      { title: "流通市值", value: "20~50亿", index: "hq09:3", format: ".2bp" },
      { title: "流通市值", value: "50~100亿", index: "hq09:4", format: ".2bp" },
      { title: "流通市值", value: "大于100亿", index: "hq09:5", format: ".2bp" },
      { title: "流通市值", value: "", index: "hq09:", format: ".2bp", type: "zdy", dw: "亿", text: "自定义" }
    ],
    [
      { title: "总市值", value: "小于20亿", index: "hq10:0", format: ".2bp" }, 
      { title: "总市值", value: "20~50亿", index: "hq10:1", format: ".2bp" },
      { title: "总市值", value: "50~100亿 ", index: "hq10:2", format: ".2bp" },
      { title: "总市值", value: "100~200亿 ", index: "hq10:3", format: ".2bp" },
      { title: "总市值", value: "200~500亿 ", index: "hq10:4", format: ".2bp" },
      { title: "总市值", value: "大于500亿", index: "hq10:5", format: ".2bp" },
      { title: "总市值", value: "", index: "hq10:", format: ".2bp", type: "zdy", dw: "亿", text: "自定义" }
    ],
    [
      { title: "上市天数", value: "小于30天", index: "hq11:0", format: ".0f" }, 
      { title: "上市天数", value: "小于100天", index: "hq11:1", format: ".0f" },
      { title: "上市天数", value: "小于1年", index: "hq11:2", format: ".0f" },
      { title: "上市天数", value: "大于1年", index: "hq11:3", format: ".0f" },
      { title: "上市天数", value: "", index: "hq11:", format: ".0f", type: "zdy", dw: "年", text: "自定义" }
    ],
  ],
  [
    [
      { title: "人均持股", value: "小于5千", index: "hq12:0", format: ".2bp" }, 
      { title: "人均持股", value: "5千~1万", index: "hq12:1", format: ".2bp" },
      { title: "人均持股", value: "1万~5万", index: "hq12:2", format: ".2bp" },
      { title: "人均持股", value: "大于5万", index: "hq12:3", format: ".2bp" },
      { title: "人均持股", value: "", index: "hq12:", format: ".2bp", type: "zdy", dw: "万", text: "自定义" }
    ]
  ]
];

// 技术指标
var jszb = [
  [
    [
      { title: "KDJ", value: "金叉", index: "js00:0" },
      { title: "KDJ", value: "低位金叉", index: "js00:1" },
      { title: "KDJ", value: "高位死叉", index: "js00:2" },
      { title: "KDJ", value: "J值上穿0轴", index: "js00:3" },
      { title: "KDJ", value: "底背离", index: "js00:4" },
      { title: "KDJ", value: "顶背离", index: "js00:5" }
    ],
    [
      { title: "MACD", value: "金叉", index: "js01:0" }, 
      { title: "MACD", value: "二次金叉", index: "js01:1" },
      { title: "MACD", value: "低位金叉", index: "js01:2" },
      { title: "MACD", value: "低位二次金叉", index: "js01:3" },
      { title: "MACD", value: "高位死叉", index: "js01:4" },
      { title: "MACD", value: "红二波", index: "js01:5" }
    ],
    [
      { title: "BOLL", value: "上穿BOLL中轨", index: "js02:0" }, 
      { title: "BOLL", value: "上穿BOLL上轨", index: "js02:1" },
      { title: "BOLL", value: "跌破BOLL中轨", index: "js02:2" },
      { title: "BOLL", value: "跌破BOLL上轨", index: "js02:3" },
      { title: "BOLL", value: "BOLL开口张开", index: "js02:4" },
      { title: "BOLL", value: "BOLL开口缩小", index: "js02:5" }
    ],
  ],
  [
    [
      { title: "CCI", value: "CCI上穿100", index: "js03:0" }, 
      { title: "CCI", value: "CCI下穿100", index: "js03:1" },
      { title: "CCI", value: "CCI指标创新高", index: "js03:2" },
      { title: "CCI", value: "CCI指标创新低", index: "js03:3" },
      { title: "CCI", value: "CCI超买", index: "js03:4" },
      { title: "CCI", value: "CCI超卖", index: "js03:5" }
    ],
    [
      { title: "RSI", value: "RSI金叉", index: "js004:0" }, 
      { title: "RSI", value: "RSI三线金叉", index: "js004:1" },
      { title: "RSI", value: "RSI低位金叉", index: "js004:2" },
      { title: "RSI", value: "RSI1上穿20", index: "js004:3" },
      { title: "RSI", value: "RSI1上穿80", index: "js004:4" },
      { title: "RSI", value: "RSI高位死叉", index: "js004:5" }
    ],
    [
      { title: "WR", value: "WR下穿80", index: "js05:0" }, 
      { title: "WR", value: "WR下穿20", index: "js05:1" },
      { title: "WR", value: "WR超卖", index: "js05:2" },
      { title: "WR", value: "WR超买", index: "js05:3" }
    ],
  ],
  [
    [
      { title: "BIAS", value: "BIAS2小于-6", index: "js06:0" },
      { title: "BIAS", value: "BIAS2大于12", index: "js06:1" }
    ],
    [
      { title: "SKDJ", value: "金叉", index: "js07:0" }, 
      { title: "SKDJ", value: "低位金叉", index: "js07:1" },
      { title: "SKDJ", value: "超买", index: "js07:2" },
      { title: "SKDJ", value: "超卖", index: "js07:3" },
      { title: "SKDJ", value: "底背离", index: "js07:4" },
      { title: "SKDJ", value: "顶背离", index: "js07:5" }
    ],
    [
      { title: "VR", value: "下穿40", index: "js08:0" }, 
      { title: "VR", value: "上穿250", index: "js08:1" },
      { title: "VR", value: "上穿450", index: "js08:2" },
      { title: "VR", value: "低位", index: "js08:3" }
    ],
  ],
  [
    [
      { title: "MTM", value: "上穿0轴", index: "js09:0" }, 
      { title: "MTM", value: "下穿0轴", index: "js09:1" },
      { title: "MTM", value: "金叉", index: "js09:2" },
      { title: "MTM", value: "低位二次金叉", index: "js09:3" },
      { title: "MTM", value: "指标创新高", index: "js09:4" },
      { title: "MTM", value: "指标创新低", index: "js09:5" }
    ],
    [
      { title: "OBV", value: "指标创新高", index: "js10:0" }, 
      { title: "OBV", value: "上移", index: "js10:1" },
      { title: "OBV", value: "下移", index: "js10:2" },
      { title: "OBV", value: "走平", index: "js10:3" },
      { title: "OBV", value: "底背离", index: "js10:4" }
    ],
    [
      { title: "均线", value: "多头排列", index: "js11:0" }, 
      { title: "均线", value: "空头排列", index: "js11:1" },
      { title: "均线", value: "均线粘合", index: "js11:2" },
      { title: "均线", value: "股价站上5日线", index: "js11:3" },
      { title: "均线", value: "MA金叉", index: "js11:4" }
    ]
  ]
];

var xtzb = [
  [
    { title: "旭日东升", index: "xt00:1" },
    { title: "上升通道", index: "xt01:1" },
    { title: "早晨之星", index: "xt02:1" },
  ],
  [
    { title: "曙光初现", index: "xt03:1" },
    { title: "多方炮", index: "xt04:1" },
    { title: "突出重围", index: "xt05:1" },
  ],
  [
    { title: "底部孕线", index: "xt06:1" },
    { title: "双针探底", index: "xt07:1" },
    { title: "三个白武士", index: "xt08:1" },
  ],
  [
    { title: "双飞乌鸦", index: "xt09:1" },
    { title: "尖三兵", index: "xt10:1" },
    { title: "老鸭头", index: "xt11:1" }
  ],
  [
    { title: "揉搓线", index: "xt12:1" },
    { title: "阳包阴", index: "xt13:1" },
    { title: "阴包阳", index: "xt14:1" }
  ],
];

window["zb"] = {
  sczb: sczb,
  cwzb: cwzb,
  hqzb: hqzb,
  jszb: jszb,
  xtzb: xtzb
};

}();