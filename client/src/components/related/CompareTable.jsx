import React, { useState, useEffect} from "react";
import {MdCheck} from "react-icons/md";

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
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateState();
    }
  }

  checkFeatureMain = function(inputFeature) {
    var result = 0;
    this.state.currentMain.features.map((feature) => {
    if (inputFeature === feature.feature) {
      result++;
    }
  })
    if (result > 0) {
      return <MdCheck />
    }
  }

  checkFeatureRelated = function(inputFeature) {
    var result = 0;
    this.state.currentRelated[this.state.which].features.map((feature) => {
      if (inputFeature === feature.feature) {
        result++;
      }
    })

    if (result > 0) {
      return <MdCheck />
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
    return (
      <div className="compareTable">
      <table>
        <tbody>
          <tr>
            <th>{this.state.currentMain.name}</th>
            <th>Feature</th>
            <th>{this.state.currentRelated[this.state.which].name}</th>
          </tr>
         {this.state.currentMain.features.map((feature) => {
           return (
             <tr key={feature.feature}>
               <td>{this.checkFeatureMain(feature.feature)}</td>
               <td>{feature.feature}</td>
               <td>{this.checkFeatureRelated(feature.feature)}</td>
             </tr>
           )
         })}
          {this.state.currentRelated[this.state.which].features.map((feature) => {
           return (
            <tr key={feature.feature}>
               <td>{this.checkFeatureMain(feature.feature)}</td>
               <td>{feature.feature}</td>
               <td>{this.checkFeatureRelated(feature.feature)}</td>
             </tr>
           )
         })}
        </tbody>
      </table>
    </div>
    )
  }

}


export default CompareTable;