import React, { useState, useEffect} from "react";
import {MdCheck} from "react-icons/md";
import "./CompareTable.css"

class CompareTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     currentMain: this.props.main,
     currentRelated: this.props.related,
     which: this.props.current,
    }

    this.updateState = this.updateState.bind(this);
    this.checkFeatureMain = this.checkFeatureMain.bind(this);
    this.checkFeatureRelated = this.checkFeatureRelated.bind(this);
    this.getAllFeatures = this.getAllFeatures.bind(this);
    this.comparisonTool = this.comparisonTool.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateState();
    }
  }

  getAllFeatures = function() {
    var container = {};
    this.state.currentMain.features.map((feature) => {
      container[feature.feature] = feature.feature;
    })
    this.state.currentRelated[this.state.which].features.map((feature) => {
      container[feature.feature] = feature.feature;
    })

    var features = Object.keys(container);
    return features;

  }

  checkFeatureMain = function(inputFeature) {
    var result = 0;
    this.state.currentMain.features.map((feature) => {
    if (inputFeature === feature.feature) {
      // console.log('Main Feature: ', feature.feature)
      result++
    }
  })
    if (result <= 0) {
      return false
    } else {
      return true
    }
  }

  checkFeatureRelated = function(inputFeature) {
    var result = 0;
    this.state.currentRelated[this.state.which].features.map((feature) => {
      if (inputFeature === feature.feature) {
        // console.log('Related Feature: ', feature.feature)
        result++;
      }
    })
     if (result <= 0) {
       return false
     } else {
       return true
     }
  }

  comparisonTool = function() {
    var features = this.getAllFeatures();
    var resultArray = [];
    for (var i = 0; i < features.length; i++) {
      var featureArray = [];
      var mainProduct = this.checkFeatureMain(features[i]);
      var relatedProduct = this.checkFeatureRelated(features[i]);

      featureArray[0] = features[i];

      if (mainProduct === relatedProduct) {
        this.state.currentMain.features.map((feature) => {
          if (feature.feature === features[i]) {
            featureArray[1] = feature.value;
          }
        })
        this.state.currentRelated[this.state.which].features.map((feature) => {
          if (feature.feature === features[i]) {
            featureArray[2] = feature.value;
          }
        })
      } else {
        featureArray[1] = this.checkTrue(mainProduct);
        featureArray[2] = this.checkTrue(relatedProduct);
      }
      resultArray.push(featureArray);
    }
    console.log(resultArray)
    return resultArray;
  }

  checkTrue = function(value) {
    if (value) {
      return <MdCheck />
    } else {
      return null
    }
  }

  updateState = function() {
    console.log("STATE UPDATED")
    this.setState({
      currentMain: this.props.main,
      currentRelated: this.props.related,
      which: this.props.current,
    })
  }




  render() {
    {this.comparisonTool()}
    return (
      <div>
      <table className="compareTable">
        <tbody className="tableBody">
          <tr className="tabelRow">
            <th className="tableHead">{this.state.currentMain.name}</th>
            <th className="tableHead"> </th>
            <th className="tableHead">{this.state.currentRelated[this.state.which].name}</th>
          </tr>
          {this.comparisonTool().map((feature) => {
             return (
              <tr className="tabelRow" key={feature[0]}>
                <td className="tableData">{feature[1]}</td>
                <td className="tableCat">{feature[0]}</td>
                <td className="tableData">{feature[2]}</td>
              </tr>
            )
          })}
         {/* {this.state.currentMain.features.map((feature) => {
           return (
             <tr className="tabelRow" key={feature.feature}>
               <td className="tableData">{this.checkFeatureMain(feature.feature)}</td>
               <td className="tableData">{feature.feature}</td>
               <td className="tableData">{this.checkFeatureRelated(feature.feature)}</td>
             </tr>
           )
         })}
          {this.state.currentRelated[this.state.which].features.map((feature) => {
           return (
            <tr className="tabelRow" key={feature.feature}>
               <td className="tableData">{this.checkFeatureMain(feature.feature)}</td>
               <td className="tableData">{feature.feature}</td>
               <td className="tableData">{this.checkFeatureRelated(feature.feature)}</td>
             </tr>
           )
         })} */}
        </tbody>
      </table>
    </div>
    )
  }

}


export default CompareTable;