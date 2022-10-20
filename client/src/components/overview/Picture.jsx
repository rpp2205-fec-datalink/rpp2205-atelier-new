import React from 'react';

class Picture extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
  }

  render() {
    return(
      <div>
        <img src={this.props.url} alt="testing alt"/>
      </div>
    )
  }
}

export default Picture;