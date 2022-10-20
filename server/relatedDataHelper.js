const apiData = require("./apihelper.js");
const axios = require('axios');

const relatedGetter = function(array) {
  var container = {};
    array.map((item) => {
      container[item.id] = {};
      if (container[item.id].id === undefined) {
        container[item.id].id = item.id;
      }
      if (container[item.id].name === undefined) {
        container[item.id].name = item.name;
      }
      if (container[item.id].category === undefined) {
        container[item.id].category = item.category;
      }
      if (container[item.id].price === undefined) {
        container[item.id].price = item.default_price;
      }
      if (container[item.id].type === undefined) {
        container[item.id].type = item.type;
      }

      if (item.results) {
        var containerArray = [];
        item.results.map((inner) => {
         containerArray.push(inner.photos[0].thumbnail_url)
        })
        container[item.product_id].image = containerArray[0];
      }

    })
    var resultArray = [];
    for (var key in container) {
      if (key.toString() !== 'undefined') {
        resultArray.push(container[key])
      }
    }

    return resultArray;
}


const componentHelper = function(array) {
 var resultArray = [];

 if (typeof array === 'string') {
  resultArray.push(apiData.betterCall('products/'+array))
  resultArray.push(apiData.betterCall('products/'+array+'/styles'))
 } else {
   for (var i = 0; i < array.length; i++) {
     resultArray.push(apiData.betterCall('products/'+array[i].toString()))
     resultArray.push(apiData.betterCall('products/'+array[i].toString()+'/styles'))
   }
 }
  return Promise.all(resultArray.map((endpoint) => axios.default.get(endpoint.call, endpoint.options)))
  .then(axios.default.spread((...allData) => {
      return allData;
    })
  );
}

module.exports = {
  rg: relatedGetter,
  ch: componentHelper,
}



