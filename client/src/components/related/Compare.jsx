import React, { useState, useEffect} from "react";
import axios from 'axios';

function Compare(props) {

  const [mainData, updateData] = useState([]);

  var findProduct = function() {
    axios.get('/products', {
      params: {
        ID: props.mainP
      }
    })
    .then((results) => {
      console.log(results.data.features)
      updateData(results.data.features)
    })
  }

  useEffect(() => {
    findProduct()
  }, [props.mainP])


  return (props.trigger) ? (
    <div className="popUp">
      <div className="innerPopUp">
        <button className="popUpCloseButton" onClick={props.click}>X</button>
        <div><h2>{Number(props.related)}</h2></div>
        {props.relatedInfo.map((product) => {
          if (product.id === Number(props.related)) {
            return product.features.map((feature) => {
              return(
                  <div key={feature.feature}>{feature.feature} = {feature.value}</div>
                )
            })
          }
        })}
         <div><h2>{Number(props.mainP)}</h2></div>
        {mainData.map((feature) => {
           return (
            <div key={feature.feature}>{feature.feature} = {feature.value}</div>
          )
        })}
      </div>
    </div>
  ) : "";

}


export default Compare;