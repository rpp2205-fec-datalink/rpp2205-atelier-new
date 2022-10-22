import React, { useState, useEffect} from "react";
import CompareTable from "./CompareTable.jsx";
import axios from 'axios';

function Compare(props) {

  const [mainData, updateData] = useState([]);
  const [relatedData, updateRelatedData] = useState([]);


  var findProduct = function() {
    axios.get('/products', {
      params: {
        ID: props.mainP
      }
    })
    .then((results) => {
      var obj = {};
      obj.id = results.data.id;
      obj.name = results.data.name;
      obj.features = results.data.features;
      updateData(obj)
    })
  }



  var setUpComparisonData = function() {
    if (props.relatedInfo.length) {
      var containerObj =  {};
      props.relatedInfo.map((item) => {
        containerObj[item.id] = {
          name: item.name,
          features: item.features,
        }
      })
      updateRelatedData(containerObj);
    }
  }


  useEffect(() => {
    findProduct();
  }, [props.mainP])

  useEffect(() => {
    setUpComparisonData();
  }, [props.relatedInfo])


  return (props.trigger) ? (
    <div className="popUp">
      <div className="innerPopUp">
        <h1>Comparing</h1>
        <button className="popUpCloseButton" onClick={props.click}>X</button>
        <CompareTable main={mainData} related={relatedData} current={props.related}/>
      </div>
    </div>
  ) : "";

}


export default Compare;