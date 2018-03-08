/* 

  图标的一些默认配置或者操作

*/

// 线图
export const hcDefConf = {
  
  credits: {
    enabled: false
  },
  colors: [
    "#4696f5", '#7cb5ec', '#434348', 
    '#90ed7d', '#f7a35c', '#8085e9', 
    '#f15c80', '#e4d354', '#2b908f', 
    '#f45b5b', '#91e8e1'
  ],          // 需要添加多个线的颜色
  title: {
    text: null
  },
  yAxis: {
    min: 0,
    labels: {
      style: {
        "color": "#bababa",
        "fontSize": "10px"
      }
    },
    title: {
      text: null
    },
    tickAmount: 10,
    gridLineColor: "#f0f0f0",
    gridLineDashStyle: "ShortDot",
    tickPositioner: function() {
      let ticks = [];
      if(this.dataMax == this.dataMin) {
        ticks = [0, this.dataMax, this.dataMax * 2];
      }
      else {
        let tick = (this.dataMax - this.dataMin) / 5;
        ticks[0] = this.dataMin - tick;
        for(var i = 1; i < 8; i++) {
          ticks[i] = ticks[i - 1] + tick; 
        }
      }

      return ticks.map( t => t.toFixed(4));
    }
  },
  xAxis: {
    tickLength: 0,
    labels: {
      style: {
        "color": "#bababa",
        "fontSize": "10px"
      },
      align: "right",
      enabled: false
    },
    lineColor: "#f0f0f0"
  },
  legend: {
    align: "right",
    verticalAlign: "top",
    floating: true,
    x: 0,
    y: -15,
    symbolRadius: 0,
    symbolWidth: 10,
    symbolHeight: 3,
    itemStyle: {
      "color": "#bababa",
      "fontSize": "10px",
      "lineHeight": "20px"
    }
  },
  plotOptions: {
    line: {
      lineWidth: 1,
      marker: {
        radius: 0
      }
    }
  },
  labels: {
    style: {
      "color": "#bababa",
      "fontSize": "10px"
    }
  }
};

export const defChartConf = {
  credits: {
    enabled: false
  },
  plotOptions: {
    line: {
      lineWidth: 1,
      marker: {
        radius: 0
      }
    }
  },
  labels: {
    style: {
      "color": "#bababa",
      "fontSize": "10px"
    }
  },
  title: {
    style: {
      fontSize: "12px"
    }
  }
}

/*
  双轴 highcharts 配置
*/
export const hcDefConf2 = {
  
  credits: {
    enabled: false
  },
  colors: [
    "#4696f5", '#7cb5ec', '#434348', 
    '#90ed7d', '#f7a35c', '#8085e9', 
    '#f15c80', '#e4d354', '#2b908f', 
    '#f45b5b', '#91e8e1'
  ],          // 需要添加多个线的颜色
  title: {
    text: null
  },
  yAxis: [
    {
      min: 0,
      labels: {
        style: {
          "color": "#bababa",
          "fontSize": "10px"
        }
      },
      title: {
        text: null
      },
      tickAmount: 10,
      gridLineColor: "#f0f0f0",
      gridLineDashStyle: "ShortDot"
    },
    {
      min: 0,
      opposite: true,
      labels: {
        style: {
          "color": "#bababa",
          "fontSize": "10px"
        }
      },
      title: {
        text: null
      },
      tickAmount: 10,
      gridLineColor: "#f0f0f0",
      gridLineDashStyle: "ShortDot"
    }
  ],
  xAxis: {
    tickLength: 0,
    labels: {
      style: {
        "color": "#bababa",
        "fontSize": "10px"
      },
      align: "right",
      enabled: false
    },
    lineColor: "#f0f0f0"
  },
  legend: {
    // align: "right",
    // verticalAlign: "top",
    // floating: true,
    // x: 0,
    // y: -15,
    symbolRadius: 0,
    symbolWidth: 10,
    symbolHeight: 3,
    itemStyle: {
      "color": "#bababa",
      "fontSize": "10px",
      "lineHeight": "20px"
    }
  },
  plotOptions: {
    line: {
      lineWidth: 1,
      marker: {
        radius: 0
      }
    }
  },
  labels: {
    style: {
      "color": "#bababa",
      "fontSize": "10px"
    }
  }
};