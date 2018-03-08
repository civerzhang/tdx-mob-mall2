/*

  产生随机数

*/

export const getRnHex = () => {
  return parseInt(Math.random() * 10000).toString(16);
}