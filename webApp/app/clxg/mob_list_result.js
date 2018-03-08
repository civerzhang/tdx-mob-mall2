var mob_list_result = {
  top: [
    {
      tplid: "mob-clxg-tj",
      op: 1,
    }
  ],
  items: [
    {
      tplid: "mob-clxg-list",
      index: 0
    }
  ],
  bottom: [
    {
      tplid: "mob-form-button",
      btns: [
        {
          // name: "添加自选",
          getBtnName: function(data, form) {
            if(!form.fz) return "添加自选";
            return "添加" + form.fz.Name;
          },

          urlFunc: function(data, form, vm) {
            
            var rows = form.rows || [];
            var ckList = form.ckList || [];
            var zxgList = [];
            var zxgFz = form.fz && form.fz.GroupName;
            ckList.map(function(ck, index) {
              if(!!ck && rows[index]) {
                var row = rows[index];
                zxgList.push([row.setcode, row.code]);
              }
            });

            if(zxgList.length == 0) {
              tdxAlert("请选择要添加的自选代码");
              return;
            }
            
            // tdxAlert("你点击了我!");
            __webCallTql.send("tdxAddZXG", {
              "StkInfo": zxgList,
              "GroupName": zxgFz || ""
            }, function() {});

            tdxAlert("添加自选成功", function() {
              vm.event.$emit("mob-clxg-tj-tjzx", false);
            });
          },

          style: {
            borderTopWidth: "1px",
            borderTopStyle: "solid"
          }
        }
      ],
      showFunc: function(flag) {
        return !!flag;
      }
    }
  ]
}