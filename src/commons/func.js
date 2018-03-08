import dict from "commons/dict.js";


/*
  币种判断：
    F5710 - 币种名称（人民币，美元，港币）, 
    F132 - 币种名称（人民币 0，美元 1，港币 2）
  盈亏，F204 字段相加
  总市值，F205 字段相加
  总资产：总市值 + 资金余额（F300）
*/
export const computeYk = rows => {

  let zyk = [0, 0, 0];
  let zsz = [0, 0, 0];
  rows.map( row => {
    let bz = row.F132;
    let yk = parseFloat(row.F204);
    let sz = parseFloat(row.F205);
    zyk[bz] += yk;
    zsz[bz] += sz;
  });

  return { zyk, zsz };
};

/*
  通过市场来获取币种类型
*/
export const getBz = market => {

  switch(market) {
    case "3":   //沪B
    case "13":  //股转B
    case "51":  //美股
      return "1"; //美元
    case "2":   //深B
    case "14":  //股转G
    case "27":  //港股
      return "2"; //港币
    case "50":  //台股
      return "13";    //新台币
    default:
      return "0"; //人民币
  }
};

/*
  在 jsonData 数据中添加币种信息
*/
export const addBzToJsonData = jsonData => {

  // 如果已经有了币种信息
  if(jsonData[0]["F132"] != undefined) {
    return jsonData;
  }

  jsonData[0]["F132"] = "0";
  jsonData[1]["F132"] = "币种";
  jsonData.slice(2).map( row => {

    // 这里通过交易所代码获得
    let market = row.F100;
    row.F132 = getBz(market);
  });

  return jsonData;
};

/*
  通过计算持仓，来得到 盈亏，总市值
*/
export const computeCc = jsonData => {

  let zyk = [0, 0, 0];
  let zsz = [0, 0, 0];

  jsonData.slice(2).map( row => {

    let bz = row.F132;
    let yk = parseFloat(row.F204);
    let sz = parseFloat(row.F205);

    zyk[bz] += yk;
    zsz[bz] += sz;
  });

  zyk[0] = zyk[0].toFixed(3);
  zyk[1] = zyk[1].toFixed(3);
  zyk[2] = zyk[2].toFixed(3);

  zsz[0] = zsz[0].toFixed(3);
  zsz[1] = zsz[1].toFixed(3);
  zsz[2] = zsz[2].toFixed(3);

  return { zyk, zsz };
};

/*
  向 104 请求中添加盈亏，市值内容
*/
export const addYkSzToJsonData = (jsonData, addData) => {
  
  let { zyk, zsz } = addData;
  if(jsonData[0].F204 == undefined) {
    jsonData[0].F204 = "0";
    jsonData[1].F204 = "盈亏";
  }
  if(jsonData[0].F205 == undefined) {
    jsonData[0].F205 = "0";
    jsonData[1].F205 = "最新市值";
  }

  jsonData.slice(2).map(row => {

    row.F204 = row.F204 || zyk[row.F132];
    // row.F205 = row.F205 || zsz[row.F132];
    // 基金份额查询时，都是104，返回值不对（市值）
    row.F205 = zsz[row.F132];
  });

  return jsonData;
};

/*
  格式化 uinfo 中的 gddm
*/
export const formatGddmFromUinfo = uinfo => {

  let { gddm } = JSON.parse(uinfo);
  let rows = [];
  gddm.split("|").map( cc => {

    let arr = cc.split("-");
    rows.push({
      zhlb: arr[0],
      gddm: arr[1],
      scname: dict["F125"][arr[0]]
    });
  });

  return [
    { "zhlb": 1, "gddm": 0, scname: 0 },
    { "zhlb": "账户类别", "gddm": "股东代码", "scname": "市场名称" },
    ...rows
  ];
};