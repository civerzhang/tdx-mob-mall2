/*

  获取字段字体大小，和格式化字段内容
*/
import { toMoneyFormat } from "commons/transvalue.js";

const tdxSize = window[`tdx_size`] || {};

/*
  fontSize 和字体的实际大小对照结构

  汉字大小  1:1
  数字大小  2:3
*/
const getHzWidth = fontSize => {
  return fontSize;
};

const getDigitWidth = fontSize => {
  return parseInt(2 / 3 * fontSize);
};

/*
  判断是否是数字
*/ 
const isDigit = value => {

  if(typeof value == "number") {
    value = value.toString();
  }

  let regNum = /[a-zA-Z\.:\-0-9]*/;
  return value.match(regNum)[0].length == value.length;
};

/*
  获取列表中的字体大小

  @param { Object } row 行记录
  @param { String } field 字段id
  @param { Number } width 列宽度
  @param { Nuber } type 组件类型
                  0|空 详情弹框
                  1 - 普通列表（mobList）
                  2 - 持仓列表
                  3 - 持仓资金
  @param { Number } tr 第0行字段，还是第1行字段  1 - 零行字段，2 - 一行字段
*/
const getFieldSizeMobList = (row, field, width, tr) => {

  let sizeSet = tdxSize.mobList && tdxSize.mobList.fieldSize || {};
  let charSize = tdxSize.mobList && tdxSize.mobList[`td${tr - 1}`] && tdxSize.mobList[`td${tr - 1}`].fontSize;
  return getSize(row[field], sizeSet[field] || charSize, width);
};

/*
  获取 mob-zjgf-cc 中内容的字体大小
*/
const getFieldSizeMobZjgfCc = (row, field, width, tr) => {
  let fieldSize = tdxSize.mobZjgfCc && tdxSize.mobZjgfCc.fieldSize || {};
  let size = tdxSize.mobZjgfCc && tdxSize.mobZjgfCc[`td${tr - 1}`] && tdxSize.mobZjgfCc[`td${tr - 1}`].fontSize;
  return getSize(row[field], fieldSize[field] || size, width);
};

const getFieldSizeMobZJgfZj = (row, field, width) => {

  let zjgfZj = tdxSize.mobZjgfZj || {};
  let fieldSize = zjgfZj.fieldSize || {};
  let size = zjgfZj.tdValue && zjgfZj.tdValue.fontSize;
  return getSize(row[field], fieldSize[field] || size, width);
};

const getSize = (value, fontSize, width) => {

  if(value == undefined || fontSize == undefined || width == undefined) {
    return "";
  }

  let isNum = isDigit(value);
  let size = parseInt(fontSize);

  // value 去掉空格
  value = value.toString().replace(/\s/g, "");

  let wd;
  if(isNum) {
    wd = getDigitWidth(size);
  }
  else {
    wd = getHzWidth(size);
  }

  while(size > 10 && value.length * wd > width) {
    size --;
    if(isNum) {
      wd = getDigitWidth(size);
    }
    else {
      wd = getHzWidth(size);
    }
  }

  return size;
};

/*
  
  定义字段字体大小

  type:

    0 - 详情界面字体大小计算

    1 - 列表界面字体大小计算

    2 - 列表第二行字体大小

*/
export const getFontSize = (row, field, width, type, tr) => {

  // mob-list
  if(type == 1) {
    return getFieldSizeMobList(row, field, width, tr);
  }

  // mob-zjgf-cc
  else if(type == 2) {
    return getFieldSizeMobZjgfCc(row, field, width, tr);
  }

  // mob-zjgf-zj
  else if(type == 3) {
    return getFieldSizeMobZJgfZj(row, field, width, tr);
  }

  return "";
};