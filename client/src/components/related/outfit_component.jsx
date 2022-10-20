import React from 'react';

class OutfitComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: [],
    }
  }

  render() {
    return(
      <div>
        <h1> Outfit Items - Nick</h1>
      </div>
    )
  }

}

export default OutfitComponent;