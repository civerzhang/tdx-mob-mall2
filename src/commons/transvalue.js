/*

  取字段内容处理

*/

import dict from "commons/dict.js";

/*

  获取字段内容

  @params { Object } row, 请求行记录
  @params { String } field, 字段id
  @params { Object } col, 字段配置
*/
export const getValue = (row, field, col) => {

  if(row == undefined || field == undefined || row[field] == undefined) {
    return "--";
  }

  // 如果字段有字典翻译，先做字典翻译
  let value = dict[field] && dict[field][row[field]];
  value = value == undefined ? row[field] : value;

  // 如果是 131 字段，就是买卖标志字段翻译，这里可能需要折行处理
  if(field == "F131") {
    value = getMmlxContent(value, col);
  }

  // 如果有 format 配置，进行 format 处理
  if(col && col.format) {
    value = formatValueType(value, col.format);
  }

  if(col && col.suffix) {
    value = `${value}${col.suffix}`;
  }

  return value;
}

/*
  买卖标志字段进行折行处理
*/
const getMmlxContent = (value, col) => {

  if(col && col.width) {

    // 以 14 号字体，来做折行判断
    value = value.replace(/\s/g, "");
    let ss = 14;
    let len = value.length;
    let index = 0;
    if(len * ss > col.width) {

      if(len == 10) {
        index = 6;
      }
      else {
        index = Math.ceil(len / 2);
      }
      return `${value.substr(0, index)}<br>${value.substr(index)}`;
    }
  }

  // 如果没有指定宽度或者宽度够不用折行
  return value;
}

/*

  格式化数据
*/
export const formatValueType = (value, type) => {

  if(value == -999) {
    return "--";
  }

  if(!type) {
    return value;
  }

  // 浮点型，小数
  let matchF = type.match(/^\.(\d)f$/);
  if(matchF) {
    let num = matchF[1];
    return parseFloat(value).toFixed(num);
  }

  // 金钱
  let matchM = type.match(/^(\d)m$/);
  if(matchM) {
    let num = matchM[1];
    return toMoneyFormat(value, num);
  }

  // 百分比
  let matchP = type.match(/^(\d)%$/);
  if(matchP) {
    let num = matchP[1];
    let p = parseFloat(value).toFixed(num);
    return `${p}%`;
  }

  // 需要乘以 100 的百分比
  let matchP2 = type.match(/^(\d)%%$/);
  if(matchP2) {
    let num = matchP2[1];
    let p = parseFloat(value * 100).toFixed(num);
    return `${p}%`;
  }

  // 人数,大市值格式化                                                                                                                                                                    
  let matchBp = type.match(/^\.(\d)bp$/);
  if(matchBp) {
    let num = matchBp[1];
    let p = parseFloat(value).toFixed(num);

    // 亿
    if(p > 100000000) {
      return `${(p / 100000000).toFixed(num)}亿`;
    }
    else if( p > 10000) {
      return `${(p / 10000).toFixed(num)}万`;
    }
    else {
      return p;
    }
  }

  return value;
}

export const toMoneyFormat = (num, dotNum) => {

  // 数字化，3位小数处理
  if(typeof num == "string") {
    num = parseFloat(num);
  }

  if(isNaN(num)) {
    return "--";
  }

  num = num.toFixed(dotNum);

  let x = num.split(".");
  let x0 = x[0];
  let x1 = x[1];

  // 这里把 x0 如果为负数的情形去掉
  let x2 = "";
  if(x0[0] == "-") {
    x2 = "-";
    x0 = x0.substr(1);
  }

  let result = "";
  let re = /\d{3}$/;
  while( re.test(x0)) {

    result = `${RegExp.lastMatch}${result}`;
    if( x0 != RegExp.lastMatch) {
      result = `,${result}`;
      x0 = RegExp.leftContext;
    }
    else {
      x0 = "";
      break;
    }
  }

  if(x0) {
    result = `${x0}${result}`;
  }

  return `${x2}${result}.${x1}`;
};