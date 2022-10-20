import React from 'react';

class BasicInfo extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    // update starRating state to starRating array
  }

  render() {
    return(
      <div>
        <h2>{this.props.category}</h2>
        <h1>{this.props.name}</h1>
        <h3>{this.props.price}</h3>
      </div>
    )
  }
}

export default BasicInfo;