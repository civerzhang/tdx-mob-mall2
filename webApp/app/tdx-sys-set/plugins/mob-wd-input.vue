<template>

  <div>

    <div 
      class="tdx-wd-row"
      @click.stop.prevent="rowClick"
    >
      <div class="tdx-wd-left">
        <div 
          class="tdx-wd-icon"
          v-if="item.imageName"
        >
          <img :src="iconPath" alt="icon" style="width: 100%; height: 100%;">
        </div>
        <span class="tdx-wd-title">{{item.title}}</span>
      </div>
      <div class="tdx-wd-right">
        <span class="tdx-wd-sub-title">{{inputShow}}</span>
        <div class="tdx-wd-arrow"></div>
      </div>
    </div>

    <div
      v-if="dialogShow"
      class="tdx-wd-dialog-wrapper2"
      @touchmove.stop.prevent="doNothing"
      @click.stop.prevent="caBtnClick"
      :id="'dlg' + rn"
    >
      <div
        class="tdx-wd-dialog2"
        @click.stop.prevent="doNothing"
      >
        <div class="tdx-wd-dialog-title">{{item.title}}</div>
        <div class="tdx-wd-dialog-body2">
          <input 
            type="text" 
            class="tdx-wd-dialog-input"
            :placeholder="'请输入' + item.title"
            v-model="inputValue"
            @focus="onInputFocus"
          >
        </div>
        <div class="tdx-wd-dialog-foot2">
          <span
            class="tdx-wd-dialog-btnca"
            @click.stop.prevent="caBtnClick"
          >取消</span>
          <span
            class="tdx-wd-dialog-btnok"
            @click.stop.prevent="okBtnClick"
          >确定</span>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>

return {
  
  data: function() {
    return {
      inputShow: 0,
      dialogShow: false,
      inputValue: ""
    }
  },

  methods: {

    doNothing: function() {},

    caBtnClick: function() {
      this.dialogShow = false;
    },

    okBtnClick: function() {
      this.dialogShow = false;
      var setValue = this.item.setValue;
      if(typeof setValue == "function") {
        setValue(this.inputValue, this);
      }
    },

    onInputFocus: function() {
      setTimeout(function() {
        $(window).scrollTop(150);
      });
    },

    rowClick: function() {
      this.dialogShow = true;
    },

    getInputShow: function() {

      var getValue = this.item.getValue;
      if(typeof getValue == "function") {
        getValue(this);
      }
    }
  },

  mounted: function() {

    this.getInputShow();
  }
}

</script>
