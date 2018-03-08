var GetSendData = function(n, json) {

  var funcid;
  var ix = new IXContent();

  switch(n) {

    case 0:
      funcid = "HQ.TAS.product_code_query",
      ix.Set("pro_type1_in", json["pro_type1_in"]);
      ix.Set("pro_type2", json["pro_type2"]);
      ix.Set("orderby_field", json["sortField"] || json["foot_field"]);
      ix.Set("orderby_type", json["sortType"] || "2");
      ix.Set("@POS", json["@POS"] || "0");
      ix.Set("@COUNT", "20");
      break;
  }

  return [funcid, ix];
}

var SetDataField = function(data, n, vm) {

  if(n == 0) {
    data = data.rows;
  }

  return data;
}