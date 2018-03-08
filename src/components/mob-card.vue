<style scoped>

.card {
  border-bottom: 1px solid #ddd;
}

.card-title {
  display: flex;
  align-items: center;
}

</style>

<template>
  <div>
    <div class="card"
      :style="cardStyle"
      @click.stop.prevent="cardClick"
    >
      <div class="card-title">
        <span
          :style="titleStyle"
        >{{data[card.title.field]}}</span>
        <span v-for="(cc, index) in card.cards"
          :key="`mob-card-label-${index}`"
          :class="cc.class"
          :style="cc.style"
        >{{cc.value || data[cc.field]}}</span>
      </div>
      <table style="width: 100%">
        <tr>
          <td v-for="(col, index) in card.cols"
            :key="`mob-card-td-${index}`"
          >
            <p
              :style="getTdValueStyle(col)"
            >{{getFieldValue(data, col.field, col)}}{{col.surfix}}</p>
            <p
              :style="tdTitleStyle"
            >{{col.title}}</p>
          </td>
        </tr>
      </table>
    </div>
    <mob-split 
      v-if="card.split"
      :style="card.split.style"
    />
  </div>
</template>

<script>

import mixins from "commons/mixins.js";
import { __webCallTqlWrapper } from "commons/req.js";
import { getCardItem } from "commons/components.js";
  
import mobSplit from "components/mob-split.vue";

export default {

  mixins: [mixins],
  props: {
    item: {
      require: true
    },
    data: {
      require: true,
      default: {}
    }
  },
  data() {
    return {};
  },

  methods: {

    cardClick: function() {

      if(this.item.urlParam) {
        __webCallTqlWrapper(
          "tdxOpenUrl", 
          this.item.urlParam, 
          () => {},
          this.data
        );
      }
    },

    getTdValueStyle: function(col) {

      let { tdValue } = this._size;
      let color = this._color.tdValue;
      let fieldColor = this.getFieldColor(this.data, col.field, 4);
      return $.extend({}, tdValue, color, { color: fieldColor });
    }
  },

  computed: {

    _size: function() {
      return this.tdxSize.mobCard || {};
    },

    _color: function() {
      return this.tdxColor.mobCard || {};
    },

    card: function() {
      return getCardItem(this.item, this.data);
    },

    cardStyle: function() {
      let { card } = this._size;
      let color = this._color.card;
      return $.extend({}, card, color, this.card.style);
    },

    titleStyle: function() {
      let { title } = this._size;
      let color = this._color.title;
      return $.extend({}, title, color);
    },

    tdTitleStyle: function() {
      let { tdTitle } = this._size;
      let color = this._color.tdTitle;
      return $.extend({}, tdTitle, color);
    },
  }
}

</script>