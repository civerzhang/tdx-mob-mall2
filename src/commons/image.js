/*
  获取一些图片的地址
*/

import { color, htmlPath } from "commons/url.js";
import tdxVal from "commons/tdx.js";

const skin = color;

/*
  这个地方配置图片的
*/ 
const rootPath = `${htmlPath}res/`;

/*
  获取操作的图片地址

  例如买入，卖出，行情，转账等

  逐渐废弃掉
*/
export const getOpImagePath = item => {
  return `${rootPath}${item.image}`;
};

/*
  仅仅就是返回图片的地址
*/
export const getImagePathSimple = imageName => {

  if(imageName.indexOf("http") >= 0) {
    return imageName;
  }

  return `${rootPath}${imageName}`;
}

/*
  给个图片名称，返回地址
*/
export const getImagePath = imageName => {
  return `${rootPath}${getImageName(imageName)}`;
};

/*
  获取图片的名称
*/
export const getImageName = imageName => {

  let arr = imageName.split(".");
  if(skin == "black") {
    return `${arr[0]}-black.${arr[1]}`;
  }
  else {
    return imageName;
  }
};

/*
  获取币种图标地址

  例如：持仓界面
*/
export const getBzImagePath = bzType => {

  let url = "";
  bzType = parseInt(bzType) || 0;
  switch(bzType) {

    // 人民币
    case 0:
      url = "cny.png";
      break;
    case 1:
      url = "usd.png";
      break;
    case 2:
      url = "hkd.png";
      break;
    default:
      url = "cny.png";
  }

  return `${rootPath}${url}`;
};

tdxVal("getImagePathSimple", getImagePathSimple);