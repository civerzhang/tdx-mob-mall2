/*
  
  转换老的交易配置成新的交易配置


  [
    {
      title: xxx,
      fields: [],
      align: "right|left",
      format: ""
    },

    ...
  ]
*/
import { ds } from "commons/url.js";

const screenWidth = $(window).width() - 20;   // 减去 padding: 0 15px;

export const getConf = () => {
  
  let name = `mob_list_${ds[1]}`;
  let data = window[name];
  return data || {};
};

// 获取列表查询没有数据时的信息
export const getListNoDataInfo = () => {
  return getConf().nodata;
};

const getConfWithF51 = (jsonData) => {

  // 如果接口返回了 F51 字段
  if(jsonData.length > 2 && jsonData[0]["F51"] != undefined) {

    // F51 字段是在第一行记录中返回
    let row = JSON.parse(jsonData[2]["F51"]);

    /*
      这里给出的 cells 的格式和我们直接定义的格式有些区别

      [
        [
          ["F1111", "", "", "", ""],
          ["F1110", "", "", "", ""]
        ],
        [
          [...]
        ],
        ...
      ]

      格式后：

      [
        {
          "F1111": [...],
          "F1110": [...]
        },
        ...
      ]
    */
    let cells = [];
    row.cells.map( cell => {
      let row = {};
      cell.map( cc => {
        row[cc[0]] = {};
      });
      cells.push(row);
    });

    return {
      "heads": row.heads,
      cells
    };
  }

  return getConf();
};

/*
  获取日期配置
*/
export const getDateConf = () => {

  let { date } = getConf();
  date = date || {};
  return {
    direction: date.direction
  };
};

// 获取列表的行信息
export const getListCols = jsonData => {

  // 这里兼容应答中的 F51 字段配置
  let { heads, cells } = getConfWithF51(jsonData);

  let cols = [];
  if(heads && cells) {

    heads.map( (title, index) => {

      let row = {};

      // 标题
      row.title = title;

      // 取值 field，颜色，格式配置（如取整，保留小数点，日期格式）
      let o = cells[index];
      let keys = Object.keys(o);
      if(keys.length > 1) {
        row.fields = [
          {
            id: keys[0],
            format: o[keys[0]][3]
          }, {
            id: keys[1],
            format: o[keys[1]][3]
          }
        ];
      }
      else {
        row.field = {
          id: keys[0],
          format: o[keys[0]][3]
        };
      }
      
      cols.push(row);
    });

  }
  else {

    let objFields = jsonData[0];
    let objTitles = jsonData[1];
    let index = 0;
    for(let key in objFields) {

      // 非隐藏字段
      if(objFields[key] == 0) {

        let row = {};
        index ++;
        if(index <= 4) {
          row.title = objTitles[key];
          row.field = { id: key };
          cols.push(row);
        }
        else {
          break;
        }
      }

    }
  }

  // 确定宽度和对齐方式
  cols.map( (cc, index) => {

    // // 如果有配置
    // if(col) {
    //   cc.width = parseFloat(col[index][0]) / 100 * screenWidth;
    //   cc.align = col[index][1];
    // }

    // // 没有配置
    // else {
    if(index == 0) {
      cc.align = "left";
    }
    else if(index == cols.length - 1) {
      cc.align = "right";
    }
    else {
      cc.align = "center";
    }
    
    cc.width = screenWidth / cols.length;
    // }

  });

  return cols;
};

/*
  把应答格式化成老交易的格式 jsonData
*/
export const formatJsonData = res => {

  try {
    res = JSON.parse(res);
    let rt = [];
    let row1 = {};
    let row2 = {};

    // 报错了
    if(res[2].length == 0) {
      row1.ErrorCode = res[0][0];
      row1.ErrorInfo = res[0][1];
      return [row1];
    }

    res[2].map( dd => {
      row1[dd[1]] = dd[6];
      row2[dd[1]] = dd[2];
    });
    rt.push(row1);
    rt.push(row2);

    res.slice(3).map( value => {
      let row = {};
      res[1].map( (field, index) => {
        row[field] = value[index];
      });
      rt.push(row);
    });

    return rt;
  }
  catch(e) {
    console.error(e);
  }
};

/*

  获取应答的定位串，分页使用
*/
export const getPagePos = res => {

  try {

    res = JSON.parse(res);
    return res[0][4];
  }
  catch(e) {
    console.error(e);
  }
};


/*
  获取新的列表配置，一列固定，其余滚动
*/
export const getListCols2 = jsonData => {

  let { cols1, cols2 } = getConf();
  cols1 = cols1 || [];
  cols2 = cols2 || [];

  // 把已经列出来的key去掉，然后显示后面的内容
  let set = {};
  cols1.map( col => {
    for(let key in col.fields) {
      set[key] = 1;
    }
  });
  cols2.map( col => {
    for(let key in col.fields) {
      set[key] = 1;
    }
  });

  let pos = 0;
  let colTitles = [];
  let colFields = {};
  Object.keys(jsonData[0]).map( field => {

    // 把这个 field push 到
    if(!set[field] && jsonData[0][field] == 0) {
      colFields[field] = {};
      colTitles.push(jsonData[1][field]);
      pos++;
      if(pos == 2) {
        pos = 0;
        cols2.push({
          titles: colTitles,
          fields: colFields
        });
        colTitles = [];
        colFields = {};
      }
    }
  });

  /*
    对 cols1, cols2 的配置添加宽度，对齐方式，颜色控制，字体大小等配置

    默认：

    宽度 screenWidth * 0.25
    对齐方式 第一列居左，中间居中，最后一列居右

    颜色控制在对应的 fields 中配置

    例如：

      {
        titles: [...],
        fields: {
          field0: {
            format: "",   // 格式化
            color: "",    // 颜色
            font: ""      // 字体
          },
          ...
        },
        width: xxx,       // 字段宽度
        align: xxx        // 对齐方式
      }
  */
  let defWidth = screenWidth * 0.25;
  cols1.map( (col, index) => {
    col.width = col.width || defWidth;
    col.align = col.align || (index == 0 ? "left" : "center");
  });
  cols2.map( (col, index) => {
    col.width = col.width || defWidth;
    col.align = col.align || (index == cols2.length - 1 ? "right" : "center");
  });

  // console.log(cols2);

  return { cols1, cols2 };
};


/*
  返回新的 cols1, cols2

  新的列表处理，颜色，大小配置放到 color_set, size_set 中

  @param { Object } conf 包含 cols1, cols2 的配置
  @param { Array } jsonData 返回的记录，格式化后的数据记录
*/
export const getListCols3 = (conf, jsonData) => {

  // 先读返回的数据，去 F51 的内容
  let { heads, cells } = getConfWithF51(jsonData);

  // 如果 F51 返回了内容
  if(heads && cells) {

    conf = transCells({heads, cells});
  }

  // 补全后面的隐藏字段
  conf = addFields(conf, jsonData);

  // 添加宽度
  conf = addWidth(conf);

  return conf;
};

/*
  对每个字段添加宽度 手机宽度的 25%
*/
const addWidth = conf => {

  let { cols1, cols2 } = conf;
  let defWidth = screenWidth * 0.25;
  cols1.map( (col, index) => {
    col.width = col.width || defWidth;
    col.align = col.align || (index == 0 ? "left" : "center");
  });

  cols2.map( (col,index) => {
    col.width = col.width || defWidth;
    col.align = col.align || (index == cols2.length - 1 ? "right" : "center");
  });

  return { cols1, cols2 };
};

/*
  补全隐藏字段

  @params { Object } conf 包含cols1, cols2 的配置
  @params { Array } jsonData 返回数据记录
*/
const addFields = (conf, jsonData) => {

  let { cols1, cols2 } = conf;

  // 把已经列出来的key去掉，然后显示后面的内容
  let set = {};
  cols1.map( col => {
    for(let key in col.fields) {
      set[key] = 1;
    }
  });
  cols2.map( col => {
    for(let key in col.fields) {
      set[key] = 1;
    }
  });

  let pos = 0;
  let colTitles = [];
  let colFields = {};
  Object.keys(jsonData[0]).map( field => {

    // 把这个 field push 到
    if(!set[field] && jsonData[0][field] == 0) {
      colFields[field] = {};
      colTitles.push(jsonData[1][field]);
      pos++;
      if(pos == 2) {
        pos = 0;
        cols2.push({
          titles: colTitles,
          fields: colFields
        });
        colTitles = [];
        colFields = {};
      }
    }
  });

  return { cols1, cols2 };
};

/*
  把孙浩的交易表单配置，转成新的列表配置

  {
    heads: [xxx, xxx, xxx, xxx],
    cells: [
      {"Fxxx": ["", "", ... ], "Fxxx": ["", "", ...]},
      ...
    ]
  }

  ==>

  {
    cols1: [
      {
        titles: ["xxx", "xxxx"],
        fields: {
          "Fxxxx": {},
          ...
        }
      },
      ...
    ],

    cols2: [
      ... 同 cols1
    ]
  }

*/
const transCells = conf => {

  let cols1 = [], cols2 = [];
  let { heads, cells } = conf;

  let titles = [heads[0]];
  let fields = {};
  for(let key in cells[0]) {
    fields[key] = {};
  }
  cols1.push({ titles, fields });
  
  heads.slice(1).map( (head, index) => {

    titles = [head];
    fields = {};
    for(let key in cells[index + 1]) {
      fields[key] = {};
    }
    cols2.push({ titles, fields });
  });

  return { cols1, cols2 };
};