
const express = require("express");
const path = require("path");
const port = 8080;
const compression = require('compression')
const axios = require("axios");
const apiData = require("./apiHelper.js");
const relatedGetter = require("./relatedDataHelper.js")

const app = express();
app.use(compression());



app.use(express.static(path.join(__dirname, '../client/dist')));



app.get('/related', (req, res) => {
    var test = apiData.betterCall('products/'+req.query.ID+'/related');
    return axios.get(test.call, test.options)
    .then((results) => {
      return results.data
    })
    .then((results) => {
     return relatedGetter.ch(results);
    })
    .then((results) => {
      var getDataArray = [];
      results.map((obj) => {
        getDataArray.push(obj.data)
      })
      return getDataArray;
    })
    .then((results) => {
      var final = relatedGetter.rg(results);
      res.send(final);
    })
    .catch((err) => {
      console.log(err);
    })
});



app.get('/outfit', (req, res) => {
  return relatedGetter.ch(req.query.ID)
  .then(axios.spread((...allData) => {
    return allData;
  }))
  .then((results) => {
    var getDataArray = [];
    results.map((obj) => {
      getDataArray.push(obj.data)
    })
    return getDataArray;
  })
  .then((results) => {
    var final = relatedGetter.rg(results);
    res.send(final);
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get('/clickTracker', (req, res) => {
  var postUrl = apiData.betterCall("interactions")
  return axios.post(postUrl.call, req.query, postUrl.options)
    .then((results) => {
      res.send(results.data)
    })
    .catch((err) => {
      res.send(err.data)
    })
})



// calls products/ with specific product ID --> product info is returned in response.data
app.get('/products', (req, res) => {
  return apiData.dataCall('products/'+req.query.ID)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    })
})

// calls reviews/meta with specific product ID --> ratings object is returned in response.data.ratings
app.get('/productsMeta', (req, res) => {
  return apiData.dataCall('reviews/meta/?product_id=' + req.query.ID)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    })
})

// calls products/:id/styles
app.get('/productsStyle', (req, res) => {
  return apiData.dataCall('products/' + req.query.ID + '/styles')
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    })
})

app.listen(port);
console.log(`Listening at http://localhost:${port}`);