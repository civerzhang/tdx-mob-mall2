<template>
  
  <div
    :style="listStyle"
  >
    <component 
      v-for="(row, rowIndex) in item.rows"
      :key="'row-' + rowIndex"
      :is="getWdItem(row)"
      :item="row"
      :data="data"
    />
    <mob-split 
      v-if="item.split"
      :item="item.split"
    />
  </div>

</template>

<script>

return {
  
  data: function() {
    return {};
  },

  methods: {

    getWdItem: function(row) {
      return tdx.getVueComponent(row.tplid);
    }
  },

  computed: {

    listStyle: function() {
      return this.item.style;
    }
  }
}

</script>
