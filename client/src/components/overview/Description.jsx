import React from 'react';

class Description extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    // update starRating state to starRating array
  }

  render() {
    return(
      <div>
        <div className="slogan">
          <h2>{this.props.slogan}</h2>
          <h3>{this.props.description}</h3>
        </div>
      </div>
    )
  }
}

export default Description;