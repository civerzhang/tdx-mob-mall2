/* 

  组件对象获取函数

*/
import tdxVal from "commons/tdx.js";
import getRegPlugin from "commons/plugin.js";

import mobAd from "components/mob-ad.vue";
import mobBar from "components/mob-bar.vue";
import mobBarTab from "components/mob-bar-tab.vue";
import mobCard from "components/mob-card.vue";
import mobCardOp from "components/mob-card-op.vue";
import mobCardJj from "components/mob-card-jj.vue";
import mobCardZj from "components/mob-card-zj.vue";
import mobList from "components/mob-list.vue";
import mobListPage from "components/mob-list-page.vue";
import mobListJjxq from "components/mob-list-jjxq.vue";
import mobNavIcon from "components/mob-nav-icon.vue";
import mobSliderImage from "components/mob-slider-image.vue";
import mobSplit from "components/mob-split.vue";
import mobChart from "components/mob-chart.vue";
import mobChartBar from "components/mob-chart-bar.vue";
import mobChartPie from "components/mob-chart-pie.vue";
import mobBtnSingle from "components/mob-btn-single.vue";
import mobQueryDate from "components/mob-query-date.vue";
import mobCardDd from "components/mob-card-dd.vue";

import mobForm from "components/mob-form.vue";
import mobFormSpan from "components/mob-form-span.vue";
import mobFormInput from "components/mob-form-input.vue";
import mobFormButton from "components/mob-form-button.vue";
import mobFormXys from "components/mob-form-xys.vue";

const getComponentCommon = id => {

  let mod;

  // 如果自定义了组件，那么直接返回
  mod = getRegPlugin(id);
  if(mod) {
    return mod;
  }

  switch(id) {

    case "mob-ad":
    case "mobAd":
      mod = mobAd; 
      break;
    case "mob-bar":
    case "mobBar":
      mod = mobBar; 
      break;
    case "mob-bar-tab":
    case "mobBarTab":
      mod = mobBarTab; 
      break;
    case "mob-card-jj":
    case "mobCardJj":
      mod = mobCardJj; 
      break;
    case "mob-card-op":
    case "mobCardOp":
      mod = mobCardOp; 
      break;
    case "mob-card":
    case "mobCard":
      mod = mobCard; 
      break;
    case "mob-list":
    case "mobList":
      mod = mobList; 
      break;
    case "mob-nav-icon":
    case "mobNavIcon":
      mod = mobNavIcon; 
      break;
    case "mob-slider-image":
    case "mobSliderImage":
      mod = mobSliderImage; 
      break;
    case "mob-split":
    case "mobSplit":
      mod = mobSplit; 
      break;
    case "mob-list-jjxq":
    case "mobListJjxq":
      mod = mobListJjxq; 
      break;
    case "mob-chart":
    case "mobChart":
      mod = mobChart; 
      break;
    case "mob-chart-bar":
    case "mobChartBar":
      mod = mobChartBar; 
      break;
    case "mob-btn-single":
    case "mobBtnSingle":
      mod = mobBtnSingle; 
      break;
    case "mob-list-page":
    case "mobListPage":
      mod = mobListPage; 
      break;
    case "mob-card-zj":
    case "mobCardZj":
      mod = mobCardZj; 
      break;
    case "mob-chart-pie":
    case "mobChartPie":
      mod = mobChartPie; 
      break;
    case "mob-query-date":
    case "mobQueryDate":
      mod = mobQueryDate;
      break;
    case "mob-card-dd":
    case "mobCardDd":
      mod = mobCardDd;
      break;

    case "mob-form":
    case "mobForm":
      mod = mobForm;
      break;
    case "mob-form-button":
    case "mobFormButton":
      mod = mobFormButton;
      break;
  }

  return mod;
}

export default getComponentCommon;
tdxVal("getVueComponent", getComponentCommon);
/* 

  通过 card 的 tplid 来获取 card
*/
exports.getCard = tplid => {
  
  let mod;

  // 如果自定义了组件，那么直接返回
  mod = getRegPlugin(tplid);
  if(mod) {
    return mod;
  }

  switch(tplid) {

    case "mob-card":
    case "mobCard":
      mod = mobCard;
      break;
    case "mob-card-op":
    case "mobCardOp":
      mod = mobCardOp;
      break;
    case "mob-card-jj":
    case "mobCardJj":
      mod = mobCardJj;
      break;
    case "mob-card-zj":
    case "mobCardZj":
      mod = mobCardZj;
      break;
    case "mob-card-dd":
    case "mobCardDd":
      mod = mobCardDd;
      break;
    default:
      mod = mobCard;
      break;
  }

  return mod;
}

/* 
  获取表单中的数据 item
*/
exports.getFormItem = tplid => {
  
  let mod;

  // 如果自定义了组件，那么直接返回
  mod = getRegPlugin(tplid);
  if(mod) {
    return mod;
  }

  switch(tplid) {

    case "mob-form-input":
    case "mobFormInput":
      mod = mobFormInput;
      break;
    case "mob-form-button":
    case "mobFormButton":
      mod = mobFormButton;
      break;
    case "mob-form-xys":
    case "mobFormXys":
      mod = mobFormXys;
      break;
    default:
      mod = mobFormSpan;
      break;
  }

  return mod;
}

/* 

  card 组件，多个配置切换的时候，返回对应的配置

  @params { Object } item, card 的配置
  @params { Object } data, 行记录
*/
exports.getCardItem = (item, data) => {

  if(!data || !item) return undefined;

  let typeValue = data[item.typeField];
  let card;
  let items = item.cardItems;
  for(let i = 0; i < items.length - 1; i++) {
    let item = items[i];
    if(item.typeValue.indexOf(typeValue) >= 0) {
      card = item;
      break;
    }
  }
  if(!card) {
    card = items[items.length - 1];
  }

  return card;
}
