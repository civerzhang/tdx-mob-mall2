/*
  日期处理函数
*/

/*
  计算2个日期字符串间的间隔天数
*/
export const getSpanDay = (dateString1, dateString2) => {

  let d1 = stringToDate(dateString1);
  let d2 = stringToDate(dateString2);

  let ss = d1.valueOf() - d2.valueOf();
  let days = ss / 1000 / 24 / 3600;
  // console.log(`--------${days}-------`);
  return Math.abs(days);
};

const stringToDate = dateString => {

  let str = dateString.replace(/[^0-9]/g, "");  // 去掉非数字字符
  let year = parseInt(str.substr(0, 4));
  let month = parseInt(str.substr(4, 2));
  let day = parseInt(str.substr(6, 2));

  return new Date(year, month - 1, day);
};


/*
  返回日期字符串
*/
export const dateToString = (date, split) => {

  try {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}${split || ""}${month}${split || ""}${day}`;
  }
  catch(e) {
    return date;
  }
};

/*
  获取相对于当天日期的日期
*/
export const getDateStringByDay = day => {

  if(typeof day != "number") {
    day = 0;
  }

  let date = new Date();
  date.setDate(date.getDate() + day);
  return dateToString(date);
};

export const getDateByDay = day => {

  if(typeof day != "number") {
    day = 0;
  }

  let date = new Date();
  date.setDate(date.getDate() + day);
  return date;
};

export const getDateStringByMonth = month => {

  if(typeof month != "number") {
    month = 0;
  }

  let date = new Date();
  date.setMonth(date.getMonth() + month);

  return dateToString(date);
};

export const getDateByMonth = month => {

  if(typeof month != "number") {
    month = 0;
  }

  let date = new Date();
  date.setMonth(date.getMonth() + month);

  return date;
};

if(window) {
  window["getDateStringByDay"] = getDateStringByDay;
  window["getDateStringByMonth"] = getDateStringByMonth;
}