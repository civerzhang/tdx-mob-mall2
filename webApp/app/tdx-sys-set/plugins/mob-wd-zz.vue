<template>
  
  <div>
    <div class="tdx-wd-row"
      @click.stop.prevent="rowClick"
    >
      <div class="tdx-wd-left">
        <img 
          class="tdx-wd-icon"
          v-if="item.imageName"
          :src="imageSrc"
        />
        <span
          class="tdx-wd-title"
        >{{item.title}}</span>
      </div>
      <div class="tdx-wd-right">
        <span class="tdx-wd-sub-title">{{getSubTitle}}</span>
        <div class="tdx-wd-arrow"></div>
      </div>
    </div>
    <div 
      class="tdx-wd-dialog-wrapper"
      v-if="dialogShow"
    >
      <div class="tdx-wd-dialog">
        <div class="tdx-wd-dialog-body">
          <div
            v-for="(row, rowIndex) in rows"
            :key="'row-' + rowIndex"
            class="tdx-wd-dialog-row"
            @click.stop.prevent="dialogRowClick(row)"
          >
            <span
              v-for="(field, fIndex) in item.rowFields"
              :key="'field-' + fIndex"
            >{{row[field]}}</span>
          </div>
        </div>
        <div 
          class="tdx-wd-dialog-foot"
          @click.stop.prevent="dialogCaClick"
        >取消</div>
      </div>
    </div>
  </div>

</template>

<script>

return {

  data: function() {
    return {
      dialogShow: false,
      rows: [],
      row: ""
    };
  },

  methods: {

    rowClick: function() {
      this.dialogShow = !this.dialogShow;
    },

    dialogRowClick: function(row) {
      this.dialogShow = false;

      var setValue = this.item.setValue;
      if(typeof setValue == "function") {
        setValue(row, this);
      }
      else {
        this.row = row;
      }
    },

    dialogCaClick: function() {
      this.dialogShow = false;
    },

    getDialogRows: function() {

      var getRows = this.item.getRows;
      if(typeof getRows == "function") {
        getRows(this);
      }
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobWdZz || {};
    },

    _color: function() {
      return this.tdxColor.mobWdZz || {};
    },

    imageSrc: function() {
      return tdx.getImagePathSimple(this.item.imageName);
    },

    getSubTitle: function() {

      var subTitle = this.item.subTitle;
      var getValue = subTitle.getValue;
      var field = subTitle.field;
      var value = subTitle.value;
      if(typeof getValue == "function") {
        return getValue(this.row);
      }
      else if(field) {
        return this.row[this.item.subTitle.field];
      }
      else {
        return value;
      }
    },
    
  },

  mounted: function() {
    this.getDialogRows();
  },

  updated: function() {
    // alert(JSON.stringify(this.rows));
  }
}

</script>