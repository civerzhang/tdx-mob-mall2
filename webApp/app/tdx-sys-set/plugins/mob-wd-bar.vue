<template>
  
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
      <div class="tdx-wd-arrow"></div>
    </div>
  </div>

</template>

<script>

return {

  methods: {

    rowClick: function() {
      var click = this.item.click;
      var urlParam = this.item.urlParam;
      if(typeof click == "function") {
        click();
      }
      else if(urlParam) {
        var defParam = {
          OpenName: "undefined title",
          OpenType: "native",
          OpenUrl: "",
          OpenParam: {
            UrlType: "Relative",
            WebViewType: __tdxMobSystem == "Android" ? "JyURL" : "LocalURL"
          }
        };
        __webCallTql.send("tdxOpenUrl", $.extend(true, {}, defParam, urlParam));
      }
    }
  },

  computed: {

    iconPath: function() {
      return tdx.getImagePathSimple(this.item.imageName);
    }
  }
}

</script>
