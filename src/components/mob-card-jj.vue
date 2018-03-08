<style scoped>

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>

<template>

<div>
  <div 
    class="card"
    v-if="card.title"
    :style="cardStyle"
  >
    <p
      :style="titleStyle"
    >{{data[card.title.field]}}</p>
    <p
      :style="codeStyle"
    >{{data[card.code.field]}}</p>
    <p
      :style="syValueStyle"
    >{{getFieldValue(data, card.sy.field, card.sy)}}</p>
    <p
      :style="syTitleStyle"
    >{{card.sy.title}}</p>
    <table style="width: 100%">
      <tr>
        <td
          v-for="(col, index) in card.cols"
          :key="`card-td-${index}`" 
          :style="getTdStyle(col)"
        >
          <p
            :style="getTdValueStyle(col)"
          >{{getFieldValue(data, col.field, col)}}</p>
          <p
            :style="tdTitleStyle"
          >{{col.title}}</p>
        </td>
      </tr>
    </table>
  </div>
  <mob-split 
    v-if="item.split"
    :style="item.split.style"
  />
</div>

</template>

<script>

import logger from "commons/logger.js";
import mixins from "commons/mixins.js";
import { getCardItem } from "commons/components.js";

import mobSplit from "components/mob-split.vue";
  
export default {

  mixins: [mixins],
  components: {
    mobSplit
  },
  props: {
    item: {
      require: true
    },
    data: {
      require: true
    }
  },
  data() {
    return {};
  },

  methods: {

    getTdStyle: function(col) {
      return {
        textAlign: col.align || "center"
      };
    },

    getTdValueStyle: function(col) {
      let { tdValue } = this._size;
      let color = this._color;
      let fieldColor = this.getFieldColor(this.data, col.field, 4);
      return $.extend(
        {},
        tdValue,
        color,
        { color: fieldColor }
      );
    }
  },

  computed: {

    card: function() {
      logger.debug(JSON.stringify(getCardItem(this.item, this.data) || {}));
      return getCardItem(this.item, this.data) || {};
    },

    _size: function() {
      return this.tdxSize.mobCardJj || {};
    },

    _color: function() {
      return this.tdxColor.mobCardJj || {};
    },

    cardStyle: function() {
      let { card } = this._size;
      let color = this._color.card;
      return $.extend({}, card, color, this.card.style);
    },

    titleStyle: function() {
      let { title } = this._size;
      let color = this._color.title;
      return $.extend({}, title, color, this.card.title.style);
    },

    codeStyle: function() {
      let { code } = this._size;
      let color = this._color.code;
      return $.extend({}, code, color, this.card.code.style);
    },

    syValueStyle: function() {
      let { syValue } = this._size;
      let color = this._color.syValue;
      let fieldColor = this.getFieldColor(this.data, this.card.sy.field, 4);
      return $.extend(
        {}, 
        syValue, 
        color, 
        this.card.sy.valueStyle, 
        { color: fieldColor }
      );
    },

    syTitleStyle: function() {
      let { syTitle } = this._size;
      let color = this._color.syTitle;
      return $.extend({}, syTitle, color);
    },

    tdTitleStyle: function() {
      let { tdTitle } = this._size;
      let color = this._color.tdTitle;
      return $.extend({}, tdTitle, color);
    }
  }
}

</script>