const axios = require('axios');
const access = require('../access.js')
const token = access.token;


let dataCall = (id) => {
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `${token}`
    }
  };
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${id}`, options)
    .then(function (response) {
      return(response.data)
    })
    .catch(function (error) {
      console.log('This Did Not Work')
      console.log(error.message);
    })
  }


 let betterCall = (id) => {
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `${token}`
    }
  };
  return ({call: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${id}`, options})
 }

module.exports = {
  dataCall: dataCall,
  betterCall: betterCall,
}