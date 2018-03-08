<template>

  <div
    v-if="data"
  >
    <div
      :style="rowStyle"
      :class="getClassName('box')"
    >
      <div :style="rowItem">
        <span :style="title">今年以来涨幅</span>
        <div :style="jnzfStyle">{{getFieldValue(data, jnzf.field, jnzf)}}</div>
      </div>
      <div :style="rowItem">
        <span :style="title">日涨幅（{{data["pro_begin_date"]}}）</span>
        <div :style="rzfStyle">{{getFieldValue(data, rzf.field, rzf)}}</div>
      </div>
    </div>
    <div :style="cardRow">
      <div v-if="data['pro_type2_name']" class="card-blue">{{data["pro_type2_name"]}}</div>
      <div v-if="data['risk_level_name']" class="card-gray">{{data["risk_level_name"]}}</div>
    </div>
    <mob-split 
      v-if="item.split"
      :item="item.split"
    />
  </div>

</template>

item, data, event

<script>

return {
  
  data: function() {
    return {
      jnzf: {
        field: "jnzf",
        format: "2%"
      },
      rzf: {
        field: "rzf",
        format: "2%"
      }
    }
  },

  methods: {

    getZfStyle: function(field) {
      var color = this.getFieldColor(this.data, field, 4);
      return {
        color: color,
        fontSize: "26px",
        lineHeight: "35px"
      };
    }
  },

  computed: {

    rowStyle: function() {
      return {
        display: "flex",
        alignItems: "center",
        padding: "8px 15px 0 15px"
      }
    },

    rowItem: function() {
      return {
        flex: "1 1 auto"
      }
    },

    title: function() {
      return {
        color: "rgba(0, 0, 0, 0.5)",
        lineHeight: "26px"
      }
    },

    rzfStyle: function() {
      return this.getZfStyle(this.rzf.field);
    },

    jnzfStyle: function() {
      return this.getZfStyle(this.jnzf.field);
    },

    cardRow: function() {
      return {
        padding: "8px 13px"
      }
    },
  },

  updated: function() {
    console.log('----------');
    console.log(this.data);
    console.log('----------');
  },

  mounted: function() {
    console.log('----------');
    console.log(this.data);
    console.log('----------');
  }
}

</script>

