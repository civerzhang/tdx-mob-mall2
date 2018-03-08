<template>

  <div class="tdx-wd-row">
    <div class="tdx-wd-left">
      <span class="tdx-wd-title">{{item.title}}</span>
    </div>
    <div class="tdx-wd-right">
      <img 
        class="tdx-wd-switch" 
        :src="imagePath" 
        alt="icon"
        @click.stop.prevent="switchClick"
      >
    </div>
  </div>

</template>

<script>

return {

  data: function() {

    return {
      switch: undefined
    }
  },

  methods: {

    switchClick: function() {
      
      var click = this.item.click;
      if(typeof click == "function") {
        click(this);
      }
      else {
        this.switch = !this.switch;
      }
    }
  },
  
  computed: {

    switchOn: function() {

      if(!this.data) return true;
      var flag = this.data[this.item.field];
      return this.switch == undefined ? flag : this.switch;      
    },

    imagePath: function() {
      var index = this.switchOn ? 1 : 0;
      return tdx.getImagePathSimple(this.item.imageNames[index]);
    }
  }
}

</script>
