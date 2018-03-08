/*

  给出一些字段的颜色信息

*/

import { color } from "commons/url.js";
import { mmbzColor } from "commons/dict.js";

const skin = color;
const tdxColor = window[`tdx_color_${skin}`] || window[`tdx_color`] || {};

/*
  获取颜色

  @params { Object } row, 行记录
  @params { Array|String } colorSet, 颜色配置值
  @params { String } field, 字段 id 

  @returns { String } 返回颜色的字符串
*/
const getColor = (row, colorSet, field) => {

  let color;

  // 如果 colorSet 的配置是个对象
  if(typeof colorSet == "object") {

    // 先通过第3个字段来判断颜色类别
    switch(colorSet[2]) {
      
      // 盈亏
      case 2:
        if(parseFloat(row.F204) > 0 || parseFloat(row.F5540) > 0) {
          color = colorSet[0];
        }
        else if(parseFloat(row.F204) < 0 || parseFloat(row.F5540) < 0) {
          color = colorSet[1];
        }
        break;

      // 和自身的值进行比较，大于 0 ，小于 0
      case 3: 
        if(parseFloat(row[field]) > 0) {
          color = colorSet[0];
        }
        else if(parseFloat(row[field]) < 0) {
          color = colorSet[1];
        }
        break;

      // 默认是买卖
      default:
        color = colorSet[mmbzColor[row.F130]];
        break;
    }

    return color;
  }

  return colorSet;
};


/*

  获取弹出框中的字段颜色配置

*/
const getFieldColorDialog = (row, field) => {
  let colorSet = tdxColor.mobRowDetail && tdxColor.mobRowDetail.fieldColor;
  return getColor(row, colorSet && colorSet[field], field);
};

/*
  
  获取普通列表中的个别字段颜色配置

  @params { Object } row, 行记录
  @params { String } field, 字段 id
*/
const getFieldColorInList = (row, field) => {
  let colorSet = tdxColor.mobList && tdxColor.mobList.fieldColor || {};
  return getColor(row, colorSet && colorSet[field], field);
};

const getFieldColorZjgfCc = (row, field) => {
  let colorSet = tdxColor.mobZjgfCc && tdxColor.mobZjgfCc.fieldColor || {};
  return getColor(row, colorSet && colorSet[field], field);
};

const getFieldColorZjgfZj = (row, field) => {
  let colorSet = tdxColor.mobZjgfZj && tdxColor.mobZjgfZj.fieldColor || {};
  return getColor(row, colorSet && colorSet[field], field);
};

const getFieldColorCard = (row, field) => {
  let colorSet = tdxColor.mobCard && tdxColor.mobCard.fieldColor || {};
  return getColor(row, colorSet && colorSet[field], field);
}

/*

  返回字段的颜色

  @params { Object } row 行记录
  @params { String } field 字段内容
  @params { Number } type 是弹出框的样式，
                      0|空 - 详情弹出框
                      1 - 普通列表
                      2 - 持仓列表
                      3 - 持仓上方资金区域
                      4 - card 类型的字段颜色

*/
export const getFieldColor = (row, field, type) => {

  // mob-row-detail
  if(type == undefined || type == 0) {
    return getFieldColorDialog(row, field);
  }

  // mob-list
  else if(type == 1) {
    return getFieldColorInList(row, field);
  }

  // mob-zjgf-cc
  else if(type == 2) {
    return getFieldColorZjgfCc(row, field);
  }

  // mob-zjgf-zj
  else if(type == 3) {
    return getFieldColorZjgfZj(row, field);
  }

  else if(type == 4) {
    return getFieldColorCard(row, field);
  }

  return;
};