// 列表的一些公共函数

/* 

  获取列的配置

*/
export const getColStyleLine = col => {

  if(!col) return; 

  let o = {
    webkitBoxPack: "center",
    justifyContent: "center"
  };

  // 对齐方式
  if(col.align == "left") {
    o["webkitBoxPack"] = "start";
    o["justifyContent"] = "flex-start";
  }
  else if(col.align == "right") {
    o["webkitBoxPack"] = "end";
    o["justifyContent"] = "flex-end";
  }

  return o;
}

export const getColStyleColumn = col => {
  let o = {
    "webkitBoxPack": "center",
    "alignItems": "center"
  };

  // 对齐方式
  if(col.align == "left") {
    o["webkitBoxPack"] = "start";
    o["alignItems"] = "flex-start";
  }
  else if(col.align == "right") {
    o["webkitBoxPack"] = "end";
    o["alignItems"] = "flex-end";
  }

  return o;
}