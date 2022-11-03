import React from 'react';
import './Overview.css'

class BasicInfo extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    // update starRating state to starRating array
  }

  render() {
    return(
      <div >
        <h1 className = "basic-info-category">{this.props.category}</h1>
        <h1 className = "basic-info-name">{this.props.name}</h1>
        <h1 className = "basic-info-price">{this.props.price}</h1>
      </div>
    )
  }
}

export default BasicInfo;